import { useState, useCallback } from 'react'
import workflowAPI from '../services/api'
// import toast from 'react-hot-toast'

export function useWorkflow() {
    const [workflows, setWorkflows] = useState([])
    const [loading, setLoading] = useState(false)

    const planWorkflow = useCallback(async (description) => {
        setLoading(true)
        try {
            const response = await workflowAPI.plan(description)
            const workflow = response.data

            setWorkflows(prev => [workflow, ...prev])
            toast.success('Workflow planned successfully!')
            return workflow
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to plan workflow')
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const listWorkflows = useCallback(async () => {
        setLoading(true)
        try {
            const response = await workflowAPI.list()
            setWorkflows(response.data.workflows || [])
        } catch (error) {
            toast.error('Failed to load workflows')
        } finally {
            setLoading(false)
        }
    }, [])

    const deployWorkflow = useCallback(async (workflowId) => {
        try {
            await workflowAPI.deploy(workflowId)
            toast.success('Workflow deployed!')
            return true
        } catch (error) {
            toast.error('Failed to deploy workflow')
            return false
        }
    }, [])

    const executeWorkflow = useCallback(async (workflowId) => {
        try {
            const response = await workflowAPI.execute(workflowId)
            toast.success('Workflow executed!')
            return response.data
        } catch (error) {
            toast.error('Failed to execute workflow')
            return null
        }
    }, [])

    return {
        workflows,
        loading,
        planWorkflow,
        listWorkflows,
        deployWorkflow,
        executeWorkflow,
    }
}
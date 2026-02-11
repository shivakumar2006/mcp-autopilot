import { useState, useCallback } from 'react'
import { workflowAPI } from '../services/api'
import toast from 'react-hot-toast'

export function useWorkflow() {
    const [workflows, setWorkflows] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const planWorkflow = useCallback(async (description) => {
        setLoading(true)
        setError(null)
        try {
            const response = await workflowAPI.plan(description)
            const workflow = response.data

            setWorkflows(prev => [workflow, ...prev])
            toast.success('Workflow planned successfully!')
            return workflow
        } catch (err) {
            const message = err.response?.data?.detail || 'Failed to plan workflow'
            setError(message)
            toast.error(message)
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    const listWorkflows = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await workflowAPI.list()
            setWorkflows(response.data.workflows || [])
        } catch (err) {
            const message = 'Failed to load workflows'
            setError(message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }, [])

    const deployWorkflow = useCallback(async (workflowId) => {
        try {
            const response = await workflowAPI.deploy(workflowId)
            toast.success('Workflow deployed!')
            return response.data
        } catch (err) {
            toast.error('Failed to deploy workflow')
            return null
        }
    }, [])

    const executeWorkflow = useCallback(async (workflowId) => {
        try {
            const response = await workflowAPI.execute(workflowId)
            toast.success('Workflow executed!')
            return response.data
        } catch (err) {
            toast.error('Failed to execute workflow')
            return null
        }
    }, [])

    return {
        workflows,
        loading,
        error,
        planWorkflow,
        listWorkflows,
        deployWorkflow,
        executeWorkflow,
    }
}
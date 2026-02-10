import { useState, useEffect } from 'react'
import { useWorkflow } from '../hooks/webhooks'
// import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function History() {
    const { workflows, loading, listWorkflows } = useWorkflow()

    useEffect(() => {
        listWorkflows()
    }, [listWorkflows])

    return (
        <div className="fade-in">
            <h1 className="text-3xl font-bold mb-8">Workflow History</h1>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-slate-400">Loading workflows...</p>
                </div>
            ) : workflows.length === 0 ? (
                <div className="glass rounded-lg p-12 text-center">
                    <Clock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No workflows yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {workflows.map(workflow => (
                        <div key={workflow.workflow_id} className="glass rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold">{workflow.name}</h3>
                                        {workflow.status === 'completed' && (
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        )}
                                        {workflow.status === 'failed' && (
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-400">{workflow.description}</p>
                                </div>
                                <div className="text-right text-sm text-slate-400">
                                    <p>{new Date(workflow.created_at).toLocaleDateString()}</p>
                                    <p className="capitalize">{workflow.status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
import { useState, useEffect } from 'react'
import { useWorkflow } from '../hooks/useWebHooks'

export default function History() {
    const { workflows, loading, listWorkflows } = useWorkflow()
    const [deleting, setDeleting] = useState(null)

    useEffect(() => {
        listWorkflows()
    }, [listWorkflows])

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">📋 Workflow History</h1>
                <button
                    onClick={listWorkflows}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition disabled:opacity-50"
                >
                    🔄 Refresh
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block">⏳ Loading workflows...</div>
                </div>
            ) : workflows.length === 0 ? (
                <div className="glass rounded-lg p-12 text-center">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-slate-400">No workflows yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {workflows.map(workflow => (
                        <div key={workflow.workflow_id} className="glass rounded-lg p-6 flex items-center justify-between hover:border-blue-500 border border-dark-border transition">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold">{workflow.name}</h3>
                                    {workflow.status === 'completed' && (
                                        <span className="text-green-400">✅</span>
                                    )}
                                    {workflow.status === 'failed' && (
                                        <span className="text-red-400">❌</span>
                                    )}
                                    {workflow.status === 'running' && (
                                        <span className="text-yellow-400">⏳</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-400">{workflow.description}</p>
                            </div>
                            <div className="text-right mr-4 text-sm text-slate-400">
                                <p>{new Date(workflow.created_at).toLocaleDateString()}</p>
                                <p className="capitalize">{workflow.status}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setDeleting(workflow.workflow_id)
                                    setTimeout(() => setDeleting(null), 500)
                                }}
                                disabled={deleting === workflow.workflow_id}
                                className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
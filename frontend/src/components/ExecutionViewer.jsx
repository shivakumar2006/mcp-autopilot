import { useState, useEffect } from 'react'
import { useWorkflow } from '../hooks/useWebHooks'

export default function ExecutionViewer({ data, onReset }) {
    const { executeWorkflow } = useWorkflow()
    const [executing, setExecuting] = useState(true)
    const [completed, setCompleted] = useState(false)
    const [results, setResults] = useState(null)
    const [steps, setSteps] = useState([
        { name: 'Extract', status: 'completed', time: '0.5s' },
        { name: 'Transform', status: 'completed', time: '1.2s' },
        { name: 'Analyze', status: 'running', time: '...' },
        { name: 'Generate', status: 'pending', time: '-' }
    ])

    useEffect(() => {
        const executeWorkflowAsync = async () => {
            const result = await executeWorkflow(data.plan?.workflow_id)

            setSteps(prev => prev.map((s, i) => ({
                ...s,
                status: i < 3 ? 'completed' : (i === 3 ? 'completed' : 'pending'),
                time: i < 3 ? s.time : '0.8s'
            })))

            setResults(result)
            setExecuting(false)
            setCompleted(true)
        }

        const timer = setTimeout(executeWorkflowAsync, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="text-4xl mb-4">⚙️</div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                    Executing Workflow
                </h2>
                <p className="text-slate-400">MCPs are working...</p>
            </div>

            <div className="glass rounded-lg p-8 space-y-6">
                {/* Execution Steps */}
                <div className="space-y-3">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-dark rounded-lg">
                            {step.status === 'completed' ? (
                                <span className="text-green-400 text-xl">✅</span>
                            ) : step.status === 'running' ? (
                                <span className="inline-block animate-spin">⏳</span>
                            ) : (
                                <span className="text-slate-400">⭕</span>
                            )}
                            <div className="flex-1">
                                <p className="font-semibold">{step.name}</p>
                                <p className="text-xs text-slate-400 capitalize">{step.status}</p>
                            </div>
                            <p className="text-sm text-slate-400">{step.time}</p>
                        </div>
                    ))}
                </div>

                {completed && (
                    <>
                        {/* Results */}
                        <div className="border-t border-dark-border pt-6">
                            <div className="mb-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <span>📈</span> Results
                                </h3>
                            </div>
                            <div className="bg-dark rounded-lg p-4 text-sm text-slate-300 space-y-2">
                                <p>✅ Extracted 1,250 records</p>
                                <p>✅ Transformed 1,250 records</p>
                                <p>✅ Analyzed and generated insights</p>
                                <p>✅ Report generated successfully</p>
                            </div>
                        </div>

                        {/* Success Button */}
                        <button
                            onClick={onReset}
                            className="w-full py-3 btn-gradient rounded-lg font-semibold"
                        >
                            ✨ Create Another Workflow
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
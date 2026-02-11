import { useState } from 'react'

export default function PlanViewer({ data, onSubmit }) {
    const [loading, setLoading] = useState(false)

    const handleContinue = async () => {
        setLoading(true)
        setTimeout(() => {
            onSubmit({
                workflow_id: data.workflow_id,
                steps: data.plan?.plan?.steps || []
            })
            setLoading(false)
        }, 500)
    }

    const plan = data.plan?.plan || {}
    const steps = plan.steps || []

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="text-4xl mb-4">📊</div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                    Workflow Plan
                </h2>
                <p className="text-slate-400">AI analyzed your request</p>
            </div>

            <div className="glass rounded-lg p-8 space-y-6">
                {/* Description */}
                <div className="border-b border-dark-border pb-6">
                    <h3 className="font-semibold mb-2">📝 Your Request</h3>
                    <p className="text-slate-400">{data.input?.description}</p>
                </div>

                {/* Plan */}
                <div className="border-b border-dark-border pb-6">
                    <h3 className="font-semibold mb-2">🎯 Plan Name</h3>
                    <p className="text-slate-400">{plan.workflow_name || 'Workflow'}</p>
                </div>

                {/* Steps */}
                <div>
                    <h3 className="font-semibold mb-4">📋 Planned Steps</h3>
                    <div className="space-y-3">
                        {steps.length > 0 ? (
                            steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-dark rounded-lg">
                                    <span className="text-green-400">✅</span>
                                    <div>
                                        <p className="font-semibold">{step.name}</p>
                                        <p className="text-xs text-slate-400 capitalize">{step.mcp_type || 'processing'}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400">No steps available</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="w-full py-3 btn-gradient rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading ? '⏳ Preparing...' : '➜ Continue to Deploy'}
                </button>
            </div>
        </div>
    )
}
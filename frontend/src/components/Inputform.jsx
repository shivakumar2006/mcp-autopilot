import { useState } from 'react'
import { useWorkflow } from '../hooks/useWebHooks'

const EXAMPLES = [
    "Analyze sales data, detect trends, send weekly reports",
    "Monitor API performance, detect anomalies, create alerts",
    "Process CSV files, validate data, transform format",
    "Extract logs, analyze errors, create dashboard",
    "Collect feedback, analyze sentiment, generate insights"
]

export default function InputForm({ onSubmit }) {
    const [value, setValue] = useState('')
    const { loading, planWorkflow } = useWorkflow()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (value.trim()) {
            const result = await planWorkflow(value)
            if (result) {
                onSubmit(result)
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎯</div>
                <h1 className="text-4xl font-bold gradient-text mb-4">
                    What Do You Need?
                </h1>
                <p className="text-slate-400">
                    Describe your workflow in plain English
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        📝 Workflow Description
                    </label>
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Describe what you want to automate..."
                        rows="6"
                        disabled={loading}
                        className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!value.trim() || loading}
                    className="w-full py-3 btn-gradient rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            ⏳ Planning...
                        </>
                    ) : (
                        '🚀 Plan Workflow'
                    )}
                </button>
            </form>

            <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">💡 Example Workflows</h3>
                <div className="grid md:grid-cols-2 gap-3">
                    {EXAMPLES.map((ex, i) => (
                        <button
                            key={i}
                            onClick={() => setValue(ex)}
                            className="text-left p-4 glass rounded-lg hover:border-blue-500 border border-dark-border transition text-sm text-slate-400 hover:text-white"
                        >
                            {ex}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
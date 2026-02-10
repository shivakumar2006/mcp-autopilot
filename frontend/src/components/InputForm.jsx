import { useState } from 'react'
import { useWorkflow } from '../hooks/webhooks'
// import { Loader2 } from 'lucide-react'

const EXAMPLES = [
    "Analyze sales data, detect trends, and send weekly email reports",
    "Monitor API endpoints, detect anomalies, and create alerts",
    "Process CSV files, validate data, transform format, and save to database",
    "Extract logs, find errors, group by type, and create dashboard",
    "Collect customer feedback, analyze sentiment, and generate insights"
]

export default function InputForm({ onSubmit }) {
    const [description, setDescription] = useState('')
    const { loading, planWorkflow } = useWorkflow()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (description.trim()) {
            const result = await planWorkflow(description)
            if (result) {
                onSubmit(result)
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-2">
                    What Do You Need?
                </h1>
                <p className="text-slate-400">
                    Describe your workflow in plain English. Our AI will handle the rest.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Workflow Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g., Monitor my API, detect slow endpoints, send alerts to Slack..."
                        rows="6"
                        disabled={loading}
                        className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!description.trim() || loading}
                    className="w-full py-3 px-4 rounded-lg font-semibold text-white btn-gradient disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Planning Workflow...
                        </>
                    ) : (
                        'Plan Workflow'
                    )}
                </button>
            </form>

            {/* Examples */}
            <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Example Workflows</h3>
                <div className="grid md:grid-cols-2 gap-3">
                    {EXAMPLES.map((example, idx) => (
                        <button
                            key={idx}
                            onClick={() => setDescription(example)}
                            className="text-left p-4 glass rounded-lg hover:border-primary border border-dark-border transition text-sm text-slate-300 hover:text-white"
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
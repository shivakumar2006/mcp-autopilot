import { useState, useEffect } from 'react'
import { useWorkflow } from '../hooks/useWebHooks'

export default function DeploymentViewer({ data, onSubmit }) {
    const { deployWorkflow } = useWorkflow()
    const [deploying, setDeploying] = useState(false)
    const [deployed, setDeployed] = useState(false)
    const [deployedMCPs, setDeployedMCPs] = useState([])

    const handleDeploy = async () => {
        setDeploying(true)

        const result = await deployWorkflow(data.plan?.workflow_id)

        if (result) {
            const mcps = result.deployed_mcps || [
                { mcp_id: 'extractor', name: 'Data Extractor', status: 'deployed' },
                { mcp_id: 'transformer', name: 'Data Transformer', status: 'deployed' },
                { mcp_id: 'analyzer', name: 'Analyzer', status: 'deployed' },
                { mcp_id: 'generator', name: 'Report Generator', status: 'deployed' }
            ]

            setDeployedMCPs(mcps)
            setDeployed(true)

            setTimeout(() => {
                onSubmit({
                    workflow_id: data.plan?.workflow_id,
                    mcps: mcps
                })
            }, 1000)
        }

        setDeploying(false)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                    Deploy MCPs
                </h2>
                <p className="text-slate-400">Setting up your workflow</p>
            </div>

            <div className="glass rounded-lg p-8">
                <div className="space-y-4 mb-8">
                    {['Data Extractor', 'Data Transformer', 'Analyzer', 'Report Generator'].map((mcp, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-dark rounded-lg">
                            {deployed ? (
                                <span className="text-green-400 text-xl">✅</span>
                            ) : deploying ? (
                                <span className="inline-block animate-spin">⏳</span>
                            ) : (
                                <span className="text-slate-400">⭕</span>
                            )}
                            <div className="flex-1">
                                <p className="font-semibold">{mcp}</p>
                                <p className="text-xs text-slate-400">http://localhost:{8001 + i}</p>
                            </div>
                            {deployed && <span>📦</span>}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleDeploy}
                    disabled={deploying || deployed}
                    className="w-full py-3 btn-gradient rounded-lg font-semibold disabled:opacity-50"
                >
                    {deploying ? (
                        '⏳ Deploying...'
                    ) : deployed ? (
                        '✅ Deployed! Executing...'
                    ) : (
                        '🚀 Deploy Now'
                    )}
                </button>
            </div>
        </div>
    )
}
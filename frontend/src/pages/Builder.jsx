import { useState } from 'react'
import InputForm from '../components/InputForm'
// import PlanViewer from '../components/PlanViewer'
// import DeploymentStatus from '../components/DeploymentStatus'
// import ExecutionMonitor from '../components/ExecutionMonitor'

export default function Builder() {
    const [step, setStep] = useState('input') // input, planning, deploying, executing, done
    const [workflow, setWorkflow] = useState(null)
    const [deploymentResult, setDeploymentResult] = useState(null)

    const handlePlanWorkflow = (workflowData) => {
        setWorkflow(workflowData)
        setStep('planning')
    }

    const handlePlanComplete = (planData) => {
        setWorkflow(prev => ({ ...prev, ...planData }))
        setStep('deploying')
    }

    const handleDeployComplete = (result) => {
        setDeploymentResult(result)
        setStep('executing')
    }

    const handleExecutionComplete = () => {
        setStep('done')
    }

    return (
        <div className="fade-in">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {['input', 'planning', 'deploying', 'executing', 'done'].map((s, idx) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${['input', 'planning', 'deploying', 'executing', 'done'].indexOf(step) >= idx
                                ? 'bg-primary text-white'
                                : 'bg-dark-card text-slate-400'
                                }`}>
                                {idx + 1}
                            </div>
                            {idx < 4 && <div className="flex-1 h-1 mx-2 bg-dark-border" />}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Describe</span>
                    <span>Planning</span>
                    <span>Deploy</span>
                    <span>Execute</span>
                    <span>Done</span>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-96">
                {step === 'input' && (
                    <InputForm onSubmit={handlePlanWorkflow} />
                )}

                {step === 'planning' && workflow && (
                    <PlanViewer workflow={workflow} onComplete={handlePlanComplete} />
                )}

                {step === 'deploying' && workflow && (
                    <DeploymentStatus
                        workflow={workflow}
                        onComplete={handleDeployComplete}
                    />
                )}

                {step === 'executing' && deploymentResult && (
                    <ExecutionMonitor
                        workflow={workflow}
                        deploymentResult={deploymentResult}
                        onComplete={handleExecutionComplete}
                    />
                )}

                {step === 'done' && (
                    <div className="text-center glass rounded-lg p-12">
                        <h2 className="text-3xl font-bold text-green-400 mb-4">✅ Workflow Executed!</h2>
                        <p className="text-slate-400 mb-6">Your autonomous workflow completed successfully</p>
                        <button
                            onClick={() => {
                                setStep('input')
                                setWorkflow(null)
                                setDeploymentResult(null)
                            }}
                            className="px-8 py-3 btn-gradient rounded-lg font-semibold"
                        >
                            Create Another Workflow
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
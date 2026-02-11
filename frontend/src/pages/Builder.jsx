import { useState } from 'react'
import InputForm from '../components/InputForm'
import PlanViewer from '../components/PlanViewer'
import DeploymentViewer from '../components/DeploymentViewer'
import ExecutionViewer from '../components/ExecutionViewer'

export default function Builder() {
    const [step, setStep] = useState('input')
    const [data, setData] = useState({})
    const [isTransitioning, setIsTransitioning] = useState(false)

    const steps = [
        { id: 'input', label: 'Describe', icon: '📝', color: 'from-blue-600 to-blue-400' },
        { id: 'planning', label: 'Plan', icon: '🧠', color: 'from-purple-600 to-purple-400' },
        { id: 'deploying', label: 'Deploy', icon: '🚀', color: 'from-pink-600 to-pink-400' },
        { id: 'executing', label: 'Execute', icon: '⚙️', color: 'from-green-600 to-green-400' }
    ]

    const currentStepIndex = steps.findIndex(s => s.id === step)

    const handleInputSubmit = (formData) => {
        setIsTransitioning(true)
        setTimeout(() => {
            setData({ ...data, input: formData })
            setStep('planning')
            setIsTransitioning(false)
        }, 300)
    }

    const handlePlanSubmit = (planData) => {
        setIsTransitioning(true)
        setTimeout(() => {
            setData({ ...data, plan: planData })
            setStep('deploying')
            setIsTransitioning(false)
        }, 300)
    }

    const handleDeploySubmit = (deployData) => {
        setIsTransitioning(true)
        setTimeout(() => {
            setData({ ...data, deployment: deployData })
            setStep('executing')
            setIsTransitioning(false)
        }, 300)
    }

    const handleReset = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setStep('input')
            setData({})
            setIsTransitioning(false)
        }, 300)
    }

    return (
        <div className="fade-in space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-3">
                    Workflow Builder
                </h1>
                <p className="text-xl text-slate-400">
                    Create autonomous workflows with AI orchestration
                </p>
            </div>

            {/* Enhanced Progress Section */}
            <div className="glass rounded-2xl p-8 gradient-border">
                {/* Progress Indicator */}
                <div className="mb-10">
                    {/* Steps Container */}
                    <div className="flex items-center justify-between gap-2 md:gap-0 mb-8">
                        {steps.map((s, i) => {
                            const isActive = currentStepIndex === i
                            const isCompleted = currentStepIndex > i

                            return (
                                <div key={s.id} className="flex items-center flex-1 relative group">
                                    {/* Step Circle */}
                                    <div className="relative z-10">
                                        {/* Glow Effect */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 scale-125 animate-pulse"></div>
                                        )}

                                        {/* Step Number Circle */}
                                        <div
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold transition-all duration-500 relative border-2 ${isActive
                                                ? `bg-gradient-to-r ${s.color} border-transparent text-white shadow-2xl scale-110`
                                                : isCompleted
                                                    ? 'bg-gradient-to-r from-green-600 to-green-400 border-green-400 text-white'
                                                    : 'bg-dark-card border-dark-border text-slate-500'
                                                }`}
                                        >
                                            <span className="text-xl">{s.icon}</span>
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${isActive
                                        ? 'text-blue-400 scale-110'
                                        : isCompleted
                                            ? 'text-green-400'
                                            : 'text-slate-500'
                                        }`}>
                                        {s.label}
                                    </div>

                                    {/* Connecting Line */}
                                    {i < steps.length - 1 && (
                                        <div className="flex-1 h-1 mx-2 md:mx-4 relative overflow-hidden rounded-full bg-dark-border">
                                            <div
                                                className={`h-full transition-all duration-500 ${isCompleted
                                                    ? 'w-full bg-gradient-to-r from-green-600 to-green-400'
                                                    : 'w-0'
                                                    }`}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-12 h-2 bg-dark-card rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-500 rounded-full`}
                            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Step Info */}
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Step <span className="font-bold text-blue-400">{currentStepIndex + 1}</span> of <span className="font-bold text-blue-400">4</span>
                        </p>
                        <p className="text-sm text-slate-400">
                            {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete
                        </p>
                    </div>
                </div>

                {/* Step Description */}
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-slate-300 flex items-center gap-2">
                        <span className="text-2xl">{steps[currentStepIndex].icon}</span>
                        <span>
                            <span className="font-bold text-blue-400">{steps[currentStepIndex].label}</span> -
                            {step === 'input' && ' Describe what you want to automate'}
                            {step === 'planning' && ' AI creates optimal workflow plan'}
                            {step === 'deploying' && ' MCPs are deployed to Archestra'}
                            {step === 'executing' && ' Workflow is executing autonomously'}
                        </span>
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {step === 'input' && (
                    <InputForm onSubmit={handleInputSubmit} />
                )}

                {step === 'planning' && (
                    <PlanViewer data={data} onSubmit={handlePlanSubmit} />
                )}

                {step === 'deploying' && (
                    <DeploymentViewer data={data} onSubmit={handleDeploySubmit} />
                )}

                {step === 'executing' && (
                    <ExecutionViewer data={data} onReset={handleReset} />
                )}
            </div>

            {/* Additional Info Section */}
            {step !== 'executing' && (
                <div className="grid md:grid-cols-3 gap-4 mt-12">
                    <div className="glass rounded-lg p-4 border border-slate-700/50">
                        <p className="text-sm font-semibold text-blue-400 mb-1">💡 Tip</p>
                        <p className="text-xs text-slate-400">
                            {step === 'input' && 'Be specific about what you want to automate for better results'}
                            {step === 'planning' && 'Review the plan and make sure it matches your needs'}
                            {step === 'deploying' && 'MCPs are being deployed to your infrastructure'}
                            {step === 'executing' && 'Your workflow is running automatically'}
                        </p>
                    </div>

                    <div className="glass rounded-lg p-4 border border-slate-700/50">
                        <p className="text-sm font-semibold text-purple-400 mb-1">⏱️ Time</p>
                        <p className="text-xs text-slate-400">
                            {step === 'input' && 'Takes ~30 seconds'}
                            {step === 'planning' && 'Takes ~10 seconds'}
                            {step === 'deploying' && 'Takes ~2-5 minutes'}
                            {step === 'executing' && 'Depends on complexity'}
                        </p>
                    </div>

                    <div className="glass rounded-lg p-4 border border-slate-700/50">
                        <p className="text-sm font-semibold text-pink-400 mb-1">🎯 Status</p>
                        <p className="text-xs text-slate-400">
                            {step === 'input' && 'Ready to start'}
                            {step === 'planning' && 'Analyzing your request'}
                            {step === 'deploying' && 'Deploying MCPs'}
                            {step === 'executing' && 'Running workflow'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
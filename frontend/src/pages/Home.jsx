import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="fade-in space-y-16">
            {/* Hero Section */}
            <div className="relative text-center py-20">
                <div className="inline-block mb-6 animate-bounce float">
                    <div className="text-8xl drop-shadow-lg">⚡</div>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
                    Autonomous <br />
                    <span className="text-glow">Workflow Engine</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Describe what you need in natural language. <br />
                    <span className="text-blue-400 font-semibold">AI orchestrates MCPs.</span> <br />
                    Results happen automatically.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        to="/builder"
                        className="px-8 py-4 btn-gradient rounded-xl font-semibold text-lg hover-lift shadow-lg"
                    >
                        🚀 Start Building Now
                    </Link>

                    <a
                        href="http://localhost:8000/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:glow-border transition duration-300"
                    >
                        📚 API Documentation
                    </a>
                </div>

                {/* Feature Badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full text-sm text-blue-300">✨ AI-Powered</span>
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-400/50 rounded-full text-sm text-purple-300">⚡ Instant Deploy</span>
                    <span className="px-4 py-2 bg-pink-500/20 border border-pink-400/50 rounded-full text-sm text-pink-300">🔄 Auto Orchestrate</span>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: '🧠', title: 'AI Planning', desc: 'Natural language understanding via Archestra LLM' },
                    { icon: '⚡', title: 'Auto Deploy', desc: 'MCPs deployed in seconds to your infrastructure' },
                    { icon: '🔧', title: 'Orchestrate', desc: 'MCPs chained automatically for seamless workflows' },
                    { icon: '📊', title: 'Monitor', desc: 'Real-time execution tracking and live insights' },
                ].map((feature, i) => (
                    <div
                        key={i}
                        className="glass rounded-xl p-8 hover-lift group transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50"
                    >
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* How It Works */}
            <div className="glass rounded-2xl p-12 gradient-border">
                <h2 className="text-4xl font-bold gradient-text text-center mb-12">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { num: '1', title: 'Describe', desc: 'Tell us what you want to automate' },
                        { num: '2', title: 'Plan', desc: 'AI creates optimal workflow plan' },
                        { num: '3', title: 'Deploy', desc: 'MCPs auto-deployed to Archestra' },
                        { num: '4', title: 'Execute', desc: 'Workflow runs autonomously' },
                    ].map((step, i) => (
                        <div key={i} className="relative">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg hover-lift">
                                    {step.num}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-400">{step.desc}</p>
                            </div>
                            {i < 3 && (
                                <div className="hidden md:block absolute right-0 top-8 text-3xl text-blue-500/30">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/30 rounded-xl">
                    <p className="text-center text-slate-300">
                        <span className="font-semibold text-blue-400">No coding required.</span> Just describe your workflow in plain English, and watch the magic happen.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: 'Workflows Possible', value: '∞' },
                    { label: 'Setup Time', value: '<1m' },
                    { label: 'MCPs Available', value: '8+' },
                ].map((stat, i) => (
                    <div key={i} className="glass rounded-xl p-8 text-center hover-lift border border-slate-700/50">
                        <p className="text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                        <p className="text-slate-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden rounded-2xl p-16 gradient-border">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 pointer-events-none"></div>
                <div className="relative text-center">
                    <h2 className="text-5xl font-bold mb-6">
                        Ready to automate?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Join thousands building autonomous workflows with MCP Autopilot
                    </p>
                    <Link
                        to="/builder"
                        className="inline-block px-10 py-4 btn-gradient rounded-xl font-semibold text-lg hover-lift shadow-xl"
                    >
                        🚀 Launch Builder
                    </Link>
                </div>
            </div>
        </div>
    )
}
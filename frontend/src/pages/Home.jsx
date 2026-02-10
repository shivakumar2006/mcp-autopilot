import { Link } from 'react-router-dom'
// import { ArrowRight, Zap, Brain, Cpu, BarChart3 } from 'lucide-react';

export default function Home() {
    return (
        <div className="fade-in space-y-12">
            {/* Hero */}
            <div className="text-center py-12">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                    AI-Powered Autonomous Workflows
                </h1>
                <p className="text-xl text-slate-400 mb-8">
                    Describe what you need. Our AI will orchestrate MCPs to make it happen. Automatically.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        to="/builder"
                        className="px-8 py-3 btn-gradient rounded-lg font-semibold flex items-center gap-2"
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                        href="http://localhost:8000/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
                    >
                        API Docs
                    </a>
                </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="glass rounded-lg p-6">
                    <Brain className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">AI-Powered Planning</h3>
                    <p className="text-sm text-slate-400">Natural language understanding via Archestra LLM</p>
                </div>

                <div className="glass rounded-lg p-6">
                    <Zap className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Instant Deployment</h3>
                    <p className="text-sm text-slate-400">MCPs deployed in seconds to Archestra</p>
                </div>

                <div className="glass rounded-lg p-6">
                    <Cpu className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Auto-Orchestration</h3>
                    <p className="text-sm text-slate-400">MCPs chained automatically for seamless workflows</p>
                </div>

                <div className="glass rounded-lg p-6">
                    <BarChart3 className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Live Monitoring</h3>
                    <p className="text-sm text-slate-400">Real-time execution tracking and insights</p>
                </div>
            </div>

            {/* How It Works */}
            <div className="glass rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>

                <div className="grid md:grid-cols-5 gap-4">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">1</div>
                        <p className="text-sm">Describe your goal</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-primary" />
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">2</div>
                        <p className="text-sm">AI plans workflow</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-primary" />
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold">3</div>
                        <p className="text-sm">Deploy & Run</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center glass rounded-lg p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to automate?</h2>
                <p className="text-slate-400 mb-6">Start building autonomous workflows right now</p>
                <Link
                    to="/builder"
                    className="inline-block px-8 py-3 btn-gradient rounded-lg font-semibold"
                >
                    Launch Builder
                </Link>
            </div>
        </div>
    )
}
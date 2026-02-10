import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation({ wsConnected }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="gradient-bg border-b border-dark-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div>
                            <h1 className="gradient-text text-xl font-bold">MCP Autopilot</h1>
                            <p className="text-xs text-slate-400">Autonomous Workflows</p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="hover:text-primary transition">Home</Link>
                        <Link to="/builder" className="hover:text-primary transition">Builder</Link>
                        <Link to="/history" className="hover:text-primary transition">History</Link>

                        <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${wsConnected ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                                }`}
                        >
                            {wsConnected ? "🟢 Connected" : "🔴 Disconnected"}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {/* {mobileOpen ? <X /> : <Menu />} */}
                    </button>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden mt-4 space-y-2 pb-4">
                        <Link to="/" className="block px-4 py-2 hover:bg-dark-card rounded">Home</Link>
                        <Link to="/builder" className="block px-4 py-2 hover:bg-dark-card rounded">Builder</Link>
                        <Link to="/history" className="block px-4 py-2 hover:bg-dark-card rounded">History</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

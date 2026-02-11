import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navigation({ wsConnected }) {
    const [open, setOpen] = useState(false)
    const [hoveredLink, setHoveredLink] = useState(null)

    const navLinks = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/builder', label: 'Builder', icon: '🔨' },
        { path: '/history', label: 'History', icon: '📋' }
    ]

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/40 backdrop-blur-2xl border-b border-slate-700/40 shadow-2xl">

            {/* Gradient line at top */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

            <div className="max-w-7xl mx-auto px-4 py-5">
                <div className="flex justify-between items-center">
                    {/* Logo with Enhanced Animation */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group hover:opacity-90 transition-all duration-300"
                    >
                        {/* Animated Icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
                            <span className="relative text-3xl animate-bounce">⚡</span>
                        </div>

                        {/* Brand Text */}
                        <div className="relative">
                            <h1 className="gradient-text text-2xl font-bold tracking-tight">
                                MCP Autopilot
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">Autonomous Workflows AI</p>

                            {/* Underline animation */}
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Nav Links */}
                        <div className="flex items-center gap-1 mr-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onMouseEnter={() => setHoveredLink(link.path)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="relative px-4 py-2 text-slate-300 font-medium transition-all duration-300 group"
                                >
                                    {/* Hover Background */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

                                    {/* Text */}
                                    <span className="relative flex items-center gap-2 group-hover:text-blue-300 transition-colors duration-300">
                                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                                        {link.label}
                                    </span>

                                    {/* Bottom Line Animation */}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Connection Status */}
                        <div className={`ml-4 pl-4 border-l transition-all duration-300 ${wsConnected
                            ? 'border-green-500/30'
                            : 'border-red-500/30'
                            }`}>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${wsConnected
                                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/50 shadow-lg shadow-green-500/20'
                                : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border border-red-500/50 shadow-lg shadow-red-500/20'
                                }`}>
                                <span className={`w-2.5 h-2.5 rounded-full ${wsConnected
                                    ? 'bg-green-400 animate-pulse'
                                    : 'bg-red-400 animate-pulse'
                                    }`}></span>
                                <span className="hidden sm:inline">
                                    {wsConnected ? 'Connected' : 'Disconnected'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center group"
                    >
                        {/* Hover Background */}
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

                        {/* Icon with animation */}
                        <span className="relative text-3xl transition-all duration-300 group-hover:text-blue-300">
                            {open ? '✕' : '☰'}
                        </span>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {open && (
                    <div className="md:hidden mt-6 pb-4 space-y-2 animate-fadeInDown">
                        {/* Mobile Nav Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 text-slate-300 font-medium rounded-lg transition-all duration-300 group hover:translate-x-1"
                            >
                                {/* Hover Background */}
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

                                {/* Content */}
                                <span className="relative flex items-center gap-3 group-hover:text-blue-300">
                                    <span className="text-xl">{link.icon}</span>
                                    {link.label}
                                </span>
                            </Link>
                        ))}

                        {/* Mobile Connection Status */}
                        <div className={`mx-4 mt-4 pt-4 border-t transition-all duration-300 ${wsConnected
                            ? 'border-green-500/30'
                            : 'border-red-500/30'
                            }`}>
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm ${wsConnected
                                ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                : 'bg-red-500/20 text-red-300 border border-red-500/50'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${wsConnected
                                    ? 'bg-green-400 animate-pulse'
                                    : 'bg-red-400 animate-pulse'
                                    }`}></span>
                                {wsConnected ? 'Connected to Backend' : 'Disconnected from Backend'}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom gradient accent */}
            <div className="h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0"></div>
        </nav>
    )
}
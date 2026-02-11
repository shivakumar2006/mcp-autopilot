import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Builder from './pages/Builder'
import History from './pages/History'
import { wsService } from './services/websocket'
import "./App.css"

function App() {
    const [wsConnected, setWsConnected] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const connectWebSocket = async () => {
            try {
                await wsService.connect()
                setWsConnected(true)

                wsService.on('disconnect', () => {
                    setWsConnected(false)
                })
            } catch (error) {
                console.log('⚠️ WebSocket connection failed:', error)
                setWsConnected(false)
                setTimeout(connectWebSocket, 3000)
            }
        }

        // Simulate loading
        setTimeout(() => {
            setLoading(false)
            connectWebSocket()
        }, 800)

        return () => {
            wsService.disconnect()
        }
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">⚡</div>
                    <p className="text-slate-400">Loading MCP Autopilot...</p>
                </div>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Navigation wsConnected={wsConnected} />
                    <main className="max-w-7xl mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/builder" element={<Builder />} />
                            <Route path="/history" element={<History />} />
                        </Routes>
                    </main>
                    <Toaster position="bottom-right" />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
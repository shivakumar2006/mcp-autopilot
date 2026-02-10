import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Builder from './pages/Builder'
import History from './pages/History'
import { wsService } from './services/websocket'
// import { Toaster } from 'react-hot-toast'
import "./App.css"

function App() {
    const [wsConnected, setWsConnected] = useState(false)

    useEffect(() => {
        const connectWebSocket = async () => {
            try {
                await wsService.connect()
                setWsConnected(true)

                wsService.on('disconnect', () => {
                    setWsConnected(false)
                })
            } catch (error) {
                console.log('⚠️ WebSocket connection failed')
                setWsConnected(false)
            }
        }

        connectWebSocket()

        return () => {
            wsService.disconnect()
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-dark text-white">
                <Navigation wsConnected={wsConnected} />
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/builder" element={<Builder />} />
                        <Route path="/history" element={<History />} />
                    </Routes>
                </main>
                {/* <Toaster position="bottom-right" /> */}
            </div>
        </BrowserRouter>
    )
}

export default App
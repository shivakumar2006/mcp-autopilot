export class WebSocketService {
    constructor() {
        this.ws = null
        this.listeners = {}
        this.url = 'ws://localhost:8000/ws'
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url)

                this.ws.onopen = () => {
                    console.log('✅ WebSocket connected')
                    resolve()
                }

                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    this.emit('message', data)

                    if (data.type === 'generation_progress') {
                        this.emit('progress', data)
                    }
                }

                this.ws.onerror = (error) => {
                    console.error('❌ WebSocket error:', error)
                    reject(error)
                }

                this.ws.onclose = () => {
                    console.log('⚠️ WebSocket disconnected')
                    this.emit('disconnect')
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data))
        }
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(callback)
    }

    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
        }
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data))
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close()
        }
    }

    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN
    }
}

export const wsService = new WebSocketService()
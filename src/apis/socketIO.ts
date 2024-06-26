import EventEmitter from 'eventemitter3'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

class SocketIO extends EventEmitter {
  private _socket: Socket | null = null

  constructor(url: string) {
    super()
    this._socket = io(url)
    this._socket.on('message', ([eventName, eventData]) => {
      this.emit(eventName, eventData)
    })
  }

  sendMessage(eventName: string, eventData: any) {
    this._socket?.emit('message', [eventName, eventData])
  }

  get socket() {
    return this._socket
  }
}

const socket = new SocketIO(import.meta.env.VITE_APP_BASE_WEBSOCKET_URL)
export const useSocket = () => socket

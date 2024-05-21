import EventEmitter from 'eventemitter3'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

class SocketIO extends EventEmitter {
  private _socket: Socket | null = null

  constructor(url: string) {
    super()
    this._socket = io(url)
    this._socket.on('message', (msg) => {
      this.emit('message', msg)
    })
  }
}

const socket = new SocketIO(import.meta.env.VITE_APP_BASE_WEBSOCKET_URL)
export const useSocket = () => socket

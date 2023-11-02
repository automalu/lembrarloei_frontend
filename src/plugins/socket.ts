import { ZeyoAppConstructor } from "./lib";
import SocketIO, { Socket } from "socket.io-client";
declare module 'socket.io-client' {
    interface Socket {
        wait(event: string, time?: number): Promise<[any, boolean]>;
        waitSocket(): Promise<boolean>;
    }
}

export default function Socketio<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        //socket: Socket = SocketIO("http://backend.alas.menu", {
        socket: Socket = SocketIO("http://localhost:8080", {
            auth: {
                accessToken: "",
                refreshToken: ""
            }
        })
        setSocket() {
            console.log(this)
            const socket = this.socket.connect()
            Socket.prototype.wait = (event: string, time?: number): Promise<[any, boolean]> => {
                return new Promise(res => {
                    let timeout: any = 0
                    function response(result: any) {
                        res(result)
                        socket.off(event, response)
                        clearTimeout(timeout)
                    }
                    if (time)
                        timeout = setTimeout(() => {
                            res(["time out foi acionando", true])
                            socket.off(event, response)
                        }, time);
                    socket.on(event, response)
                })
            }
            Socket.prototype.waitSocket = (): Promise<boolean> => {
                return new Promise((res) => {
                    if (socket.connected) res(true)
                    else
                        setTimeout(async () => {
                            console.log("esperando socket...");
                            if (!socket.connected) res(await socket.waitSocket());
                            else res(true)
                        }, 50);
                })
            }

            return this
        }
    }
}
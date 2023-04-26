import App from "../../app"

export default class Token {
    static async set(app: App){
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")
        if(accessToken && refreshToken) {
            app.socket.emit("settoken", { accessToken, refreshToken })
            const [result, err] = await app.socket.wait("settoken")
            if(err) console.error(result)
            else if(result.new) {
                localStorage.setItem("accessToken", result.accessToken)
                localStorage.setItem("refreshToken", result.refreshToken)
            }
            console.log(result, err)
        }

        if(!this.onconnected) this.onConnect(app)
    }

    static onconnected = false
    static onConnect(app: App) {
        this.onconnected = true
        app.socket.on("connect", this.set.bind(this, app))
    }
}
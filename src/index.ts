import Bridge from './models/Bridge'
import events from 'events'

class App extends events.EventEmitter {
    private id: string;
    private user: string;

    constructor(id: string, user: string) {
        super()
        this.id = id;
        this.user = user;
        this.connect()
    }

    async connect() : Promise<void> {
        try {
            const bridge = await this._getBridge();
            await bridge.authenticate(this.user)

            this.emit('ready', bridge)
        } catch (e) {
            this.emit('error', e)
        }
    }

    async _getBridge() : Promise<Bridge> {
        if (this.id) {
            return await Bridge.one(this.id);
        }

        const bridges = await Bridge.all();

        if (!bridges.length) {
            throw 'bridge not found'
        }

        return bridges[0]
    }
}

export { Bridge, App }

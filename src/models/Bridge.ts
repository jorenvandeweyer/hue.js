import axios, { AxiosInstance } from 'axios';
import Light from './Light';

interface Bridge extends BridgeResponse {};

class Bridge {
    private _username?: string;

    constructor(response: BridgeResponse,) {
        Object.assign(this, response);
    }

    set username(value: string) {
        this._username = value
    }

    get request() {
        const instance = axios.create({
            baseURL: `https://${this.internalipaddress}/api/${this._username}`,
        });

        return instance.request;
    }

    static async all () : Promise<Array<Bridge>> {
        try {
            const result = await axios.request<Array<BridgeResponse>>({
                url: 'https://discovery.meethue.com',
                method: 'GET',
            });

            return result.data.map(response => new Bridge(response));
        } catch (e) {
            return [];
        }
    }

    static async one(id: string) : Promise<Bridge|undefined> {
        const bridges = await this.all();

        return bridges.find(bridge => bridge.id === id);
    }
}

export default Bridge;

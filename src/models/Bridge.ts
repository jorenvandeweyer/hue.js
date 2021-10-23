import axios, { AxiosRequestConfig } from 'axios';
// import https from 'https';
import parseErrors from '../utils/parseErrors';
import GroupModel from './Group';
import LightModel from './Light';
import events from 'events';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Bridge extends BridgeResponse {}

class Bridge extends events.EventEmitter {
    private username?: string;

    public Group: typeof GroupModel;
    public Light: typeof LightModel;

    constructor(response: BridgeResponse,) {
        super();

        Object.assign(this, response);

        GroupModel.bridge = this;
        LightModel.bridge = this;

        this.Group = GroupModel;
        this.Light = LightModel;
    }

    async authenticate(username: string) : Promise<ConfigResponse|null> {
        this.username = username;

        try {
            const response = await this.request<ConfigResponse>({
                url: '/config'
            });

            return response;
        } catch (e) {
            delete this.username;
        }

        throw 'Authentication failed';
    }

    async request<T>(config: AxiosRequestConfig) : Promise<T> {
        if (!this.username) {
            throw 'not authenticated';
        }

        const instance = axios.create({
            baseURL: `http://${this.internalipaddress}/api/${this.username}`,
            // httpsAgent: new https.Agent({
            //     rejectUnauthorized: false
            // })
        });

        try {
            const response = await instance.request<T>(config);
            const errors = parseErrors(response.data);

            if (errors) {
                throw errors;
            }

            return response.data;
        } catch (e) {
            const error = new Error('API Call failed');

            this.emit('error', error);

            throw error;
        }
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

    static async one(id: string) : Promise<Bridge> {
        const bridges = await this.all();

        const bridge = bridges.find(bridge => bridge.id === id);

        if (!bridge) {
            throw 'bridge not found';
        }

        return bridge;
    }
}

export default Bridge;

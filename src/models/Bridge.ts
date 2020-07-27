import axios, { AxiosRequestConfig } from 'axios';
// import https from 'https';
import parseErrors from '../utils/parseErrors';
import GroupModel from './Group';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Bridge extends BridgeResponse {}

class Bridge {
    private username?: string;

    public Group: typeof GroupModel;

    constructor(response: BridgeResponse,) {
        Object.assign(this, response);

        GroupModel.bridge = this;

        this.Group = GroupModel;
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
            return null;
        }
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

        const response = await instance.request(config);
        const errors = parseErrors(response.data);

        if (errors) {
            throw errors;
        }


        return response.data;
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

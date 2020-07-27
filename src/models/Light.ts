// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Light extends LightResponse {}

class Light {
    constructor(response: LightResponse) {
        Object.assign(this, response);
    }
}

export default Light;

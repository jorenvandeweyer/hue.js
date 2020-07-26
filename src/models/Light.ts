import Axios from "axios";

interface Light extends LightResponse {};

class Light {
    constructor(response: LightResponse) {
        Object.assign(this, response);
    }
}

export default Light;

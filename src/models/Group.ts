import axios from 'axios';

interface Group extends GroupResponse {};

class Group {
    constructor(response: GroupResponse) {
        Object.assign(this, response);
    }
}

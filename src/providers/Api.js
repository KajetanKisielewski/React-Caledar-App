export default class Api {
    constructor() {
        this.url = 'http://localhost:3005/meetings'
    }


    loadData() {
        const options = { method: 'GET' };
        return this._fetch(options, this.url);
    }

    addData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        };

        return this._fetch(options, this.url)
    }

    delateData(id) {
        const options = { method: 'DELETE' };
        return this._fetch(options, this.url, `/${id}`)
    }

    _fetch(options, path, additionalPath = '') {

        const url = path + additionalPath;

        return fetch(url , options)
            .then( resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp)
            })
    }
}
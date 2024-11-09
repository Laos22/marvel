


class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=78ff23503ab44ff9b9ab6eb05da5146e';

    getRecource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }


    getALLCharacters = () => {
        return this.getRecource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCaracter = (id) => {
        return this.getRecource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }

}

export default MarvelServices;
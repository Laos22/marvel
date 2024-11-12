


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


    getALLCharacters =  async () => {
        const res = await this.getRecource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCaracter = async (id) => {
        const res = await this.getRecource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        const {name, description, thumbnail, urls, id} = char;
        return {
            name: name,
                        description: description ? `${description.slice(0, 210)}...` : 'There is no description for this character',
                        thumbnail: thumbnail.path + "." + thumbnail.extension,
                        homepage: urls[0].url,
                        wiki: urls[1].url,
                        id: id,
        }
    }
 
}

export default MarvelServices;
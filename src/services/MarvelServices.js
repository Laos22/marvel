import { useHttp } from "../components/hooks/http.hook";



const  useMarvelServices = () => {

    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=78ff23503ab44ff9b9ab6eb05da5146e';
    const _baseOffset = 210;




    const getAllCharacters =  async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCaracter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        console.log(res);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const {name, description, thumbnail, urls, id, comics} = char;
        return {
            name: name,
            description: description ? `${description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: thumbnail.path + "." + thumbnail.extension,
            homepage: urls[0].url,
            wiki: urls[1].url,
            id: id,
            comics: comics.items,
        }
    }

    return {getAllCharacters, loading, error, getCaracter};
 
}

export default useMarvelServices;
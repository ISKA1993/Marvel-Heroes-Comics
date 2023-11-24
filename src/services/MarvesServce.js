import { useHttp } from "../components/hooks/http.hook";

const  MarvesServce = () => {
    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=fddf2549b6de582a67170b795f692ce6';
    const _baseOffset = 200;


    const getAllCharacters = async (offset = _baseOffset) =>{
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=fddf2549b6de582a67170b795f692ce6`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) =>{
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=fddf2549b6de582a67170b795f692ce6`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) =>{
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            description: comics.description,
            title: comics.title,
            thumbnail:comics.thumbnail.path + '.' + comics.thumbnail.extension,
            prices: comics.prices[0].price,
            pageCount: comics.pageCount,
            wiki: comics.resourceURI,
        }
    }


    const _transformCharacter = (char) =>{
        return {
                id: char.id,
                name: char.name,
                description: char.description,
                thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension, 
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
        }
    }
    return {loading, error, getAllCharacters, getCharacter, getComics, getComic}
}

export default MarvesServce;
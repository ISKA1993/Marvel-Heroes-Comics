import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import MarvesServce from '../../services/MarvesServce';
import AppBanner from '../appBanner/AppBanner'


const ComicsList = () => {
    const {getComics} = MarvesServce();

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(300);


    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) =>{
        setNewItemLoading(true);
        getComics(offset)
            .then(onComicsLoaded)
    }
    

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.lenght<8){
            ended = true;
        }

        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (<li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}$</div>
                    </Link>
                </li>)
            });

            return (
                <ul className="comics__grid">
                    {items}
                </ul>
            )}

            const items = renderItems(comicsList);

    return (
        <div className="comics__list">
            <AppBanner/>
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
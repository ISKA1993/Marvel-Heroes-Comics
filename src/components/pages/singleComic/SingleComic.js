import './singleComic.scss';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarvesServce from '../../../services/MarvesServce';

const SingleComic = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {error, loading, getComic, } = MarvesServce()
    
   

    useEffect(() =>{
        updateComic();
    }, [comicId]);


    const updateComic = () =>{
        getComic(comicId)
            .then(onComicLoaded)
    }


    const onComicLoaded = (comic) => {
        setComic(comic);
    }


    if (comic) {
        const { description, title, thumbnail, prices, pageCount, homepage, wiki } = comic;
        return (
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr" style={{color: '#9F0013'}}>Pages: {pageCount}</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <p className="single-comic__price">{prices}$</p>

                <div className="randomchar__btns">
                    <a href='#' className="button button__main">
                        <div className="inner">homepage</div></a>
                    <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
                </a>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>

               
            </div>
            </div>
        );
    }
}

export default SingleComic;
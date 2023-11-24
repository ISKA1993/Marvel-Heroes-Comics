/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Spiner from '../spinner/spiner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvesServce from '../../services/MarvesServce';
import './charList.scss';

const CharList =  (props) => { 

    const {loading, error, getAllCharacters} = MarvesServce();

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(500);
    const [charListEnd, setCharListEnd] = useState(false)

    

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) =>{
    getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoading = () =>{
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        const ended = newCharList.length < 9;
        setCharList([...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((prevOffset) => prevOffset + 9);
        setCharListEnd(ended);
      };

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
        
            const isSelected = item.id === props.selectedCharId;
            const itemClassName = `char__item${isSelected ? ' char__item_selected' : ''}`;

            return (
                <li 
                    className={itemClassName}
                    key={i}
                    onClick={() => props.onCharSelected(item.id)}>
                        
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spiner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset)}
                        style={{'display' : charListEnd ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
        
    }



export default CharList;
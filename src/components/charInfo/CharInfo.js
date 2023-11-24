/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import './charInfo.scss';
import MarvesServce from '../../services/MarvesServce';
import Skeleton from '../skeleton/Skeleton'


const CharInfo = (props) => {
   
    const {error, loading, getCharacter} = MarvesServce()
    const [char, setChar] = useState(null);
   

    useEffect(() =>{
        updateChar();
    }, [props.charId]);


    const updateChar = () =>{
        const {charId} = props;
        if (!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }


    const onCharLoaded = (char) => {
        setChar(char);
    }

        if (!char) {
            return (
              <div className="char__info">
                    <Skeleton/>
              </div>
            );
          }

    const {name, description, thumbnail, homepage, wiki, comics} = char;

        return (
            <div className="char__info">
               <div className="char__basics">{thumbnail.includes('image_not_available.jpg') ? 
                    <img src={thumbnail}
                         style={{ objectFit: 'contain' }} />: 
                         <img src={thumbnail} alt="abyss"/>

               }
                    
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description ? description : 'No data available for this character'}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.map((item, i) =>{
                            if (i > 12) return;
                            return(
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }) 
                    }
                    
                </ul>   
            </div>
        )
    }

export default CharInfo;
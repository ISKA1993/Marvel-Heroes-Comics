import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CharSearch from "../charSearchForm/charSearch";


const MainPages = () =>{

    const [selectedChar, setChar] = useState(null);


    const onCharSelected = (id) => {
        setChar(id)
    }

    return(
        <>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} selectedCharId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                        <CharSearch/>
                    </ErrorBoundary>
                                  
                </div>
                
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </>
    )

}

export default MainPages
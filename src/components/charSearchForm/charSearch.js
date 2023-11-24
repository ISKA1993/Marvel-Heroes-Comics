

import './charSaarch.scss'

const CharSearch = () =>{
    return(
        <div className='char__search-form'>
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        >
                        <div className="inner">find</div>
                    </button>
                </div>
            <label component="div" className="char__search-error" name="charName" />
        </div>
    )
}
    
export default CharSearch


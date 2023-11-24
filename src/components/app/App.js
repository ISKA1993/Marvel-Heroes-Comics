
import AppHeader from "../appHeader/AppHeader";
import { ComicsPage, MainPages, Page404, SingleComic } from "../pages";
import{
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

const App = () => {

           return (
                <Router>
                    <div className="app">
                    <AppHeader/>
                    <Routes>
                        <Route path="/" element={<MainPages/>} />           
                        <Route path="/comics" element={<ComicsPage/>}/> 
                        <Route path="/comics/:comicId" element={<SingleComic/>}/>           
                        <Route path="*" element={<Page404/>}/> 
                    </Routes>     
                        </div>                    
                </Router>

            
        )
 

     
    }

export default App;
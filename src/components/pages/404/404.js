import './style.css'
import { Link } from 'react-router-dom';
const Page404 = () =>{

    return(
        <section id="wrapper" class="container-fluid">
        <div class="error-box">
            <div class="error-body text-center">
                <h1 class="text-danger">404</h1>
                <h3>Page Not Found !</h3>
                <p class="text-muted m-t-30 m-b-30">MOST LIKELY THE PAGE YOU ARE LOOKING FOR THERE</p>
                <Link to="/" class="btn btn-danger btn-rounded m-b-40">Back to home</Link> </div>
            <footer class="footer text-center">2017 <a href="http://bootstraptema.ru/" target="_blank">BootstrapTema</a></footer>
        </div>
        </section>
    )

}

export default Page404;
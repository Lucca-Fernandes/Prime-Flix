import { Link } from "react-router-dom";
import './erro.css'

function Erro() {
    return(
        <div className="not-found">
        <h1>404</h1> <br />
        <h2>OPS... Está página não existe!</h2>
        <Link to="/">Veja todos filmes! </Link>
        </div>
    )
}

export default Erro;
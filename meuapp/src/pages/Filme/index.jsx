import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import api from '../../services/api'
import './filme.css'

function Filme() {
    const { id } = useParams()
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate()

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "bf04231c521368f1d9a9354679d857f0",
                    language: "pt-BR",
                }
            })
            .then((response) =>{
                setFilme(response.data);
                setLoading(false)
            })
            .catch(() =>{
                console.log("FILME NÃO ENCONTRADO")
                navigation("/", {replace: true})
                return;
            })
        }
        loadFilmes();

        return () => {
            console.log('COMPONENTE FOI DESMONTADO')
        }

    }, [navigation, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        
            if(hasFilme){
                toast.warn("Este filme já se encontra na sua lista!")
                return;
        }
     
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }


    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>    
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`http://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>    
    )
}

export default Filme;
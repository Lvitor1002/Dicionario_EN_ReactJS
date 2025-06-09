import Swal from 'sweetalert2';
import axios from 'axios'

const api = axios.create({

    baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/"
})


export async function buscarSignificados(palavra) {
    
    try{
        const respostaApi = await api.get(palavra)
        
        return respostaApi.data[0]

    }catch(erro){

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Could not find the word "${palavra}"`,
        })
        throw erro
    }
}
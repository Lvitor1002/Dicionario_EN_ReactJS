// import { useEffect, useRef, useState } from 'react'
import { useRef, useState } from 'react';
import './App.css'
import { buscarSignificados } from './services/ApiRepository'
import Swal from 'sweetalert2';



function App() {

  const [dados, setDados] = useState(null);
  const inputPesquisa = useRef()
  
  async function Buscar(evento){

    evento.preventDefault()

    try{

      const palavra = inputPesquisa.current.value

      if(!palavra){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Empty or incorrect field!`,
        })
        return
      }
  
      const resultado = await buscarSignificados(palavra)
      setDados(resultado)

    }catch(erro)
    {
      setDados(null)
      console.error("Erro na busca:", erro);
    }
  } 



  
  return (
    <div className="controleApp">
      <form onSubmit={Buscar}>

        <h1>Dictionary <span id='b'>E</span><span id='r'>N</span></h1>
        
        <div className="controle">
          <input 
            type="text"
            name="pesquisa"
            aria-label="Enter a word to search"
            placeholder='Insert a word' 
            ref={inputPesquisa}
          />
          <button type='submit'>Search</button>
        </div>
      </form>

      <div className="campoResultado">
      {dados && (
      <>
          <h3>{dados.word}</h3>
          
          {dados.meanings.map((significado,idx)=>(
            
            <div key={idx}>
              
              <ol>

                {significado.definitions.slice(0, 3).map((definicao,i)=>(

                  <li key={i}>
                      {definicao.definition}
                  </li>

                ))}

              </ol>

            </div>

          ))}

      </>
      )}

      </div>

    </div>
  )
}

export default App

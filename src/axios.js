import Axios from 'axios'

import Config from './config/config'

//Axios.defaults.baseURL = Config.ROOT_API

// Criando instâncias do Axios com valores padrões.

const instancia = Axios.create({})

instancia.defaults.baseURL = Config.ROOT_API

/*
export default Axios.create({
    baseURL : Config.ROOT_API
})
*/

instancia.interceptors.request.use(Config => {
    
    console.log ('Interceptando requisição: ', Config)

        Config.data = {
            ...Config.data,
            curso: 'Vue JS' 
        }

        //Enviando para todas os tipos de requisições
        //config.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
        Config.headers.common['Authorization'] = `Bearer token_jwt`

        //Enviando para PUT
        Config.headers.put['Meu-Cabecalho'] = 'Curso Vue JS'

        return Config
        
        /*return new Promise ((resolve, reject)=>{
            console.log('Fazendo requisição aguardar...')
            setTimeout(()=>{
                console.log('Enviando requisição...')
                resolve(config)
            },2000)

        //Pode ser utilizado como ponto global para gerenciamento de erros na aplicação
        })*/
    
},error => {
        
    console.log('Erro ao fazer requisição: ', error)

    //Passando o erro para frente para ser capturado por algum component
    return Promisse.reject(error)
})


//Capturando os erros gerados na resposta de forma global
instancia.interceptors.response.use(response => {

    //
    console.log('Interceptando resposta...', response.status)

    //
    if(Array.isArray(response.data)){

        response.data = response.data.slice(1,3)

    }

    return response 

},error =>{

    console.log('Erro capturado no interceptador de respostas:', error)

    //Passando o error para frente para ser capturado por algum component
    return Promise.reject(error)
})


export default instancia
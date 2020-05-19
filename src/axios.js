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

instancia.interceptors.request.use(config => {
    
    console.log ('Interceptando requisição: ', config)

        config.data = {
            ...config.data,
            curso: 'Vue JS' 
        }

        //Enviando para todas os tipos de requisições
        //config.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
        config.headers.common['Authorization'] = `Bearer token_jwt`

        //Enviando para PUT
        config.headers.put['Meu-Cabecalho'] = 'Curso Vue JS'

        return config
        
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

export default instancia
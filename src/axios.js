import Axios from 'axios'

import Config from './config/config'

//Axios.defaults.baseURL = Config.ROOT_API

// Criando instâncias do Axios com valores padrões.
export default Axios.create({
    baseURL : Config.ROOT_API
})
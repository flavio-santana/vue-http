import Axios from 'axios'

import Config from './config/config'

Axios.defaults.baseURL = Config.ROOT_API

export default Axios
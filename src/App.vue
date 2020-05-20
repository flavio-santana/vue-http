<template>
  <div id="app">
    
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Requisições HTTP no Vue</h1>
        <p class="lead">Usando a biblioteca Axios para fazer chamadas Ajax à uma API REST.</p>
      </div>
    </div>

    <div class="container">

      <TarefasLista />

    </div>

  </div>
</template>

<script>

import Axios from 'axios'
import Config from './config/config'

import TarefasLista from './components/TarefasLista.vue'

export default {
    components: {
        TarefasLista
    },
    /**
     * Trabalhando com requisições simultâneas no Axios
     * 
     * Implementado método Async Await, para tornar o código 
     * mais legível, fácil, consumir API's e de se entender.  
     */
    async created(){
      
      /*
      Axios.all([
        
        Axios.get(`${Config.ROOT_API}/tarefas/1`),
      
        Axios.get(`${Config.ROOT_API}/tarefas/3`)
      
      ]).then(Axios.spread((tarefa1, tarefa3) => {

        console.log('Requisições simultâneas:')
        
        console.log('Tarefa 1:', tarefa1)
        
        console.log('Tarefa 3:', tarefa3)

      }))
      */

      /*
      Axios.all([
        
        Axios.get(`${Config.ROOT_API}/tarefas/1`),
      
        Axios.get(`${Config.ROOT_API}/tarefas/3`)
      
      ]).then(response => {

        const [tarefa1, tarefa3] = response
        
        console.log('Requisições simultâneas:')
        
        console.log('Tarefa 1:', tarefa1)

        console.log('Tarefa 3:', tarefa3) 
      })
      */

      const tarefa1 = await Axios.get(`${Config.ROOT_API}/tarefas/1`)
      const tarefa3 = await Axios.get(`${Config.ROOT_API}/tarefas/3`)

      console.log('Requisições simultâneas:')
      console.log('Tarefa 1:', tarefa1)  
      console.log('Tarefa 3:', tarefa3)

    }
}
</script>
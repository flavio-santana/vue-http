<template>
    <div>
        
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="bt btn-primary float-right"
                    @click="exibirFormulario=!exibirFormulario">
                        <i class="fa fa-plus mr-2">
                            <span>Criar</span>
                        </i>
                </button>
            </div>
        </div>
        
        <ul class="list-group" v-if="tarefas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefas"
                :key="tarefa.id"
                :tarefa="tarefa" />
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar 
            v-if="exibirFormulario"
            @criar="criarTarefa"/>

    </div>
</template>

<script>

import Axios from 'axios'

import Config from './../config/config'
import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            tarefas: [],
            exibirFormulario : false
        }
    },
    created(){
        Axios.get(`${Config.ROOT_API}/tarefas`)
        .then((response) => {
            // handle success
            console.log('GET / tarefas', response)

            this.tarefas = response.data
        })
        /*
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
        */
    },
    methods:{
        criarTarefa(tarefa){
            Axios.post(`${Config.ROOT_API}/tarefas`, tarefa)
            .then((response) => {
                
                // handle success
                console.log('POST / tarefas', response)
                
                //Pegando a tarefa 
                this.tarefas.push(response.data)

                this.exibirFormulario = false
            })
            
        }
    }
}
</script>
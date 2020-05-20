<template>
    <div>
        
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="bt btn-primary float-right"
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa fa-plus mr-2">
                            <span>Criar</span>
                        </i>
                </button>
            </div>
        </div>
        
        <ul class="list-group" v-if="tarefasOrdenadas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasOrdenadas"
                :key="tarefa.id"
                :tarefa="tarefa" 
                @editar="selecionarTarefaParaEdicao"
                @deletar="deletarTarefa"
                @concluir="editarTarefa"/>
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma tarefa criada.</p>

        <div class="alert alert-danger" v-else>{{ mensagemErro }} </div>

        <TarefaSalvar 
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada"
            @criar="criarTarefa"
            @editar="editarTarefa"/>

    </div>
</template>

<script>

import Axios from './../axios'

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
            exibirFormulario : false,
            tarefaSelecionada : undefined,
            mensagemErro : undefined
        }
    },
    computed: {
        tarefasOrdenadas(){
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.tarefas.slice().sort((t1, t2) => {

                if(t1.concluido === t2.concluido){
                    return t1.titulo < t2.titulo
                        ? -1
                        : t1.titulo > t2.titulo
                            ? 1 
                            : 0          
                }
                
                return t1.concluido - t2.concluido
            
            })
        }
    },
    created(){
        Axios.get(`/tarefas`)
        .then((response) => {

            // handle success
            console.log('GET / tarefas', response)

            this.tarefas = response.data
        })
        .catch(error => {
            
            console.log('Erro capturado no catch:', error)
            
            if(error.response){
                
                //
                this.mensagemErro = `Servidor retornou um erro: ${error.message} ${error.response.statusText}`

                //
                console.log('Erro [resposta]: ', error.response)
            
            }else if (error.request){
                
                //
                this.mensagemErro = `Erro ao tentar ao comunicar com o servidor: ${error.message}`

                //
                console.log('Erro [requisição]: ', error.request)

            }else{

                //
                this.mensagemErro = `Erro ao fazer requisição ao servidor: ${error.message}`
            }


        })
        //.finally(() => this.loading = false)
    
    },
    methods:{
        criarTarefa(tarefa){
            
            Axios.post(`/tarefas`, tarefa)
                .then((response) => {
                    
                    // handle success
                    console.log('POST / tarefas', response)
                    
                    //Pegando a tarefa 
                    this.tarefas.push(response.data)

                    //
                    this.resetar()
                })
            
            /**
             * Outra maneira de montar requisições no Axios
             */
            /* 
            Axios.request({
                method:'post',
                baseURL: Config.ROOT_API,
                url: `/tarefas`,
                data: tarefa
            }).then((response) => {
                    
                    // handle success
                    console.log('POST / tarefas', response)
                    
                    //Pegando a tarefa 
                    this.tarefas.push(response.data)

                    //
                    this.resetar()
                })
            */
        },
        editarTarefa(tarefa){

            console.log('Editar', tarefa)

            Axios.put(`/tarefas/${tarefa.id}`, tarefa)
                .then((response) => {
                    
                    // handle success
                    console.log(`PUT /tarefas/${tarefa.id}`, response)
                    
                    //
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id)

                    //
                    this.tarefas.splice(indice, 1, tarefa)
                    
                    //
                    this.resetar()
                })

        },
        /*
        deletarTarefa(tarefa){

            console.log('Deletar', tarefa)

            const confirmar = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`)
            
            if(confirmar){
                
                 Axios.delete(`/tarefas/${tarefa.id}`)
                    .then((response) => {
                        
                        // handle success
                        console.log(`DELETE /tarefas/${tarefa.id}`, response)
                        
                        //
                        const indice = this.tarefas.findIndex(t => t.id === tarefa.id)

                        //
                        this.tarefas.splice(indice, 1)
                        
                    })
            }

        },
        */

        /**
         * Implementado método Async Await, para tornar o código 
         * mais legível efácil mais legível, fácil, consumir API's 
         * e de se entender.
         */
        async deletarTarefa(tarefa){

            console.log('Deletar', tarefa)

            const confirmar = window.confirm(`Deseja deletar a tarefa "${tarefa.titulo}"?`)
            
            if(confirmar){
                
                // Tratamento de erro
                try{

                    //
                    const response = await Axios.delete(`/tarefas/${tarefa.id}`)

                    // handle success
                    console.log(`DELETE /tarefas/${tarefa.id}`, response)

                    //
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id)

                    //
                    this.tarefas.splice(indice, 1)

                }catch(error){

                    console.log('Error ao deletar tarefa...')        

                }finally{
                    
                    console.log('Sempre executado...')
                }
                
            }

        },
        
        exibirFormularioCriarTarefa(event){
            
            if(this.tarefaSelecionada){
                this.tarefaSelecionada = undefined
                return
            }

            this.exibirFormulario = !this.exibirFormulario
        },
        resetar(){

            this.tarefaSelecionada = undefined
            
            this.exibirFormulario = false
        },
        selecionarTarefaParaEdicao(tarefa){

            this.tarefaSelecionada = tarefa

            this.exibirFormulario = true
        }
    }
}
</script>
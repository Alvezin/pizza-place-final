<template>
    <section>
        <h1>Pedidos</h1>
        <h2>{{ state.msg }}</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>pedidos</th>
                    <th>Valor Total</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='data in state.dataFromDb' :key='data.id'>
                    <td>{{ data.nome }}</td>
                    <td>
                        <ul>
                            <li v-for="(itens,index) in data.pedidos" :key="index">
                                {{ itens.item }} - <strong> R${{ itens.preco }} </strong>
                            </li>
                        </ul>
                    </td>
                    <td><strong> R${{ data.precoTotal }} </strong></td>
                    <td>
                        <button @click.prevent="removeFromDb(data.id)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
export default {
  name: 'DashboardPedidos',
  setup () {
    const state = reactive({
      dataFromDb: null,
      msg: null
    })

    async function getDataFromDb () {
      const req = await fetch('http://localhost:3000/pedidos')
      const res = await req.json()
      state.dataFromDb = [...res]
    }
    onBeforeMount(() => {
      getDataFromDb()
    })

    function statusMsg (msg) {
      state.msg = msg
      setTimeout(() => {
        state.msg = null
      }, 4000)
    }

    async function removeFromDb (id) {
      await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: 'DELETE'
      })

      statusMsg(`Pedido Nº${id} removido com sucesso!`)
      getDataFromDb()
    }

    return {
      state,
      removeFromDb
    }
  }
}
</script>

<style lang="scss" scoped>
    section{
        text-align: center;
        height: 500px;
        overflow-y: scroll;
        width: 80vw;
        margin: 20px auto;
        background-color: rgb(177, 168, 168);
        border-radius: 8px;
        & table{
            width: inherit;
            border-collapse: collapse;
            & tr{
                text-align: center;
            }
            & thead{
                & th{
                    border-bottom: 2px solid black;
                }
            }
            & tbody{
                & td{
                    padding: 5px;
                    border-bottom: 1.5px solid black;
                    min-height: 150px;
                    & ul{
                        & li{
                            list-style: none;
                        }
                    }
                    & button{
                        background-color: red;
                        color: white;
                        border: 1px solid black;
                        border-radius: 50%;
                        padding: 3px 6px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>

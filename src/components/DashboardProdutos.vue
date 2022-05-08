<template>
    <section>
        <h1>Produtos</h1>
        <h2>{{ state.msg }}</h2>
        <div>
            <label for="item">Selecione uma categoria: </label>
            <select name="produto" id="item" v-model="state.tipoProduto" >
                <option value="">Selecione o produto</option>
                <option value="pizzas">pizza</option>
                <option value="bebidas">Bebidas</option>
            </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th v-show="state.tipoProduto === 'pizzas'">Ingredientes</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='data in state.data' :key='data.id'>
                    <td>{{ data.id }}</td>
                    <td>{{ data.tipo }}</td>
                    <td v-show="state.tipoProduto === 'pizzas'">
                        <ul>
                            <li v-for="(itens,index) in data.ingredientes" :key="index">
                                {{ itens }}
                            </li>
                        </ul>
                    </td>
                    <td><strong> R${{ data.preco }} </strong></td>
                    <td>
                        <button @click.prevent="removeFromDb(state.tipoProduto,data.id)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'DashboardProdutos',
  setup () {
    const state = reactive({
      msg: null,
      tipoProduto: null,
      data: null
    })

    function statusMsg (msg) {
      state.msg = msg
      setTimeout(() => {
        state.msg = null
      }, 4000)
    }

    async function getDataFromDb () {
      const req = await fetch(`http://localhost:3000/${state.tipoProduto}`)

      const res = await req.json()
      state.data = [...res]
    }

    watch(
      () => state.tipoProduto,
      () => {
        getDataFromDb()
      }
    )

    async function removeFromDb (tipo, id) {
      const req = await fetch(`http://localhost:3000/${tipo}/${id}`, {
        method: 'DELETE'
      })
      const res = await req.json()
      statusMsg(`O Item Nº ${res.id} foi removido com sucesso`)
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

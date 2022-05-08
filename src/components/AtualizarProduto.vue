<template>
    <section>
        <h1>Alterar Dados</h1>
        <h1>{{ state.msg }}</h1>
        <div>
            <label for="tipo">Selecione a categoria: </label>
            <select name="produto" id="item" v-model="state.tipoProduto" >
                <option value="">Selecione o produto</option>
                <option value="pizzas">pizza</option>
                <option value="bebidas">Bebidas</option>
            </select>
        </div>
        <div>
            <label for="id">Selecione o id do produto: </label>
            <input type="number" v-model="state.id">
        </div>
        <button @click.prevent='getProduct()'>Pesquisar</button>
        <div>
            <div>
                <label for="tipo">Produto: </label>
                <input type="text" name="" id="tipo" v-model="state.tipo">
            </div>
            <div>
                <label for="preco">Preço: </label>
                <input type="text" name="" id="preco" v-model="state.preco">
            </div>
            <div id="ingredientes-input" v-show="state.tipoProduto === 'pizzas'">
                <label for="ingredientes">Ingredientes: </label>
                <input type="text" v-model="state.ingredientes">
            </div>
        </div>
        <button @click.prevent='alterarData()'>
            Salvar Alterações
        </button>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'AtualizarProduto',
  setup () {
    const state = reactive({
      tipoProduto: null,
      id: null,
      tipo: null,
      preco: null,
      ingredientes: null,
      msg: null
    })

    function statusMsg (msg) {
      state.msg = msg
      setTimeout(() => {
        state.msg = null
      }, 4000)
    }
    async function alterarData () {
      if (state.tipoProduto === 'pizzas') {
        const data = {
          tipo: state.tipo,
          preco: state.preco,
          ingredientes: [...state.ingredientes]
        }
        const dataJson = JSON.stringify(data)
        const req = await fetch(`http://localhost:3000/pizzas/${state.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })
        const res = await req.json()
        statusMsg(`Produto Nº${res.id} atualizado`)
      } else if (state.tipoProduto === 'bebidas') {
        const data = {
          tipo: state.tipo,
          preco: state.preco
        }
        const dataJson = JSON.stringify(data)
        const req = await fetch(`http://localhost:3000/bebidas/${state.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })
        const res = await req.json()
        statusMsg(`Produto Nº${res.id} atualizado`)
      }

      state.id = null
      state.tipo = null
      state.preco = null
      state.ingredientes = null
    }

    async function getProduct () {
      const req = await fetch(`http://localhost:3000/${state.tipoProduto}/${state.id}`)
      const res = await req.json()
      state.tipo = res.tipo
      state.preco = res.preco
      if (state.tipoProduto === 'pizzas') {
        state.ingredientes = [...res.ingredientes]
      }
      console.log(state.tipo)
    }
    return {
      state,
      getProduct,
      alterarData
    }
  }
}
</script>

<style lang="scss" scoped>
    section{
        text-align: center;
        width: 80vw;
        margin: 20px auto;
        background-color: rgb(161, 152, 152);
        border-radius: 8px;
        padding: 8px;
            & div{
                display: flex;
                flex-direction: column;
                width: inherit;
                margin: 10px auto;
                & input{
                    padding: 5px 8px;
                    border-radius: 8px;
                    border: 1px solid rgb(101, 98, 98);
                    width: 200px;
                    display: block;
                    margin: auto;
                }
                & select{
                    width: 200px;
                    display: block;
                    margin: auto;
                }

            }
            & button{
                padding: 5px 8px;
                cursor: pointer;
                background-color: beige;
                text-transform: uppercase;
                border-radius: 8px;
            }
    }
</style>

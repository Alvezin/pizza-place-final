<template>
    <section>
        <h4>Adicionar novo Produto ao Banco de Dados</h4>
        <h5> {{ state.msg }}</h5>
        <form @submit.prevent='sendNew()'>
            <div>
                <label for="item">Selecione uma categoria: </label>
                <select name="produto" id="item" v-model="state.tipoProduto">
                    <option value="">Selecione o produto</option>
                    <option value="pizzas">pizza</option>
                    <option value="bebidas">Bebidas</option>
                </select>
            </div>
            <div>
                <label for="nome">Nome do produto: </label>
                <input type="text" id="nome" placeholder="Insira o nome do produto: " v-model="state.nomeProduto">
            </div>
            <div>
                <label for="preco">Preço: </label>
                <input type="number" id="preco" placeholder="Insira o preço do produto: " v-model="state.precoProduto">
            </div>
            <div v-show="state.tipoProduto === 'pizzas'" id="ingredientes-input">
                <label for="ingredientes">Ingredientes: </label>
                <input type="text" placeholder="Insira os ingredientes: " v-model="state.itensIngrediente">
                <small>Insira os itens separados por vírgula</small>
            </div>
            <button>Enviar</button>
        </form>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'AddProdutos',
  setup () {
    const state = reactive({
      nomeProduto: null,
      precoProduto: null,
      itensIngrediente: null,
      tipoProduto: null,
      msg: null
    })

    async function sendNew () {
      if (state.tipoProduto === 'pizzas') {
        const data = {
          tipo: state.nomeProduto,
          preco: state.precoProduto,
          src: 'https://via.placeholder.com/300',
          ingredientes: [...state.itensIngrediente.split(',')]
        }

        const dataJson = JSON.stringify(data)
        const req = await fetch(`http://localhost:3000/${state.tipoProduto}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })
        const res = await req.json()
        console.log(res)
      } else if (state.tipoProduto === 'bebidas') {
        const data = {
          tipo: state.nomeProduto,
          preco: state.precoProduto,
          src: 'https://via.placeholder.com/300'
        }
        const dataJson = JSON.stringify(data)
        const req = await fetch(`http://localhost:3000/${state.tipoProduto}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })
        const res = await req.json()
        statusMsg(`Produto Nº${res.id} adicionado com sucesso`)
      }
      state.nomeProduto = null
      state.precoProduto = null
      state.itensIngrediente = null
      state.tipoProduto = null

      function statusMsg (msg) {
        state.msg = msg
        setTimeout(() => {
          state.msg = null
        }, 4000)
      }
    }

    return {
      state,
      sendNew

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
        & form{
            & div{
                display: flex;
                flex-direction: column;
                width: 200px;
                margin: 10px auto;
                & input{
                    padding: 5px 8px;
                    border-radius: 8px;
                    border: 1px solid rgb(101, 98, 98);
                }

            }
            & #ingredientes-input{
                width: 500px;
            }
            & button{
                padding: 5px 8px;
                cursor: pointer;
                background-color: beige;
                text-transform: uppercase;
                border-radius: 8px;
            }
        }
    }
    @media screen and (max-width: 665px) {
        section{
            & form{
                & #ingredientes-input{
                    width: 100%;
                }
            }
        }
    }
</style>

<template>
    <section>
        <h2>Itens no carrinho:</h2>
        <div>
            <ul>
                <li v-for="(item,index) in state.cartListFromProp" :key="index">{{ item.item }} <button @click.prevent="removeFromCart(index)">X</button></li>
            </ul>
        </div>
        <p>Valor total: R${{ state.soma }}</p>
        <h1>{{ state.msg }}</h1>
        <label for="nome">Nome: </label>
        <input type="text" id="nome" placeholder="Digite seu nome:" required v-model="state.nome">
        <button @click.prevent="sendData()" class="btn">Adicionar Pedido</button>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'CartComponent',
  props: {
    cartList: Array,
    arraySoma: Array
  },
  setup (props, { emit }) {
    const state = reactive({
      priceArrayFromProps: [],
      cartListFromProp: [],
      soma: null,
      nome: null,
      msg: null
    })

    function getDataFromProp () {
      state.priceArrayFromProps = [...props.arraySoma]
      reduzir()
      state.cartListFromProp = [...props.cartList]
    }
    function reduzir () {
      state.soma = state.priceArrayFromProps.reduce((a, b) => {
        return a + b
      }, 0)
    }
    watch(() => props.cartList, () => {
      return getDataFromProp()
    }, {
      deep: true
    })
    function cleanPedidos () {
      state.nome = null
      state.soma = null
      state.priceArrayFromProps = null
      state.cartListFromProp = null
      emit('clean')
    }

    function statusMsg (msg) {
      state.msg = msg
      setInterval(() => {
        state.msg = null
      }, 5000)
    }

    function removeFromCart (index) {
      emit('removed', index)
      getDataFromProp()
    }

    async function sendData () {
      try {
        const data = {
          nome: state.nome,
          pedidos: [...props.cartList],
          precoTotal: state.soma
        }

        if (data.nome === '') throw new Error('Digite um nome')
        if (parseInt(data.nome)) throw new Error('Número são inválidos para o nome')
        if (data.nome === undefined || data.nome === null) throw new Error('Digite um nome')
        if (data.pedidos.length === 0) throw new Error('Selecione os itens antes de criar um pedido')

        const jsonData = JSON.stringify(data)
        const req = await fetch('http://localhost:3000/pedidos', {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonData
        })

        const res = await req.json()
        cleanPedidos()
        statusMsg(`Pedido Nº ${res.id} foi criado com sucesso`)
      } catch (error) {
        statusMsg(error)
      }
    }

    return {
      state,
      removeFromCart,
      sendData
    }
  }

}
</script>

<style lang="scss" scoped>
    section{
        background-color: grey;
        border-radius: 8px;
        margin: 10px;
        padding: 5px;
        min-height: 400px;
        text-align: center;
            & div{
                overflow-y: scroll;
                height: 300px;

            }
            & .btn{
                display: block;
                margin: auto;
                margin-top: 5px;
                padding: 5px 7px;
                cursor: pointer;
            }
            input{
                border-radius: 8px;
                padding: 5px 7px;
            }
    }
</style>

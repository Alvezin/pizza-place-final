<template>
  <section class="template">
      <section class="itens">
            <p v-show="categorySelect == '' || categorySelect == null" class="msg">Os dados aparecerão aqui</p>
            <div class="data-container" v-for="item in state.data" :key='item.id' >
                <div>
                    <h3>{{ item.tipo }}</h3>
                    <img :src="item.src" alt="">
                    <h4>R${{ item.preco }}</h4>
                    <ul v-show='categorySelect === "pizzas"'>
                        <li v-for="recheio in item.ingredientes" :key="recheio">
                            {{ recheio }}
                        </li>
                    </ul>
                    <button class="cart-add-btn" @click.prevent="addCart(item.tipo, item.preco),reduzir()">Adicionar ao Carrinho <ion-icon name="cart"></ion-icon></button>
                </div>
            </div>
      </section>
      <section class="carrinho">
          <cart-component :cartList="state.cartItens" :somaValue="state.valorFinal" :arraySoma="state.somaValue" @removed="removeFromCart($event)" @clean="cleanPedidos" />
      </section>
  </section>
</template>

<script>
import CartComponent from './CartComponent.vue'
import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'DadosCardapio',
  props: {
    categorySelect: String
  },
  components: {
    CartComponent
  },
  setup (props) {
    const state = reactive({
      data: null,
      cartItens: [],
      somaValue: [],
      valorFinal: null
    })

    async function getSearch () {
      const req = await fetch(`http://localhost:3000/${props.categorySelect}`)
      const res = await req.json()
      state.data = res
    }
    function addCart (item, preco) {
      state.cartItens.push(
        {
          item: item,
          preco: Number(preco)
        }
      )
      state.somaValue.push(Number(preco))
    }
    function reduzir () {
      state.valorFinal = state.somaValue.reduce((a, b) => {
        return a + b
      }, 0)
    }

    function removeFromCart (e) {
      state.cartItens.splice(e, 1)
      state.somaValue.splice(e, 1)
      return ([...state.cartItens], [...state.somaValue])
    }
    function cleanPedidos () {
      state.somaValue = []
      state.cartItens = []
      state.valorFinal = null
    }

    watch(
      () => props.categorySelect,
      () => {
        getSearch()
      }
    )

    return {
      state,
      addCart,
      reduzir,
      removeFromCart,
      cleanPedidos
    }
  }
}
</script>

<style lang="scss" scoped>
    .template{
        display: grid;
        grid-template-areas:
        "item cart"
        "item cart";
        grid-template-columns: 60% 40%;
        & .itens{
            text-align: center;
            overflow-y: scroll;
            height: 430px;
            grid-area: item;
            background-color: grey;
            border-radius: 8px;
            margin: 10px;
            padding: 5px;
            & .data-container{
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                align-items: center;
                justify-content: space-around;
                gap: 20px;

                & div{
                    width: 400px;
                    min-height: 400px;
                    padding: 20px;
                    margin: 20px auto;
                    background-color: #F25430;
                    border-radius: 8px;
                    color: white;
                    border: 1px solid #A64646;

                    & img{
                        border-radius: 20px;
                        height: 200px;
                        border: .1px solid black;
                    }
                    & ul{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        gap: 5px;
                        justify-content: space-around;
                        list-style: none;
                        & span{
                            font-weight: bold;
                        }
                    }
                    & li{
                        width: fit-content;
                    }
                    & h3{
                        text-transform: uppercase;
                        margin-bottom: 10px;

                    }
                    & h4{
                        text-transform: uppercase;
                        font-weight: bold;
                        color: green;
                        font-size: 2rem;
                    }
                    & .cart-add-btn{
                        padding: 5px 8px;
                        margin-top: 5px;
                        background-color: #A64646;
                        border-radius: 8px;
                        border: 2px solid #F2CA52;
                        cursor: pointer;
                        font-weight: bold;
                        text-transform: uppercase;
                        color: white;
                    }
                }
            }
        }
        & .carrinho{
            grid-area: cart;

        }
    }

    @media screen and (max-width: 607px) {
        .template{
            grid-template-areas:
            "item item"
            "cart cart";
            grid-template-rows: 60% 40%;
            width: 100%;
            & .itens{
                & .data-container{
                    & div{
                        width: 320px;

                    }
                }
            }
        }
    }

</style>

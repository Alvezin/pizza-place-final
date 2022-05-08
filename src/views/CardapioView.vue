<template>
  <main>
    <h2 class="title">Faça seu pedido!</h2>
    <div class='data'>
      <label for="categoria">Categoria: </label>
      <select name="" id="categoria" v-model="state.categorySelect" >
        <option value="" >Selecione a categoria</option>
        <option value="pizzas" >Pizzas</option>
        <option value="bebidas">Bebidas</option>
      </select>
    </div>
    <div class="appear">
      <dados-cardapio :categorySelect="state.categorySelect"/>
    </div>
  </main>
</template>

<script>
import DadosCardapio from '../components/DadosCardapio.vue'
import { reactive } from '@vue/reactivity'
export default {
  name: 'CardapioView',
  components: {
    DadosCardapio
  },
  setup () {
    const state = reactive({
      categorySelect: null
    })

    return {
      state
    }
  }
}

</script>
<style lang="scss" scoped>
  main{
    text-align: center;

    & .appear{
        min-height: 500px;
        background-color: rgb(197, 188, 188);
        width: 80%;
        margin: 1px auto 20px auto;
        border: 3px solid rgb(161, 158, 158);
        border-radius: 8px;
    }
    #categoria{
      padding: 2px;
      margin-top: 3px;
    }
  }
  @media screen and (max-width: 445px) {
    main{
      & .appear{
        width: 95vw;

      }
    }
  }
</style>

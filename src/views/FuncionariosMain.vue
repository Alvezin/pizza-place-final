<template>
    <main>
        <ul>
            <li><a href="" @click.prevent="goTo($event)">Pedidos</a></li>
            <li><a href="" @click.prevent="goTo($event)">Produtos</a></li>
            <li><a href="" @click.prevent="goTo($event)">Adicionar Itens</a></li>
            <li><a href="" @click.prevent="goTo($event)">Alterar Dados</a></li>
        </ul>
        <dashboard-pedidos v-show="state.tela == 'Pedidos'"/>
        <dashboard-produtos v-show="state.tela == 'Produtos'"/>
        <add-produtos v-show="state.tela == 'Adicionar Itens'"/>
        <atualizar-produto v-show="state.tela == 'Alterar Dados'"/>
    </main>
</template>

<script>
import { reactive } from '@vue/reactivity'
import DashboardPedidos from '../components/DashboardPedidos.vue'
import DashboardProdutos from '../components/DashboardProdutos.vue'
import AddProdutos from '../components/AddProdutos.vue'
import AtualizarProduto from '../components/AtualizarProduto.vue'
export default {
  name: 'FuncionarioMain',
  components: {
    DashboardPedidos,
    DashboardProdutos,
    AddProdutos,
    AtualizarProduto

  },
  setup () {
    const state = reactive({
      tela: null
    })
    function goTo (e) {
      state.tela = e.target.text
    }

    return {
      state,
      goTo
    }
  }
}
</script>

<style lang="scss" scoped>
    main{
        min-height: 400px;
        & ul{
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
            padding: 0 10px;
            & li{
                text-transform: uppercase;
                & a{
                    text-decoration: none;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }

    }
</style>

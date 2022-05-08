<template>
    <header>
        <a href="/"><h1>Pizza Place</h1></a>
        <nav>
            <button @click.prevent='openMobileMenu()'>Menu</button>
            <ul id="menu">
                <router-link to="/" @click='removeClass()'>Home</router-link>
                <router-link to="/cardapio" @click='removeClass()'>Cardápio</router-link>
                <router-link to="/funcionarios" @click='removeClass()'>Funcionário</router-link>

            </ul>
        </nav>
    </header>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'HeaderComponent',
  setup () {
    const state = reactive({
      buttonActive: false
    })

    function openMobileMenu () {
      const menu = document.getElementById('menu')
      menu.classList.toggle('menu-mbl')
    }
    function removeClass () {
      const menu = document.getElementById('menu')
      menu.classList.remove('menu-mbl')
    }

    return {
      state,
      openMobileMenu,
      removeClass
    }
  }
}
</script>

<style lang="scss" scoped>
    header{
        background-color: #F2CA52;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 150px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom: 2px solid rgb(115, 69, 52);
        & a{
            text-decoration: none;
            font-weight: bold;
            &.router-link-exact-active {
                color: #F25430;
                border-bottom: 3px solid #A64646;
    }
        }
        & h1{
            text-transform: uppercase;
            color: orange;
            font-weight: bold;
            border: 3px solid orange;
            background-color: #A64646;
            padding: 20px;
            border-radius: 20px;
            border-top-left-radius: 0px;
        }
        & nav{
            & button{
                display: none;
            }
            & ul{
                display: flex;
                gap: 50px;
                & a{
                    color: red;
                    text-transform: uppercase;
                }
            }
        }
    }

    @media screen and (max-width: 645px) {
        header{
            & nav{
                & button{
                    display: block;
                    padding: 10px 5px;
                    text-transform: uppercase;
                    border-radius: 50%;
                }
                & ul{
                    position: absolute;
                    top: 150px;
                    z-index: 10;
                    left: 0;
                    padding: 20px;
                    height: 0px;
                    width: 100vw;
                    background-color: rgb(235, 231, 231);
                    flex-direction: column;
                    overflow: hidden;
                    transition: .5s;
                    visibility: hidden;
                }
                & ul.menu-mbl{
                    visibility: visible;
                    transition: .5s;
                    height: 200px;
                }
            }
        }
    }
</style>

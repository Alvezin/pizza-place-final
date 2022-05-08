<template>
    <section class="destaque">
        <h2>Nossos Destaques da semana</h2>
        <section class="content">
            <div v-for='item in state.dataFromDB' :key='item.id'>
                <h3>{{item.tipo}}</h3>
                <img :src="item.src" :alt="`Pizza ${item.tipo}`">
                <p>R${{ item.preco }}</p>
                <ul>
                    <span>Ingredientes:</span>
                    <li v-for="(el, index) in item.ingredientes" :key='index'>
                        {{ el }}
                        <span v-if="index < item.ingredientes.length - 1">,</span>
                        <span v-else>.</span>
                    </li>
                </ul>
            </div>
        </section>
            <router-link to="/cardapio">Ver Mais</router-link>
    </section>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'DestaquesComponent',
  setup () {
    const state = reactive({
      dataFromDB: null
    })

    async function getFeature () {
      const req = await fetch('http://localhost:3000/destaques')
      const res = await req.json()
      state.dataFromDB = [...res]
    }

    onMounted(() => {
      getFeature()
    })
    return {
      state
    }
  }

}
</script>

<style lang="scss" scoped>
    *{
        box-sizing: border-box;
    }
    .destaque{
        margin-top: 70px;
        & h2{
            margin-bottom: 10px;
        }
        & .content{
            display: flex;
            flex-wrap: wrap;
            margin: auto;
            align-items: center;
            justify-content: space-around;
            gap: 20px;

            & div{
                width: 400px;
                height: 400px;
                padding: 20px;
                margin: auto;
                text-align: center;
                background-color: #F25430;
                border-radius: 8px;
                color: white;
                border: 1px solid #A64646;

                & img{
                    border-radius: 20px;
                    height: 200px;
                    border: .1px solid black;
                }
                & p{
                    text-transform: uppercase;
                    font-weight: bold;
                    color: green;
                    font-size: 2rem;
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
            }
        }
        & a{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30px auto;
            background-color: #F2CA52;
            border-radius: 8px;
            text-decoration: none;
            color: black;
            transition: .5s;
            width: 100px;
            height: 40px;
            &:hover{
                border:1px solid orange;
            }
        }
    }

    @media screen and (max-width: 439px) {
        .destaque{
            & .content{
                & div{
                    width: 330px;
                    & img{
                        width: 200px;
                    }
                }
            }
        }
    }
</style>

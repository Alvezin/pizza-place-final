<template>
    <form>
        <p>{{ state.msg}}</p>
        <div>
            <label for="nome">Nome de Usuário: </label>
            <input type="text" id="nome" placeholder="usuário:" v-model="state.name">
        </div>
        <div>
            <label for="senha">Senha: </label>
            <input type="password" id="senha" placeholder="senha:" v-model="state.password">
        </div>
        <button @click.prevent="enter()">Entrar</button>
        <small>Somente funcionarios autenticados tem acesso à seção</small>
    </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'LoginFuncionario',
  setup () {
    const state = reactive({
      name: null,
      password: null,
      msg: null
    })

    function statusMsg (msg) {
      state.msg = msg
      setTimeout(() => {
        state.msg = null
      }, 5000)
    }
    async function enter () {
      const req = await fetch('http://localhost:3000/funcionarios')
      const res = await req.json()

      res.forEach(el => {
        if (el.nome === state.name && el.senha === state.password) {
          statusMsg('Usuário autenticado')
          setTimeout(() => {
            window.location.href = '/main'
          }, 2000)
        }
        if (el.nome !== state.name && el.senha !== state.password) {
          statusMsg('Usuário ou Senha Incorretos')
        }
      })
    }

    return {
      state,
      enter
    }
  }
}
</script>

<style scoped lang='scss'>
    form{
        margin: 30px auto;
        height: 400px;
        width: 400px;
        background-color: rgb(204, 185, 185);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        border-radius: 8px;
        & div{
            display: flex;
            flex-direction: column;
            & input{
                padding: 7px 10px;
                border-radius: 8px;
                border: 1px solid rgb(204, 185, 185);
            }
        }
        & button{
            padding: 5px 8px;
            cursor: pointer;
            background-color: #A64646;
            border-radius: 8px;
            border: 2px solid #F2CA52;
            font-weight: bold;
            text-transform: uppercase;
            color: white;
        }
    }
    @media screen and (max-width: 421px) {
        form{
            width: 300px;
            height: 300px;
        }
    }
</style>

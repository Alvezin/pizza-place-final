<template>
    <main>
        <login-funcionario/>
    </main>
</template>

<script>
import LoginFuncionario from '../components/LoginFuncionario.vue'
export default {
  name: 'FuncionariosLoginView',
  components: {
    LoginFuncionario
  }
}
</script>

<style scoped lang="scss">
    main{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<template>
  <header-component/>
  <router-view/>
  <footer-component />
</template>
<script>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

</style>

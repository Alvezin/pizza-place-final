<template>
  <main>
    <banner-component/>
    <about-component/>
    <destaques-component/>
  </main>
</template>

<script>
import AboutComponent from '../components/AboutComponent.vue'
import BannerComponent from '../components/BannerComponent.vue'
import DestaquesComponent from '../components/DestaquesComponent.vue'
export default {
  name: 'HomeView',
  components: {
    AboutComponent,
    DestaquesComponent,
    BannerComponent
  }
}
</script>

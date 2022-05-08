<template>
    <section class="banner">
        <h2>Venha experimentar a <span class="enfase">melhor pizza</span> da região!</h2>
    </section>
</template>

<script>
export default {
  name: 'BannerComponent'
}
</script>

<style lang="scss" scoped>
    .banner{
        background-image: url('/public/img/pizza-banner.jpg');
        background-size: cover;
        background-position: bottom bottom;
        height: 100vh;
        display: flex;
        align-items: center;
        box-shadow: inset 1px 1px 1px black;
            & h2{
                color: white;
                font-size: 2rem;
                margin-left: 30px;
                text-transform: uppercase;
                font-style: italic;
                animation: cima 4s infinite;
                & .enfase{
                    color: orange;
                }
            }
    }
    @keyframes cima{
        50%{
            transform: translateY(-5px);
        }
    }
</style>

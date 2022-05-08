<template>
    <section class="about">
        <h2>Sobre</h2>
        <article>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis iusto molestiae sunt! Tempore, ad voluptatem.
                Recusandae temporibus quaerat exercitationem culpa impedit
                sint ut ipsam vitae accusamus aliquid! Ratione, amet adipisci.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis iusto molestiae sunt! Tempore, ad voluptatem.
                Recusandae temporibus quaerat exercitationem culpa impedit
                sint ut ipsam vitae accusamus aliquid! Ratione, amet adipisci.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis iusto molestiae sunt! Tempore, ad voluptatem.
                Recusandae temporibus quaerat exercitationem culpa impedit
                sint ut ipsam vitae accusamus aliquid! Ratione, amet adipisci.
            </p>
        </article>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .about{
        width: 80%;
        margin: auto;
        padding: 10px;
        & h2{
            text-align: start;
            margin-left: 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            border-left: 10px solid red;
            padding-left: 5px;
        }
        & p{
            text-align: justify;

        }

    }
</style>

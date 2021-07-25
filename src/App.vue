<template>
    <div class="corpo">
        <h1 class="centralizado">{{ titulo }}</h1>
        <ul class="lista-fotos">
            <li
                class="lista-fotos-item"
                v-for="(foto, index) of fotos"
                :key="index"
            >
                <meu-painel :titulo="foto.titulo">
                    <img
                        :src="foto.url"
                        :alt="foto.titulo"
                        class="imagem-responsiva"
                    />
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from "./components/shared/painel/Painel.vue";

export default {
    name: 'App',

    components: {
        'meu-painel': Painel,
    },

    data() {
        return {
            titulo: "Alura PIC",
            fotos: [],
        };
    },

    created() {
        this.$http
            .get("http://localhost:3000/v1/fotos")
            .then((response) => response.json())
            .then(
                (fotos) => (this.fotos = fotos),
                (error) => console.log(error)
            );
    },
};
</script>

<style>
.centralizado {
    text-align: center;
}

.corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
}

.lista-fotos {
    list-style: none;
}

.lista-fotos .lista-fotos-item {
    display: inline-block;
}

.imagem-responsiva {
    width: 100%;
}
</style>

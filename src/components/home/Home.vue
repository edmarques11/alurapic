<template>
    <div>
        <h1 class="centralizado">{{ titulo }}</h1>

        <input
            type="search"
            class="filtro"
            placeholder="Filtre por parte do título"
            @input="filtro = $event.target.value"
        />
        {{ filtro }}
        <ul class="lista-fotos">
            <li
                class="lista-fotos-item"
                v-for="(foto, index) of fotosComFiltro"
                :key="index"
            >
                <meu-painel :titulo="foto.titulo">
                    <imagem-responsiva
                        :url="foto.url"
                        :titulo="foto.titulo"
                    ></imagem-responsiva>

                    <meu-botao
                        :tipo="button"
                        rotulo="REMOVER"
                        :confirmacao="false"
                        estilo="perigo"
                        @botaoAtivado="remove(foto)"
                    />
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao.vue/Botao.vue";

export default {
    name: "Home",

    components: {
        "meu-painel": Painel,
        "imagem-responsiva": ImagemResponsiva,
        "meu-botao": Botao,
    },

    data() {
        return {
            titulo: "Alura PIC",
            fotos: [],
            filtro: "",
        };
    },

    computed: {
        fotosComFiltro() {
            if (this.filtro) {
                let exp = new RegExp(this.filtro.trim(), "i");
                return this.fotos.filter((foto) => exp.test(foto.titulo));
            } else {
                return this.fotos;
            }
        },
    },

    methods: {
        remove(foto) {
            alert("Remover a foto! " + foto.titulo);
        },
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

.lista-fotos {
    list-style: none;
}

.lista-fotos .lista-fotos-item {
    display: inline-block;
}

.filtro {
    display: block;
    width: 100%;
}
</style>

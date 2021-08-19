<template>
    <div>
        <h1 class="centralizado">{{ titulo }}</h1>

        <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

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
                        v-meu-transform:scale.animate="1.1"
                    ></imagem-responsiva>

                    <router-link
                        :to="{ name: 'altera', params: { id: foto._id } }"
                        ><meu-botao tipo="button" rotulo="ALTERAR"
                    /></router-link>

                    <meu-botao
                        tipo="button"
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
import Botao from "../shared/botao/Botao.vue";
import transform from "../../directives/Transform";
import FotoService from "../../domain/foto/FotoService.js";

export default {
    name: "Home",

    components: {
        "meu-painel": Painel,
        "imagem-responsiva": ImagemResponsiva,
        "meu-botao": Botao,
    },

    directives: {
        "meu-transform": transform,
    },

    data() {
        return {
            titulo: "Alura PIC",
            fotos: [],
            filtro: "",
            mensagem: "",
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
            this.service.apaga(foto._id).then(
                () => {
                    let indiceFoto = this.fotos.indexOf(foto);
                    this.fotos.splice(indiceFoto, 1);
                    this.mensagem = "Foto removida com sucesso";
                },
                (err) => {
                    this.mensagem = err.message;
                }
            );
        },
    },

    created() {
        this.service = new FotoService(this.$resource);

        this.service.lista().then(
            (fotos) => (this.fotos = fotos),
            (error) => {
                console.log(error);
                this.mensagem = error.message;
            }
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

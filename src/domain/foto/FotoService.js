export default class FotoService {
    constructor(resource) {
        this._resource = resource('fotos{/id}');
    }

    lista() {
        return this._resource.query().then((res) => res.json(), err => {
            console.error(err)
            throw new Error("Não foi possível obter as fotos!");
        });
    }

    cadastra(foto) {
        if (foto._id) {
            return this._resource.update({ id: foto._id }, foto)
        } else {
            return this._resource.save(foto);
        }
    }

    apaga(id) {
        return this._resource.delete({ id }).then(null, err => {
            console.log(err);
            throw new Error("Não foi possível remover a foto!");
        });
    }

    busca(id) {
        return this._resource.get({ id }).then((resp) => resp.json());
    }
}

import {Cat} from "../cat.js";

export class CatController {
    catRepository;

    constructor(catRepository) {
        this.catRepository = catRepository;
    }

    root() {
        return "Cats live here!";
    }

    getCats() {
        return this.catRepository.getCats();

    }
    // TODO: "add validation for existing cats ids
    createCat(req, res) {
        let cat = new Cat(req.body.name, req.body.age, req.body.fur, req.body.id);
        this.catRepository.addCat(cat);
        return cat;
    }

    deleteCat(req, res, catId) {
        try {
            catId = Number(catId);
            this.catRepository.deleteCat(catId);
        } catch (e) {
            res.statusCode = 404;
            return e.message;
        }
    }

    getCat(req, res, catId) {
        try {
            let cat = this.catRepository.getCat(catId);
            return cat;
        } catch(e) {
            res.statusCode = 404;
            return e.message;
        }
    }
}
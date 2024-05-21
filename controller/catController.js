import {Cat} from "../cat.js";

export class CatController {
    catRepository;

    constructor(catRepository) {
        this.catRepository = catRepository;
    }

    root() {
        return "\"Cats live here!\"";
    }

    getCats() {
        const cats = this.catRepository.getCats();
        return JSON.stringify(cats);
    }
    // TODO: "add validation for existing cats ids
    createCat(req, res) {
        if (req.body === undefined) {
            res.statusCode = 400;
            return "Incorrect data type";
        }
        if (typeof req.body.name != "string" || typeof req.body.age != "number" || typeof req.body.fur != "string" || typeof req.body.id != "number") {
            res.statusCode = 400;
            return "Incorrect object"
        }
        let cat = new Cat(req.body.name, req.body.age, req.body.fur, req.body.id);
        this.catRepository.addCat(cat);
        return "new cat added";
    }

    deleteCat(req, res, catId) {
        try {
            catId = Number(catId);
            this.catRepository.deleteCat(catId);
        } catch (e) {
            res.statusCode = 404;
            return e.toString();
        }
    }
}
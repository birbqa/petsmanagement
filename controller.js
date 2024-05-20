import {Cat} from "./cat.js";

export class Controller {
    catRepository;

    constructor(catRepository) {
        this.catRepository = catRepository;
    }

    root(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return "\"Cats live here!\"";
    }

    cats(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
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
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return "new cat added";
    }

    deleteCat(req, res, catId) {
        try {
            catId = Number(catId);
            this.catRepository.deleteCat(catId);
            res.statusCode = 200;
        } catch (e) {
            res.statusCode = 404;
            return e.toString();
        }
    }
}
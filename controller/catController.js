import {Cat} from "../cat.js";

export class CatController {
    catRepository;

    constructor(catRepository) {
        this.catRepository = catRepository;
    }

   async root() {
        return "Cats live here!";
    }

    async getCats() {
       return await this.catRepository.getCats();
    }
    // TODO: "add validation for existing cats ids
    async createCat(req, res) {
        let cat = new Cat(req.body.name, req.body.age, req.body.fur, req.body.id);
        await this.catRepository.addCat(cat);
        return cat;
    }

   async deleteCat(req, res, catId) {
        try {
            catId = Number(catId);
            await this.catRepository.deleteCat(catId);
        } catch (e) {
            res.statusCode = 404;
            return e.message;
        }
    }

   async getCat(req, res, catId) {
        try {
            return await this.catRepository.getCat(catId);
        } catch(e) {
            res.statusCode = 404;
            return await e.message;
        }
    }
}
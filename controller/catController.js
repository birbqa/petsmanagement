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
        let cat = new Cat(req.body.name, req.body.gender, req.body.colour, req.body.character, req.body.age);
        return await this.catRepository.addCat(cat);
    }

   async deleteCat(req, res, catId) {
        try {
            catId = Number(catId);
            await this.catRepository.deleteCat(catId);
            return `Cat with id ${catId} was deleted`
        } catch (e) {
            res.statusCode = e.name === "RepositoryNotFoundException" ? 400 : 500;
            return e.message;
        }
    }

   async getCat(req, res, catId) {
       // TODO: write logic for cat which doesn't exist -> REFACTOR GETCAT TO UTILIZE THE SAME APPROACH AS DELETE CAT
        try {
            if (await this.catRepository.getCat(catId) === undefined) {
                res.statusCode = 404;
                return `Cat with id ${catId} doesn't exist`
            } else {
                return await this.catRepository.getCat(catId);
            }
        } catch(e) {
            res.statusCode = 404;
            return await e.message;
        }
    }
}
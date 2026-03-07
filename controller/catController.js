import {Cat} from "../cat.js";

export class CatController {
    catRepository;

    constructor(catRepository) {
        this.catRepository = catRepository;
    }

   async root() {
        return "Cats live here!";
    }

    async getCats(req, res) {
        try {
            return await this.catRepository.getCats();
        } catch (e) {
            res.statusCode = 500;
            return e.message;
        }
    }

    async createCat(req, res) {
        try {
            let cat = new Cat(req.body.name, req.body.gender, req.body.colour, req.body.character, req.body.age);
            return await this.catRepository.addCat(cat);
        } catch (e) {
            res.statusCode = 500;
            return e.message
        }
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
        try {
            return await this.catRepository.getCat(catId);
        } catch(e) {
            res.statusCode = e.name === "RepositoryNotFoundException" ? 400 : 500;
            return await e.message;
        }
    }
}
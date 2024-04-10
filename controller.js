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

    // TODO: Implement saving cat entity
    createCat(req, res) {
        return "New cat added";
    }
}
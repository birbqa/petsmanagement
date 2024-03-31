export class Controller {

    root(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return "\"Cats live here!\"";
    }

    cats(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const cats = [
            {
                "name": "Benya",
                "age": 12,
                "colour": "white-red",
                "fur": "fluffy",
            },
            {
                "name": "Monya",
                "age": 6,
                "colour": "white-black",
                "fur": "fluffy",
            },
        ];
        return JSON.stringify(cats);
    }

    // TODO: Implement saving cat entity
    createCat(req, res) {
        return "New cat added";
    }
}
import {Cat} from "./cat.js";
export class CatRepository {
    catsObject = {
        1: new Cat("Tashenka", 5, "red", 1),
        2: new Cat("Benya", 12, "white", 2),
        3: new Cat("Monya", 6, "black-white", 3),
    };

    addCat(cat) {
        this.catsObject[cat.id] = cat;
    }

    getCats() {
        return Object.values(this.catsObject);
    }

    deleteCat(id) {
       if (!this.catsObject.hasOwnProperty(id)) {
           throw new Error(`Cat with id ${id} not found`)
       }
        delete this.catsObject[id];
    }
}
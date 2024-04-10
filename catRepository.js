import {Cat} from "./cat.js";
export class CatRepository {
    catArray = [
        new Cat("Tashenka", 5, "red"),
        new Cat("Benya", 12, "white"),
        new Cat("Monya", 6, "black-white"),
    ];

    addCat(cat) {
        this.catArray.push(cat)
    }

    addCats(cats) {
        this.catArray = this.catArray.concat(cats)
    }

    getCats() {
        return this.catArray;
    }
}
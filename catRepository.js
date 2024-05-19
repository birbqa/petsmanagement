import {Cat} from "./cat.js";
export class CatRepository {
    catArray = [
        new Cat("Tashenka", 5, "red", 1),
        new Cat("Benya", 12, "white",2 ),
        new Cat("Monya", 6, "black-white",3),
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
    deleteCat(id) {
        for(let cat of this.catArray) {
           if (cat.id === id) {
               let index = this.catArray.indexOf(cat);
               delete this.catArray[index];
               break;
           }
        }
        this.catArray = this.catArray.filter(element => element !== null);
    }
}
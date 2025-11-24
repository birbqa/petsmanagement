import {Cat} from "./cat.js";
import mysql from 'mysql2';

export class CatRepository {
    catsObject = {
        1: new Cat("Tashenka", 5, "red", 1),
        2: new Cat("Benya", 12, "white", 2),
        3: new Cat("Monya", 6, "black-white", 3),
    };
    connection;
    constructor(connection) {
        this.connection = connection;
    }

    async addCat(cat) {
        this.catsObject[cat.id] = cat;
    }

    async getCats() {
        return new Promise((resolve, reject) => {
            this.connection.execute('SELECT * FROM `cats`', [], (err, result) => {
                if (err) {
                    reject('Error executing query:', err);
                    return;
                }
                resolve(result);
                console.log(result);
            })
        }).then((catList) => {
            return catList;
        }).catch((err) => {
            console.log(err);
        })
    }

    
    async getCat(id) {
        return new Promise((resolve, reject) => {
            this.connection.execute('SELECT * FROM `cats` WHERE `id` = ? LIMIT 1', [id], (err, result) => {
                if (err) {
                    reject('Error executing query:', err);
                            return;
                }
                resolve(result);
                console.log(result);
            })
        }).then((catList) => {
            return catList[0];
        }).catch((err) => {
            console.log(err);
        })
    }

    async deleteCat(id) {
        this.isCatExist(id);
        delete this.catsObject[id];
    }
//todo: rewrite to return boolean
    isCatExist(id) {
        if (!this.catsObject.hasOwnProperty(id)) {
            throw new Error(`Cat with id ${id} not found`)
        }
    }

}
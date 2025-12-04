import {Cat} from "./cat.js";

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
        try {
            const [rows, fields] = await this.connection.execute(
                'SELECT * FROM `cats`',
                []
            );
            return rows.map(this.#buildCat);
        } catch (error) {
            console.error('Error executing query:', error);
         }
    }

    
    async getCat(id) {
        try {
            const [[row], fields] = await this.connection.execute(
                'SELECT * FROM `cats` WHERE `id` = ? LIMIT 1',
                [id]
            );
            console.log('Query results:', row);
            return this.#buildCat(row);
        } catch (error) {
            console.error('Error executing query:', error);
        }
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
    #buildCat(dbCatObject) {
        return new Cat(dbCatObject.id, dbCatObject.Name, dbCatObject.Gender, dbCatObject.Colour, dbCatObject.Character, dbCatObject.Age);
    }
}
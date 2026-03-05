import {Cat} from "./cat.js";
import {RepositoryNotFoundException} from "./exception/RepositoryNotFoundException.js";

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
        const catInfo = [cat.name, cat.gender, cat.colour, cat.character, cat.age];
        try {
            let result = await this.connection.execute(
                'INSERT INTO `cats` (`name`, `gender`, `colour`, `character`, `age`) VALUES (?, ?, ?, ?, ?)',
                catInfo
            );
            return await this.getCat(result[0].insertId);
        } catch (error) {
            console.error('Error executing query:', error);
        }
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
            throw error;
         }
    }

    
    async getCat(id) {
        // TODO: write logic for cat which doesn't exist
        try {
            const [[row], fields] = await this.connection.execute(
                'SELECT * FROM `cats` WHERE `id` = ? LIMIT 1',
                [id]
            );
            if (row === undefined) {
                throw new RepositoryNotFoundException(`Cat with id ${id} doesn't exist`)
            }
            return this.#buildCat(row);
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async deleteCat(id) {
        try {
            let [{affectedRows}] = await this.connection.execute(
                'DELETE  FROM `cats` WHERE `id` = ?',
                [id]
            );
            if (affectedRows === 0) {
                throw new RepositoryNotFoundException(`Cat with id ${id} doesn't exist`);
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
//todo: rewrite to return boolean
    isCatExist(id) {
        if (!this.catsObject.hasOwnProperty(id)) {
            throw new Error(`Cat with id ${id} not found`)
        }
    }
    #buildCat(dbCatObject) {
        return new Cat(dbCatObject.name, dbCatObject.gender, dbCatObject.colour, dbCatObject.character, dbCatObject.age, dbCatObject.id);
    }
}
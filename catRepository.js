import {Cat} from "./cat.js";
import {RepositoryNotFoundException} from "./exception/RepositoryNotFoundException.js";

export class CatRepository {
    connection;

    constructor(connection) {
        this.connection = connection;
    }

    async addCat(cat) {
        const catInfo = [cat.name, cat.gender, cat.colour, cat.character, cat.age];
        try {
            let [{insertId}] = await this.connection.execute(
                'INSERT INTO `cats` (`name`, `gender`, `colour`, `character`, `age`) VALUES (?, ?, ?, ?, ?)',
                catInfo
            );
            return await this.getCat(insertId);
        } catch (error) {
            console.error('Error executing query:', error);
            throw(error);
        }
    }

    async getCats() {
        try {
            const [rows] = await this.connection.execute(
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
        try {
            const [[row]] = await this.connection.execute(
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

    #buildCat(dbCatObject) {
        return new Cat(dbCatObject.name, dbCatObject.gender, dbCatObject.colour, dbCatObject.character, dbCatObject.age, dbCatObject.id);
    }
}
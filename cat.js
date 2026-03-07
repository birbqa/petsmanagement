export class Cat {
    name;
    age;
    gender;
    colour;
    character;
    id;

    constructor(name, gender, colour, character, age, id = null) {
        this.name = name;
        this.gender = gender;
        this.colour = colour;
        this.character = character;
        this.age = age;
        this.id = id;
    }
}



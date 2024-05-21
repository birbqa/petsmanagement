export class DogController {
    getDogs() {
        let dogs = [
            {name: "Jack", age: 5, fur: "biege"},
            {name: "Roma", age: 12, fur: "blonde-black"},
            {name: "Chernysh", age:9, fur: "black-white"},
            {name: "Taison", age: "who knows", fur :"black-white"}
        ];
        return JSON.stringify(dogs);
    }

}
class Person{
    constructor(name){
        this.name = name;
    }
    greet(){
        return `Hello, my name is ${this.name}`
    }
}
const person = new Person("dung");
console.log(person.greet());// output: Hello, my name is dung

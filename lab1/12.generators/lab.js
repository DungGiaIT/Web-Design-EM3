function* generateNumbers(){
    yield 1;
    yield 2;
    yield 3;
}

const gen = generateNumbers();

console.log(gen.next().value);// output: 1
console.log(gen.next().value);// output: 2
console.log(gen.next().value);// output: 3

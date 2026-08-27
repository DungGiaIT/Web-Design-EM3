//rest parameter
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4, 5)); //output: 15


//spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];// output: [1, 2, 3, 4, 5, 6]

console.log([...arr1, ...arr2]); //output: [1, 2, 3, 1, 2, 3, 4, 5, 6]
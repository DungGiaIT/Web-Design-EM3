function calculateSum(a, b, callBack){
    const sum = a+b;
    callBack(sum);
}

function displaySum(result){
    console.log('Tong cua hai so la: ', result);
}

calculateSum(1,2,displaySum);
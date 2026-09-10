function check(a, callBack){
    if (a%2==0)
        return callBack(a, "chan");

    return callBack(a, "le")
}

function displayInfo(a, result){
    console.log(`the number ${a} is ${result}`)
}
check(4, displayInfo);

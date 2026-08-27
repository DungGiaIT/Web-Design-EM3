const fetchData = ()=>{
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            reject("Data ejected");
        },2000);
    });
};

fetchData().catch(console.error);
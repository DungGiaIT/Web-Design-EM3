async function fetchUserData(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        if(!response.ok){
            throw new Error('Network respose was not ok');
        }
        const userData = await  response.json();
        // console.log(userData);

        const{id, name, email, address:{street,city}} = userData;

        console.log(`ID: ${id}`)
        console.log(`Name: ${name}`)
        // console.log(`userName: ${username}`)
        console.log(`Email: ${email}`)
        console.log(`Street: ${street}`)
        console.log(`City: ${city}`)

    }catch (error){
        console.log('Error fetching user Data', error);
    }
}


fetchUserData();
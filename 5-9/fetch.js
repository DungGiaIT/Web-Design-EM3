console.log('Start');
fetch('https://6a9b86970ad174e139e8b236.mockapi.io/City')
    .then(response => response.json())
    .then(data => {
        console.log('Inside fetch', data);
    });

console.log('End');

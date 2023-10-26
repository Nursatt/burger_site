async function fetchStoreData() {
    //const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                //Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/store";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.items);
            const items = data.items
            for (let item in items) {
                const data_for_print = `
                    <div class="best" data-id="${items[item]._id}">
                        <img src="${items[item].img}" class="basket_img" width="300px" height="300px" alt="There is no picture">
                        <p>${items[item].name}</p>
                        <center> <img src="../images/stars5.png" class="stars" alt="There is no picture"></center>
                        <h5>${items[item].price}</h5>
                        <button type="button" id="buy" data-backet>Add to cart</button>
                    </div>`;
                document.querySelector('.all_good').innerHTML += data_for_print;
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchStoreData()
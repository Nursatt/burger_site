let full_price = 0
let full_count = 0

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};
const minusFullPrice = (currentPrice) => {
    if (full_price > 0) {
        return full_price -= currentPrice;
    } else {
        return full_price = 0;
    }
};

const plusFullPrice = (currentPrice) => {
    return full_price += currentPrice;
};

async function fetchGetBasket() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/basket";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            const items = data.order_items
            console.log(items)
            for (let i = 0; i < items.length; i++) {
                const newRequestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    },
                };
                const id = items[i].item

                const apiUrl = `http://localhost:5000/api/store/${id}`;

                const item_response = await fetch(apiUrl, newRequestOptions);
                const item_data = await item_response.json();

                if (item_response.ok) {
                    const item = item_data.get_item_by_id
                    console.log(item)
                    const data_for_print = `
                    <div class="product_in_basket" data-id="${item._id}">
                       <h6>Your order</h6>
                       <div>
                          <img src="${item.img}" width="100px" alt="There is no picture">
                          <p>${item.name}
                             <br>
                             <span id="price">${item.price}</span>
                          </p>
                          <br>
                          <div class="items_counter">
                             <div class="items_control" id="minus" data-action="minus">-</div>
                             <div class="items_control" id="item-counter" data-counter>1</div>
                             <div class="items_control" id="plus" data-action="plus">+</div>
                          </div>
                       </div>
                       <hr id="line_1">
                    </div>`;
                    document.getElementById('delivery').insertAdjacentHTML('afterbegin', data_for_print)
                    full_price += parseInt(priceWithoutSpaces(item.price)) * items[i].count
                } else {
                    console.error(data.message);
                }
                full_count = items[i].count
                document.querySelector('#item-counter').textContent = full_count
            }
            document.querySelector('#lastPrice').textContent = `${full_price} тг`
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchGetBasket()

async function fetchBasketDelete(id) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/basket/${id}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            window.location.reload()
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function fetchBasketUpdate(id) {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        };

        const apiUrl = `http://localhost:5000/api/basket/${id}`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            window.location.reload()
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const delete_products = (products_parent) => {
    let parent = products_parent.closest('.product_in_basket')
    let current_price = parseInt(priceWithoutSpaces(parent.querySelector('#price').textContent));
    const id_of_item = parent.getAttribute('data-id')
    console.log(id_of_item)
    //minusFullPrice(current_price);
    fetchBasketDelete(id_of_item)
};

const update_products = (products_parent) => {
    let parent = products_parent.closest('.product_in_basket')
    let current_price = parseInt(priceWithoutSpaces(parent.querySelector('#price').textContent));
    const id_of_item = parent.getAttribute('data-id')
    console.log(id_of_item)
    //plusFullPrice(current_price);
    fetchBasketUpdate(id_of_item)
};

document.addEventListener('click', async (e) => {
    if (e.target.closest('#minus')) {
        console.log(e);
        await delete_products(e.target.closest('#minus'));
    }
    if (e.target.closest('#plus')) {
        console.log(e);
        await update_products(e.target.closest('#plus'));
    }
});
let id = ""

function get_item_data(data) {
    let parent = data.closest('.best');
    id = parent.getAttribute('data-id')
    console.log(id);
}

async function fetchAddOrder() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ id })
        };

        const apiUrl = "http://localhost:5000/api/store";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.order);
            window.location.reload()
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('#buy')) {
        console.log(e);
        get_item_data(e.target.closest('#buy'));
        fetchAddOrder()
    }
});
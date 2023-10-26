async function fetchValidateOrder() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/basket/";

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

document.addEventListener('click', async (e) => {
    if (e.target.closest('.validate-button')) {
        console.log(e);
        fetchValidateOrder()
    }
});
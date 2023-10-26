const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const email = document.getElementById("mail").value;
        const password = document.getElementById("pass").value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        };

        const apiUrl = "http://localhost:5000/api/auth/login";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        //document.cookie = token=${data.token}; expires=Thu, 17 May 2024 00:00:00 UTC; path=/;
        localStorage.setItem('token', data.token);

        if (response.ok) {
            console.log(data.message);
            console.log(data.token);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
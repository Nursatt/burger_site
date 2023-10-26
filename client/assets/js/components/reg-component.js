const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("mail").value;
        const password = document.getElementById("pass").value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        };

        const apiUrl = "http://localhost:5000/api/auth/registration";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.user);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
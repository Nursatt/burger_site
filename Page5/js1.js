const userCardTemplate = document.getElementById("card-template");
let details = [];
const getUsers = async () => {
    const res = await fetch("./data.json");
    const users = await res.json();
    details = users.map((user, i) => {
        const card = userCardTemplate.content.cloneNode(true);
        card.getElementById("name").innerText = user.name;
        card.getElementById("email").innerText = user.email;
        card.getElementById("username").innerText = user.username;
        document.getElementById("cards-wrapper").append(card);
        return {
            name: user.name.toLowerCase(),
            email: user.email.toLowerCase(),
            ele: document.querySelectorAll(".card")[i]
        };
    });
};

getUsers();

const input = document.getElementById("search");

input.addEventListener("input", (e) => {
    let query = e.target.value.toLowerCase();
    details.forEach((user) => {
        const isVisible = user.name.includes(query) || user.email.includes(query);
        user.ele.classList.toggle("hide", !isVisible);
    });
});

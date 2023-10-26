const app = require("./assets/js/app.js")

const port = 5500

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`listening port ${port}`);
})
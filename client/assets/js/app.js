const express = require("express")
const morgan = require("morgan")
const createPath = require("./static_functions/create-path.js")
const authRoutes = require("./routes/auth-routes.js")
const orderRoutes = require("./routes/order-routes.js")
const aboutRoutes = require("./routes/about-routes.js")

const app = express();

app.set('view engine', 'ejs');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('assets/css'));
app.use(express.static('assets/rsc'));
app.use(express.static('assets/js'));

app.get('/', (req, res) => {
    const title = 'Home';
    const token = req.headers.token
    res.render(createPath('../../index'), { title });
});

app.get('/index', (req, res) => {
    const title = 'Home';
    res.render(createPath('../../index'), { title });
});


// --------------------------------------------


app.get('/index', (req, res) => {
    const submit = 'submit';
    res.render(createPath('../../index'), { submit });
});

// -----------------------------------------------------
app.use(authRoutes);
app.use(orderRoutes);
app.use(aboutRoutes);


app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title });
});

module.exports = app
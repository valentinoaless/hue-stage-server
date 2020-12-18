const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const communityRoute = require('./routes/community');
const setRoute = require('./routes/set');
dotenv.config();

app.use(cors());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.then((res) => {
    console.log(`Connected to MongoDB. Database: ${res.connections[0].name}`);
}).catch((err) => {
    console.log('Error connecting to MongoDB');
})

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/user/set', setRoute);
app.use('/api', communityRoute);


app.listen(process.env.PORT || 5000);
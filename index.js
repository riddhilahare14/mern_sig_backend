const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

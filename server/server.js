import express from 'express';
import 'dotenv/config'
import Authrouter from './src/routes/authRouter.js';
import DBconnection from './src/database/db.js';
import cors from 'cors';
import Noterouter from './src/routes/note.route.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin : process.env.corsOrigin,
    Credential : true
}));

app.get('/', (req,res) => {
    res.send('Hello World');
});
app.use('/auth', Authrouter)
app.use('/note', Noterouter)

DBconnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
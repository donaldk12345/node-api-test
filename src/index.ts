require('dotenv').config();
import express , {Request, Response} from 'express';
const cors = require('cors');
import { routes } from './route';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
createConnection().then(connection =>{

const app  = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: '*',
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,

}))



routes(app);

app.listen(3000, () => {
    console.log('liste des port ');
});

});


import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from "url";
import indexRoute from './routes/index.routes.js';
import './database.js';


const __dirname = path.join(fileURLToPath(import.meta.url));
//Inicialization
const app = express();

//setting
app.set('port', process.env.PORT || 3000);

//Middlewars
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
  

//routes
app.use(indexRoute);

//server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
    
});
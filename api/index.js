import express from 'express';
import routes from './routes.js';
const app = express();
console.log('starting  up');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use('/',routes)



export default app
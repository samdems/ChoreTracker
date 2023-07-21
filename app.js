import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './controler/Users.js'
import choreRoute from './controler/chores.js'
import logRoute from './controler/logs.js'
import indexRoute from './controler/index.js'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use('/',indexRoute)
app.use('/users',userRoute)
app.use('/chores',choreRoute)
app.use('/logs',logRoute)


app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
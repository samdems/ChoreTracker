import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './controler/Users.js'
import choreRoute from './controler/chores.js'
import logRoute from './controler/logs.js'
import indexRoute from './controler/index.js'

const app = express();
console.log('starting  up');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');


// app.use('/',indexRoute)
// app.use('/users',userRoute)
// app.use('/chores',choreRoute)
// app.use('/logs',logRoute)
app.get('/',(req,res)=>{
    res.send('home')
  })

app.use(express.static('public'));

export default app
import express from 'express';
import indexRoute from '../controler/index';
import userRoute from '../controler/user';
import choreRoute from '../controler/chore';
import logRoute from '../controler/log';

const app = express();
console.log('starting  up');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use('/',indexRoute)
app.use('/users',userRoute)
app.use('/chores',choreRoute)
app.use('/logs',logRoute)
app.get('/api',(req,res)=>{
    res.send('api')
  })
  app.get('/',(req,res)=>{
    res.send('home')
  })
// app.use(express.static('public'));

export default app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use('/',indexRoute)
app.use('/users',userRoute)
app.use('/chores',choreRoute)
app.use('/logs',logRoute)


app.use(express.static('public'));

export default app
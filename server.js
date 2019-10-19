const express =  require('express');
const connectDB = require('./config/db')
// const path = require('path')
const cors = require('cors')

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended:false}))

// Fix CORS
app.use(cors());

// Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profiles'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/yelp',require('./routes/api/yelp'))

// Serve static assets in production
// if(process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'))

//   app.get('*',(req,res) => {
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//   })
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
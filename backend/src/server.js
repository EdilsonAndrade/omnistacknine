const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-iaon4.mongodb.net/omnistack09?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});


//req.query = get the params from query
//req.params = acessar route params para (update, delete)
//req.body = acessar o corpo da requisição (para criação e edição de registros)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes);

// app.get('/users',(req,res)=>{
//     return res.json({
//         idade: req.query.idade
//     });
// });
// app.put('/users/:id', (req,res)=>{
//     return res.json({
//         id: req.params.id
//     })
// })

// app.post('/users', (req,res)=>{
//     return res.json(req.body)
// })

app.listen(3333);
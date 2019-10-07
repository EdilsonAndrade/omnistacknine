const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb://127.0.0.1:27017/omnistrack?compressors=zlib&gssapiServiceName=mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};
io.on('connection', socket => {
    
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id; // desta maneira ele armazena o valor do user_id como atributo e relaciona com o id de conexao.
    console.log('socket conectado user ', connectedUsers[user_id]);
});

app.use((req, res, next) => {
    req.io = io; // passa oi (socket) disponivel para as rotas
    req.connectedUsers = connectedUsers //disponibiliza em todas as rotas todos os usuários conectados
    console.log('connected users = ', req.connectedUsers)
    return next();
});

//req.query = get the params from query
//req.params = acessar route params para (update, delete)
//req.body = acessar o corpo da requisição (para criação e edição de registros)

app.use(cors());

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
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

//app.listen(3333); troca para o de baixo para poder tb ouvir socket io
server.listen(3333);
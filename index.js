const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
const cors = require('cors')

const {
     getAllTodos,
     getOneTodo,
     postOneTodo,
     deleteTodo,
     editTodo
} = require('./APIs/todos');

const {
     loginUser,
     signUpUser,
     uploadProfilePhoto,
     getUserDetail,
     updateUserDetails
} = require('./APIs/users');

app.use(cors({ origin: true }));

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
app.post('/todo',auth, postOneTodo);
app.delete('/todo/:todoId',auth, deleteTodo);
app.put('/todo/:todoId',auth, editTodo);

exports.api = functions.https.onRequest(app)
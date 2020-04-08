const express = require('express');
const port = 4545;
const app = express();
const firebase = require('firebase');
const FBconfig=require("./FBconfig.js");
const controller=require("./controller/products-controler");
const bodyParsed=require("body-parser");
const path=require('path');

//set json
app.use(bodyParsed.urlencoded({extended:false}));
app.use(bodyParsed.json());

//setup views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//iniciando firebase
firebase.initializeApp(FBconfig);


// chamando as rotas do servidor
app.get("/",controller.getHome);

app.get("/add",controller.getAdd);

app.post("/add",controller.postAdd);


//tratativa de erro

// 404
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

//servindo o servidor
app.listen(port, err =>{
    console.log(`Server is listening on ${port}`);
});
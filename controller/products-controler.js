const firebase=require("firebase");

exports.getAdd=('/add', (req, res) => {
    let  objData = new Object();
    let  db = firebase.database();
    let  ref = db.ref("Products");
    let  KeysID=[];
    let  Products=[];

    ref.on("value", function(snapshot) {
        
        objData=snapshot.val();

        for (const keys of Object.keys(objData)){

            let {
                quantidade:quantidadeReal,
                name:nameReal,
                preco:precoReal
            } = objData[keys];    

            KeysID.push(keys); 
            Products.push(objData[keys]);
        }
        res.render("index.ejs",{
            title:'Pinheiro',
            produtos:Products
        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });  
});

exports.postAdd=('/add', (req, res) =>{

    var  db = firebase.database(); //db==database

    const newprodutos = {
        quantidade: req.body.quantidade,
        name: req.body.nome,
        preco:req.body.preco
    };

    db.ref('Products').push(newprodutos);
    res.redirect('/add');
    
});

exports.getHome=("/",(req,res)=>{
    res.render("index.ejs",{
        title:'Pinheiro',
        produtos:Products
    });
});
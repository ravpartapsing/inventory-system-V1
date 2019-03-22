indexController=require('../controlers/index');
labController=require('../controlers/labController');
labMapController=require('../controlers/labItemController');
usersController=require('../controlers/users');
var cors = require('cors')
var multer = require('multer')
const db = require('../_helper/db');
const User = db.Users;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

var upload = multer({ storage: storage })

module.exports = (app)=>{

var whitelist = ['http://localhost:4200', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 
 app.use(cors(corsOptions));



  app.use((req,res,next)=>{
   // res.locals.session=Object.assign({},req.session);
   if(req.method.toLowerCase()=='options'){
     res.sendStatus(200)
   }else{
     next();
   }
    
  })




 app.get('/create-admin',usersController.createAdmin);


/***************************************************
*********** ITems API Routes ***********************
****************************************************/

  app.post('/addItem',indexController.addItem);
  app.post('/updateItem',indexController.UpdateItem);
  app.post('/deleteItem',indexController.deleteItem);
  app.post('/getItemByCode',indexController.getItemByCode);
  app.post('/getAllItems',indexController.getItems);




/***************************************************
*********** Labs API Routes ***********************
****************************************************/

  app.post('/addlab',labController.addLab);
  app.post('/updatelab',labController.UpdateLab);
  app.post('/deletelab',labController.deleteLab);
  app.post('/getlabByCode',labController.getLabByCode);
  app.post('/getAllLabs',labController.getLabs);
  



  app.post('/addlabmap',labMapController.addLab);
  app.post('/updatelabmap',labMapController.UpdateLab);
  app.post('/deletelabmap',labMapController.deleteLab);
  app.post('/getlabmapByCode',labMapController.getLabByCode);
  app.post('/getAllLabmaps',labMapController.getLabs);





/***********************************
*********Login Sign Up API *********
************************************/
app.post('/signup',usersController.signup)
app.post('/login',usersController.signin)


app.get('/listUser',usersController.listUsers)


app.post('/upload/photo',upload.any(),indexController.uploadphoto); 
//app.get("/",(req,res,next)=>{res.redirect("/dashboard")})
/*app.get('/dashboard',isLogedin,indexController.dashboardapps);
app.get('/app/getApps',isLogedin,indexController.getAllApp); 
app.post('/upload/photo',upload.any(),indexController.uploadphoto); 
app.post('/signup',usersController.signup)
app.post('/login',usersController.signin)*/
}


function isLogedin(req,res,next){
  if(req.session.user && req.session.user._id && req.session.user._id!=""){
    next()
  }
  else{
    res.redirect('/login')
  }
}
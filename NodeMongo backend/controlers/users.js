//const config = require('config.json');
var responseFun=require('./responseController');
const bcrypt = require('bcryptjs');
const db = require('../_helper/db');
const User = db.Users;


module.exports={

    createAdmin: (req,res,next)=>{

     let params={       "email": "admin@gmail.com",
                        "password":"12345678" ,
                        "firstName": "Harsimran",
                        "lastName": "Kaur",
                        "photo":"asdfasdf.jpg"
            }
     create(params).then((data)=>{
           // getAll().then(data=>{res.send({data});})
           authenticate(params).then(data=>{
            console.log(data);
            req.session.user=data;
            console.log(req.session);
            //res.redirect("/dashboard")
            res.send(responseFun(true,req.session.user))
           });
           
        }).catch((err)=>{
          res.send(responseFun(false,null,null,err))
        })
    },
    signup:(req,res,next)=>{

        /**********************************/
        /****Params for API ***************/
        /*
            {           "email": "simran@g.com",
                        "password":"asdfasdfsdf" ,
                        "firstName": "Harsimran",
                        "lastName": "Kaur",
                        "photo":"asdfasdf.jpg"
            }
        */
        /**********************************/
        console.log(req.body,req.query);
        let params=req.body      
        create(params).then((data)=>{
           // getAll().then(data=>{res.send({data});})
           authenticate(params).then(data=>{
            console.log(data);
            req.session.user=data;
            console.log(req.session);
            //res.redirect("/dashboard")
            res.send(responseFun(true,req.session.user))
           });
           
        }).catch((err)=>{
          res.send(responseFun(false,null,null,err))
        })
    },
    signin:(req,res,next)=>{
        let body=req.body;
        if(body.email!=="" && body.password!==""){
            let params={email:body.email,password:body.password}
            console.log(params)
           authenticate(params).then(data=>{
               console.log(data);
               if(data){
                    req.session.user=data;
                    console.log(req.session);
                    res.send(responseFun(true,req.session.user))
               }else{
                    console.log('asdfas')
                    req.session.errMsg="Wrong email or password ";
                     res.send(responseFun(false,null,null,req.session.errMsg))
               }
            
           });
        }else{
            req.session.errMsg="Email and Password Required";
            res.send(responseFun(false,null,null,req.session.errMsg))
        }      
    },
    listUsers:(req,res,next)=>{
        getAll().then((users)=>{
            res.send(responseFun(true,users))
        });
    }
}
async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        return {
            ...userWithoutHash,
         //   token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    console.log(id,"//")
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
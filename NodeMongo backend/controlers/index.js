const db = require('../_helper/db');
const Items = db.Items;
var ItemMsg=require('./MsgController').itemMsg;
var responseFun=require('./responseController');

module.exports={
    
    uploadphoto:(req,res,next)=>{
        console.log(",,,,,,,,,,,")
        console.log(req.files,"////////////////");
        res.send({filename:req.files[0].filename})
    },
    addItem:(req,res,next)=>{
        var post=req.body;
        /*{
            name: "abcXyZ",
            price: "12.50",
            quantity: "50",
            company: "Dell",
            photo:"hphhphp"
          }
        */
        if(post.name!==undefined){
            post.code="ITM-"+makeidCapsABC(4)+makeidInt(5);

            Items.findOne({ name: post.name }).then((data)=> {
                if(data && data.name ){
                   
                   /* console.log("updating the ")
                    Items.updateOne({_id:data._id},post).then((data)=>{ res.send({status:true})}).catch((err)=>{console.log(err)});
                    Object.assign(user, userParam);*/

                    res.send(responseFun(false,null,null,"ITMEXIST",ItemMsg.errMsg.ITMEXIST))

                }else{
                    Items.create(post).then((data)=>{
                        /*******************************************************
                         ********* Item Saved REsponse *************************
                         *******************************************************
                            Response must be like this is item saved
                            {
                                "status": true,
                                "data": {
                                    "_id": "5c8ba38220c3f8267ce601fb",
                                    "name": "abcXyZ",
                                    "price": "12.50",
                                    "quantity": "50",
                                    "company": "Dell",
                                    "photo": "hphhphp",
                                    "code": "ITM-GMLD77880",
                                    "createdDate": "2019-03-15T13:07:14.242Z",
                                    "__v": 0,
                                    "id": "5c8ba38220c3f8267ce601fb"
                                },
                                "successMsg": "Item Added Successfully",
                                "err": null,
                                "errMsg": null
                            }
                        ************************************************************
                        ************************************************************/
                        res.send(responseFun(true,data,ItemMsg.successMsg.ITMADDSUCCESS))
                    }).catch((err)=>{
                        res.send(responseFun(false,null,null,err,ItemMsg.errMsg.ITMNOTSAVE))
                    });
                }
            })
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }  
    },
    UpdateItem:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            name: "abcXyZ",
            price: "12.50",
            code:"ITM-ASDF12345", //requried field  
            quantity: "50",
            company: "Dell",
            photo:"hphhphp"
          }
        */
        /***********************************/


        if(post.code!==undefined){

            //post.code="ITM-"+makeidCapsABC(4)+makeidInt(5);
            Items.findOne({ code: post.code }).then((data)=> {
                if(data && data.code ){
                   
                    console.log("updating the ")
                    Items.updateOne({_id:data._id},post).then((data)=>{
                        res.send(responseFun(true,data,ItemMsg.successMsg.ITMUPDATESUCCESS))
                    }).catch((err)=>{
                        res.send(responseFun(false,null,null,err,ItemMsg.errMsg.ITMNOTSAVE))
                    });
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTFOUND",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }   
    },
    deleteItem:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            code:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        if(post.code!==undefined){
            //post.code="ITM-"+makeidCapsABC(4)+makeidInt(5);
            Items.findOne({ code: post.code }).then((data)=> {
                if(data && data.code ){
                    data.remove().then((data)=>{
                        res.send(responseFun(true,data,ItemMsg.successMsg.ITMDELETEDSUCCESS))
                    });
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTDELETED",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }
        
    },
    getItemByCode:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            code:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        if(post.code!==undefined){
            Items.findOne({ code: post.code }).then((data)=> {
                if(data && data.code ){
                    res.send(responseFun(true,data))
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTDELETED",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }
    },
    getItems:(req,res,next)=>{
        var post=req.body;
        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            code:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        
            Items.find().then((data)=> {
                if(data){
                    res.send(responseFun(true,data))
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTDELETED",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        
    }


}


async function create(appParam) {
    // validate
    /* if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    } */

    const appObj = new appModel(appParam);

    // hash password
    /* if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    } */

    // save user
    await appObj.save();
}

async function getAll() {
   // const appObj = new appModel();
    return await appModel.find().then();
}


function makeidCapsABC(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



function makeidNCapsABC(length) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function makeidInt(length) {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
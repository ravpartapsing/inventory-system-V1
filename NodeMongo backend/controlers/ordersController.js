const db = require('../_helper/db');
const Orders = db.Orders;
var ItemMsg=require('./MsgController').itemMsg;
var responseFun=require('./responseController');

module.exports={
    
  
    addOrder:(req,res,next)=>{
        var post=req.body;
        /*{
           "itmes": ["asdfa","asdfasd","asdfasd"]
           "lab": "123412341234",
           "logo": "logoname.jpg",
          }
        */
        if(post.itmes!==undefined){
                    Orders.create(post).then((data)=>{
                        res.send(responseFun(true,data,ItemMsg.successMsg.ITMADDSUCCESS))
                    }).catch((err)=>{
                        res.send(responseFun(false,null,null,err,ItemMsg.errMsg.ITMNOTSAVE))
                    });
            
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }  
    },
    UpdateOrder:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{"id":"id"
           "Ordername": "Name",
           "instructor": "Instructor Name",
           "logo": "logoname.jpg",
          }
        */
        /***********************************/
        if(post._id!==undefined){

            //post.code="ITM-"+makeidCapsABC(4)+makeidInt(5);
            Orders.findOne({ _id: post._id }).then((data)=> {
                if(data && data._id ){
                   
                    console.log("updating the ")
                    Orders.updateOne({_id:data._id},post).then((data)=>{
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
    deleteOrder:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            _id:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        if(post._id!==undefined){
            Orders.findOne({ _id: post._id }).then((data)=> {
                if(data ){
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
    getOrderByCode:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            _id:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        if(post._id!==undefined){
            Orders.findOne({ _id: post._id }).then((data)=> {
                if(data  ){
                    res.send(responseFun(true,data))
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTDELETED",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }
    },
    getOrders:(req,res,next)=>{
        var post=req.body;
        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            code:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        
            Orders.find().then((data)=> {
                if(data){
                    res.send(responseFun(true,data))
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTDELETED",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        
    }


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
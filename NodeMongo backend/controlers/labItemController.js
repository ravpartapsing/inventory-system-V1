const db = require('../_helper/db');
const Labs = db.LabItems;
var ItemMsg=require('./MsgController').itemMsg;
var responseFun=require('./responseController');
/*var Types = mongoose.Types,
    ObjectId = Types.ObjectId;*/
module.exports={
    
  
    addLab:(req,res,next)=>{
        var post=req.body;
        /*{
           "labname": "Name",
           "instructor": "Instructor Name",
           "logo": "logoname.jpg",
          }
        */
        if(post.itmes!==undefined){
                      
                    Labs.create(post).then((data)=>{
                        res.send(responseFun(true,data,ItemMsg.successMsg.ITMADDSUCCESS))
                    }).catch((err)=>{
                        res.send(responseFun(false,null,null,err,ItemMsg.errMsg.ITMNOTSAVE))
                    });
           
            
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }  
    },
    UpdateLab:(req,res,next)=>{
        var post=req.body;

        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{"id":"id"
           "labname": "Name",
           "instructor": "Instructor Name",
           "logo": "logoname.jpg",
          }
        */
        /***********************************/
        if(post._id!==undefined){

            //post.code="ITM-"+makeidCapsABC(4)+makeidInt(5);
            Labs.findOne({ _id: post._id }).then((data)=> {
                if(data && data._id ){
                   
                    console.log("updating the ")
                    Labs.updateOne({_id:data._id},post).then((data)=>{
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
    deleteLab:(req,res,next)=>{
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
            Labs.findOne({ _id: post._id }).then((data)=> {
                if(data && data._id ){
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
    getLabByCode:(req,res,next)=>{
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
            Labs.find({ lab: post._id }).then((data)=> {
                if(data ){
                    res.send(responseFun(true,data))
                }else{
                    res.send(responseFun(false,null,null,"ITMNOTDELETED",ItemMsg.errMsg.ITMNOTFOUND))
                }
            })
        }else{
              res.send(responseFun(false,null,null,"WRONGPARAMS","Wrong Params or may be not send or may be some value is missing"))   
        }
    },

    getLabs:(req,res,next)=>{
        var post=req.body;
        /***********************************
        *********** Sample API Params*******
        *************************************/
        /*{
            code:"ITM-ASDF12345", //requried field  
          }
        */
        /***********************************/
        
            Labs.find().then((data)=> {
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
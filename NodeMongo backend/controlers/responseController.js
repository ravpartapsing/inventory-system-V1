/***********************************************
response function: to prepare response in same 
format for each request
*************************************************/

module.exports= (status=false,data=null,successMsg=null,err=null,errMsg=null)=>{

    return {status,data,successMsg,err,errMsg};

}


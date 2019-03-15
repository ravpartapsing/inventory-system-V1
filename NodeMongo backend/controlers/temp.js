index:(req,res,next)=>{
       /* if(req.query.id){
            console.log(req.query.id)
            req.session.appId=req.query.id;
            appModel.findById(req.query.id).then(data=>{
               // console.log(data)
            res.render("index",{appHtml:data.appHtmlString,appName:data.appName})
            });
        }else{
            if(req.query.appName!==undefined){
                res.render("index",{appName:req.query.appName});
            }else if(req.session.appId){
                appModel.findById(req.session.appId).then(data=>{
                    // console.log(data)
                 res.render("index",{appHtml:data.appHtmlString,appName:data.appName})
                 });
            }else{
                res.redirect("/");
            }
            
        }*/
    },
    dashboardapps:(req,res,next)=>{res.render("dashboardapp")},
    saveApp:(req,res,next)=>{
        var post=req.body;

        appModel.findOne({ appName: post.appName }).then((data)=> {
           console.log(data,"asdf asd fsdf");
            if(data && data.appName ){
                console.log("updating the ")
                appModel.updateOne({_id:data._id},post).then((data)=>{ res.send({status:true})}).catch((err)=>{console.log(err)});
                Object.assign(user, userParam);
            }else{
                appModel.create(post).then((data)=>{ res.send({status:true})}).catch((err)=>{console.log(err)});
            }
        })
    
        

        
    },
    getAllApp:async (req,res,next)=>{
        let data=await appModel.find().select('_id').select('appName');
        res.send({data:data})
        //getAll().then((data)=>{ res.send({status:true})}).catch((err)=>{});

      //res.send(app)
    },
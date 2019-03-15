import { Component ,OnChanges, SimpleChanges,AfterViewInit,NgZone } from '@angular/core';
import {CommonService} from "./common.service"
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from "@angular/forms";

declare var $:any

import {HttpClient,HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit{
  title = 'app';
  showForm=false;
  formsubmitted=false;
  myform:FormGroup;
  showInputs={};
  tempElements=""
  showNavs:any;

  defaultElements={
    "text":{"type":"text","name":"text","label":"TextField","col":6,"validation":{required:false,minlength:5,maxlength:5,regx:''},"readonly":false,"relationWith":"","requiredIf":[]},
    "number":{"type":"number","name":"number","label":"Number","col":6,"validation":{required:false,minlength:5,maxlength:5,regx:''}},
    "textarea":{"type":"textarea","name":"textarea","label":"Text Area","col":6,"validation":{required:false,minlength:5,maxlength:5,regx:''}},
    "file":{"type":"file","name":"image1","label":"Upload Image",filetype:['jpg','png'],"col":12,"validation":{required:false}},
    "formgroup":{"type":"fbGroup","name":"manager","label":"Group Information","fgFields":[
      {"type":"text","name":"text","label":"Text","col":6},
    ]},
    "empty":{"type":"empty","name":"ep","col":12},
    "matrix": {"type":"matrix","name":"m1","label":"Perma Address","desc":" Description ","matrixCol":[{"name":"Name1","type":"text","validation":{required:false,minlength:5,maxlength:5,regx:''}}],col:6},
    "radio":{"type":"radio","name":"checkbox","label":"CheckBox","inline":false,"choices":["yes","No","don't know"],"col":6},
    "checkbox":{"type":"checkbox","name":"checkbox","label":"CheckBox","inline":false,"choices":["yes","No","don't know"],"col":6},
    "select": {"type":"select","name":"lic_year","label":"1.2 Licence for Years","choices":["For 1 Year","For 2 Year","For 3 Year","For 4 Year"],"value":["1","2","3","4"], "col":"6",  },
     "address":{"type":"address","name":"address","label":"Address", "showHeader":false,"col":12 },
     "info":{"type":"info","name":"info","header":"Nic Codes","subHeader":"Nic Codes","desc":"pending yet. NIC codes component will be rendered here.work in progress on NIC compnents",col:6},
     "separator":{"type":"hr","name":"hr"}
   /* "input":{"type":"text","name":"reg_data","label":"1.1 Registration Form","col":6},
    "input":{"type":"text","name":"reg_data","label":"1.1 Registration Form","col":6},
    "input":{"type":"text","name":"reg_data","label":"1.1 Registration Form","col":6},
    "input":{"type":"text","name":"reg_data","label":"1.1 Registration Form","col":6}, */
  }


  elements=[];
  //[{"type":"text","name":"BFRegNo","label":"Registration Number","col":6,"validation":{"required":true}},{"type":"hr","name":"hr"},{"type":"text","name":"BFName","label":"Name of the Beneficiary","col":6,"validation":{"required":true,"minlength":3}},{"type":"file","name":"BFPhoto","label":"photo","filetype":["jpg","png"],"col":6,"validation":{"required":true}},{"type":"address","name":"BFAdd","label":"Address of beneficiary","showHeader":false,"col":12},{"type":"text","name":"BFFHName","label":"Father/Husband Name of Beneficiary","col":6,"validation":{"required":true,"minlength":3}},{"type":"date","name":"BFDOR","label":"Date of Registration ","col":6,"validation":{"required":true},"readonly":true},{"type":"empty","name":"ep","col":12},{"type":"empty","name":"ep","col":12},{"type":"info","name":"info","subHeader":"Detail of Nominee/ Legal Heirs or Dependents","col":12},{"type":"fbGroup","name":"nomineeDetails","label":"","fgFields":[{"type":"text","name":"name","label":"Name of Nominee","col":6,"validation":{"required":true,"minlength":3}},{"type":"file","name":"nomineeForm","label":"Upload Scanned Copy of Nomination Form No. 29","filetype":["jpg","png","pdf"],"col":6,"validation":{"required":true}},{"type":"text","name":"nameDpdt","label":"Name of Legal Heir or Dependent","col":6,"validation":{"required":true,"minlength":5}},{"type":"file","name":"DpdtCert","label":"Upload Legal Heir or Dependent Certificate","filetype":["jpg","png","pdf"],"col":6,"validation":{"required":true}},{"type":"address","name":"address","label":"Address","showHeader":false,"col":12},{"type":"date","name":"CPD","label":"Contribution paid upto:","col":6,"validation":{"required":true}},{"type":"number","name":"mob","label":"Mobile Number","col":6,"validation":{"required":true,"minlength":10,"maxlength":12}},{"type":"text","name":"typeWork","label":"Type of work","col":6,"validation":{"required":true}},{"type":"select","name":"typeMishap","label":"Type of Mishap","choices":["Natural Death","Accidental Death","Permanent Disablement"],"value":["1","2","3"],"col":"6"},{"type":"date","name":"DOD","label":"Date of death:","col":6,"validation":{"required":true}},{"type":"text","name":"plcAcc","label":"Place of Accident","col":6,"validation":{"required":false}},{"type":"file","name":"deathCert","label":"Upload scanned copy of death certificate ","filetype":["jpg","png","pdf"],"col":6,"validation":{"required":true}},{"type":"file","name":"bankpass","label":"Upload scanned copy of bank passbook","filetype":["jpg","png","pdf"],"col":6,"validation":{"required":true}}]},{"type":"empty","name":"ep","col":12},{"type":"info","name":"info","subHeader":"Banking Details","col":12},{"type":"empty","name":"ep","col":12},{"type":"fbGroup","name":"bankDetials","label":"","fgFields":[{"type":"text","name":"name","label":"Name of Bank","col":3,"validation":{"required":true,"minlength":3}},{"type":"text","name":"branch","label":"Branch Name","col":3,"validation":{"required":true}},{"type":"number","name":"number","label":"Account Number","col":3,"validation":{"required":true,"minlength":12,"maxlength":16}},{"type":"text","name":"ifsc","label":"IFSC No","col":3,"validation":{"required":true}}]}]
  

  dataToInit={}
  distt=["Amritsar","Tarn-Taran","SAS Nagar"];
  Teh=["teh1","Teh2","th2"];
  constructor(private fb:FormBuilder,
              private httpClient:HttpClient,private csf:CommonService,private zone:NgZone){
     this.zone.run(()=>{
       this.showNavs=this.csf.isShowNav();

   })
 //isShowNav this.csf.isShowNav    
  }

  
  ngAfterViewInit(){
     this.zone.run(()=>{
       //alert(this.csf.isShowNav())
     this.showNavs=this.csf.isShowNav();

   })

    var $sidebar = $('.sidebar');

    var    $sidebar_img_container = $sidebar.find('.sidebar-background');

    var    $full_page = $('.full-page');

     var   $sidebar_responsive = $('body > .navbar-collapse');

    var    window_width = $(window).width();

    var    fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

        if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
          if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('open');
          }

        }

        $('.fixed-plugin a').click(function(event) {
          // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
              event.stopPropagation();
            } else if (window.event) {
              window.event.cancelBubble = true;
            }
          }
        });

        $('.fixed-plugin .active-color span').click(function() {
     var     $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
          }

          if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
          }
        });

        $('.fixed-plugin .background-color .badge').click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('background-color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-background-color', new_color);
          }
        });

        $('.fixed-plugin .img-holder').click(function() {
       var   $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');


          var new_image = $(this).find("img").attr('src');

          if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
              $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
              $sidebar_img_container.fadeIn('fast');
            });
          }

          if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
              $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
              $full_page_background.fadeIn('fast');
            });
          }

          if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
          }
        });

        $('.switch-sidebar-image input').change(function() {
        var  $full_page_background = $('.full-page-background');

        var     $input = $(this);

          if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
              $sidebar_img_container.fadeIn('fast');
              $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
              $full_page_background.fadeIn('fast');
              $full_page.attr('data-image', '#');
            }

         var   background_image = true;
          } else {
            if ($sidebar_img_container.length != 0) {
              $sidebar.removeAttr('data-image');
              $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
              $full_page.removeAttr('data-image', '#');
              $full_page_background.fadeOut('fast');
            }

            background_image = false;
          }
        });

        $('.switch-sidebar-mini input').change(function() {
        var  $body = $('body');

        var  $input = $(this);

         /* if (md.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            md.misc.sidebar_mini_active = false;

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

          } else {

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

            setTimeout(function() {
              $('body').addClass('sidebar-mini');

              md.misc.sidebar_mini_active = true;
            }, 300);
          }*/

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function() {
            clearInterval(simulateWindowResize);
          }, 1000);

        });

  

    
   // alert("shwing")
  }
 
  addressForm(nm,fbgroup?)
  {
    let add_line="";
    let dist="";
    let teh="";
    if(fbgroup){
      
      if( this.dataToInit[fbgroup] && this.dataToInit[fbgroup][nm] && this.dataToInit[fbgroup][nm].add_line ){
        add_line= this.dataToInit[fbgroup][nm].add_line
      }
      if( this.dataToInit[fbgroup]&& this.dataToInit[fbgroup][nm] && this.dataToInit[fbgroup][nm].dist ){
        dist= this.dataToInit[fbgroup][nm].dist
      }
      if( this.dataToInit[fbgroup]&&this.dataToInit[fbgroup][nm] && this.dataToInit[fbgroup][nm].teh ){
        teh= this.dataToInit[fbgroup][nm].teh
      }
    }else{
      if(this.dataToInit[nm] && this.dataToInit[nm].add_line ){
        add_line= this.dataToInit[nm].add_line
      }
      if(this.dataToInit[nm] && this.dataToInit[nm].dist ){
        dist= this.dataToInit[nm].dist
      }
      if(this.dataToInit[nm] && this.dataToInit[nm].teh ){
        teh= this.dataToInit[nm].teh
      }
    }
    
    
    return new FormGroup({
      add_line:new FormControl(add_line, Validators.required),
      dist:new FormControl(dist, Validators.required),
      teh:new FormControl(teh, Validators.required)
    })
  }
 updateval(form,fg?){
   let a;
   if(fg){
     let t =<FormGroup>this.myform.controls[fg];
    a =t.controls[form];
   }else{
     a =<FormArray>this.myform.controls[form];
   }
   a.updateValueAndValidity();
 }
  createForm(elements,fbgroup?) {
    let testForm={}
    for(let i=0;i<elements.length;i++){
      if(elements[i].type=="address"){
        if(fbgroup){
          testForm[elements[i].name]=this.addressForm(elements[i].name,fbgroup);
        }else{
          testForm[elements[i].name]=this.addressForm(elements[i].name);
        }
        continue;
      }
      if(elements[i].type=="matrix"){
        if(fbgroup){
          testForm[elements[i].name]=this.matrix(elements[i]['matrixCol'],elements[i].name,fbgroup);
        }
        else{
          testForm[elements[i].name]=this.matrix(elements[i]['matrixCol'],elements[i].name)
        }
        continue;
      }
      if(elements[i].type=="fbGroup"){
        testForm[elements[i].name]=this.createForm(elements[i]['fgFields'],elements[i].name);
        continue;
      }
      if(elements[i].type=="info" || elements[i].type=="empty" || elements[i].type=="checklist" || elements[i].type=="hr"){
        continue;
      }
      let val:any;
     
      if(fbgroup){
        console.log(fbgroup)
        if(this.dataToInit[fbgroup] && this.dataToInit[fbgroup][elements[i].name]){
          val=this.dataToInit[fbgroup][elements[i].name]
        }else{
          val=""
        }
      }else{
        if(this.dataToInit[elements[i].name]){
          console.log(this.dataToInit[elements[i].name])
          val=this.dataToInit[elements[i].name]
        }else{
          val=""
        }
      }
      let eleKeys=(elements[i].validation)?Object.keys(elements[i].validation):[];
      let validationArr= [  ]
      for(let j=0;j<eleKeys.length;j++){
       // console.log(eleKeys);
        if(eleKeys[j]=="required" && elements[i].validation[eleKeys[j]]==true ) {
         // console.log(elements[i].validation[eleKeys[j]]);
          validationArr.push(Validators.required)

        }
        if(eleKeys[j]=="minlength" && elements[i].validation[eleKeys[j]]!=="" ) {
          validationArr.push(Validators.minLength(elements[i].validation[eleKeys[j]]))
        }
        if(eleKeys[j]=="maxlength" && elements[i].validation[eleKeys[j]]!=="" ) {
          validationArr.push(Validators.maxLength(elements[i].validation[eleKeys[j]]))
        }
       
         if(eleKeys[j]=="regx" && elements[i].validation[eleKeys[j]]!==""){
           
            validationArr.push(Validators.pattern(elements[i].validation[eleKeys[j]]))
        }
         
      }
     //console.log(validationArr,"validators");
      testForm[elements[i].name]=new FormControl(val,Validators.compose(validationArr))
    }


    return new FormGroup(testForm);
   // console.log(this.myform.controls);
    //this.showForm=true;
  }

  matrix(m,d?,fb?){
    let fa=[];
    let fg={}
    let j=0;
    let data;
    if(fb!=undefined){
      
      data= this.dataToInit[fb][d]
      console.log(data)
    }else{
      data= this.dataToInit[d]
    }
    let dlen=(data)?data.length:0
    do{
      for(let i=0;i<m.length;i++){
       // console.log(data[j][m[i].name]);
        
       let eleKeys=(m[i].validation)?Object.keys(m[i].validation):[];
       console.log(eleKeys)
        let validationArr= [  ]
       for(let k=0;k<eleKeys.length;k++){
        // console.log(eleKeys);
         if(eleKeys[k]=="required" && m[i].validation[eleKeys[k]]==true ) {
          // console.log(elements[i].validation[eleKeys[j]]);
           validationArr.push(Validators.required)
 
         }
         if(eleKeys[k]=="minlength" && m[i].validation[eleKeys[k]]!=="" ) {
           validationArr.push(Validators.minLength(m[i].validation[eleKeys[k]]))
         }
         if(eleKeys[k]=="maxlength" && m[i].validation[eleKeys[k]]!=="" ) {
           validationArr.push(Validators.maxLength(m[i].validation[eleKeys[k]]))
         }
        
       } 
       console.log(validationArr)
        if(fb!=undefined){
          //fg[m[i].name]=new FormControl("",Validators.required);
            //fg[m[i].name]=new FormControl((data && data[j] && data[j][m[i].name])?data[j][m[i].name]:"",Validators.required);
            console.log(data)
            fg[m[i].name]=new FormControl((data && data[j] && data[j][m[i].name])?data[j][m[i].name]:"",Validators.compose(validationArr));
        }else{
            fg[m[i].name]=new FormControl((data && data[j] && data[j][m[i].name])?data[j][m[i].name]:"",Validators.compose(validationArr));
        }
      }
      fa.push(new FormGroup({...fg}));
      j++;
    }while(j<dlen)
    
    
    return new FormArray(fa);
  }

  addMatrixRec(nameMat:any,fg:any){

    let mat:any;
    let temp:any;

   

    if(fg){
      temp=<FormGroup>this.myform.get(fg)
      mat=<FormArray> temp.controls[nameMat];
    }else{
      mat=<FormArray> this.myform.get(nameMat);
    }
    
    let recKey=Object.keys(mat.value[0])
    let valids=(mat.controls[0].controls);
    console.log(valids)
    let rec={}
    for(let i=0;i<recKey.length;i++){
     console.log(valids[recKey[i]].validator)

      rec[recKey[i]]=new FormControl("",valids[recKey[i]].validator);
    }
    mat.controls.push(new FormGroup(rec))
    mat.updateValueAndValidity();
  }

  removeMatrixRec(nameMat:any,index:any,fg:any){
    let mat,temp;
    if(fg){
      temp=<FormGroup>this.myform.get(fg)
      mat=<FormArray> temp.controls[nameMat];
    }else{
      mat=<FormArray> this.myform.get(nameMat);
    }
    
    mat.controls.splice(index,1)
   // mat.controls.push(new FormGroup(rec))
   mat.updateValueAndValidity();
  }

  ngOnInit() {
   // this.createFormControls();
   var that=this
   /* this.httpClient.get('http://localhost:3000/fetchData').subscribe(resp=>{
     
    //console.log(resp['data'],"resp")
    //that.dataToInit=JSON.parse(resp['data'])
    that.myform=that.createForm(that.elements);
    this.tempElements= JSON.stringify( this.elements, undefined, 9);
    that.formValuesChanged();
    that.showForm=true; 

    }) */
    that.myform=that.createForm(that.elements);
    this.tempElements= JSON.stringify( this.elements, undefined, 9);
    that.formValuesChanged();
    that.showForm=true; 
  }

  ngOnChanges(changes: SimpleChanges) {
    alert(changes);
 }

 viewForm(){
  this.showForm=false;
  
   this.elements=eval(this.tempElements)//JSON.parse(this.tempElements)
   this.tempElements= JSON.stringify( this.elements, undefined, 9);
   console.log(this.elements)
   this.myform= this.createForm(this.elements)
   this.formValuesChanged();
   this.myform.updateValueAndValidity();
   this.formsubmitted=false
  
  setTimeout(()=>{
    this.showForm=true;
  },300)
   
 }

 addInput(i:any){
  this.viewForm();
  this.showForm=false;
  this.elements.push(this.defaultElements[i]);
  this.tempElements= JSON.stringify( this.elements, undefined, 3);
  this.viewForm();
 }

  formValuesChanged(){
    this.elements.forEach((ele)=>{
     
      if((ele.type=="text" || ele.type=="file" || ele.type=="date" ||ele.type=="number" ||ele.type=="select" )&& ele["relationWith"]!=undefined && ele["relationWith"]!=""   &&  ele["requiredIf"]!=undefined && ele["requiredIf"].length>0 ){
       
        const inputControl = this.myform.get(ele.name);
       // console.log(this.myform.get(ele["relationWith"]))
        this.myform.get(ele["relationWith"]).valueChanges.subscribe(
          
            (mode: string) => {

             //  console.log(inputControl)
              //  console.log(mode);
                if (ele["requiredIf"].indexOf(mode)>-1) {
                  inputControl.setValidators([Validators.required]);
                  this.showInputs[ele.name]=1
                }
                else  {
                  inputControl.clearValidators();
                  if(ele["showIf"] && ele["showIf"].indexOf(mode)==-1){
                    this.showInputs[ele.name]=0
                  }
                }
                inputControl.updateValueAndValidity();
            });
      }
      if(ele.type=="fbGroup"){
        let fgName=ele.name;
        ele["fgFields"].forEach((fgele)=>{
        if(fgele.type=="text" &&  fgele["relationWith"]!=undefined && fgele["relationWith"]!=""   &&  fgele["requiredIf"]!=undefined && fgele["requiredIf"].length>0 ){
          let tempfg=<FormGroup>this.myform.get(ele.name);
          const inputControl = tempfg.controls[fgele.name];
          if(tempfg.get(fgele["relationWith"])!==undefined && tempfg.get(fgele["relationWith"])!==null){
            tempfg.get(fgele["relationWith"]).valueChanges.subscribe(
             
              (mode: string) => {
  
               //  console.log(inputControl)
                //  console.log(mode);
                  if (fgele["requiredIf"].indexOf(mode)>-1) {
                    inputControl.setValidators([Validators.required]);
                    this.showInputs[fgele.name]=1
                  }
                  else  {
                    inputControl.clearValidators();
                    if(fgele["showIf"] && fgele["showIf"].indexOf(mode)==-1){
                      this.showInputs[fgele.name]=0
                    }
                  }
                  inputControl.updateValueAndValidity();
              });
          }else{
            
          // console.log(this.myform.get(ele["relationWith"]))
          this.myform.get(fgele["relationWith"]).valueChanges.subscribe(
             
               (mode: string) => {
   
                //  console.log(inputControl)
                 //  console.log(mode);
                   if (fgele["requiredIf"].indexOf(mode)>-1) {
                     inputControl.setValidators([Validators.required]);
                     this.showInputs[fgele.name]=1
                   }
                   else  {
                     inputControl.clearValidators();
                     if(fgele["showIf"] && fgele["showIf"].indexOf(mode)==-1){
                       this.showInputs[fgele.name]=0
                     }
                   }
                   inputControl.updateValueAndValidity();
               });
          }
           
         }
        });
      }

    })
  }



  onSubmit() {
    this.formsubmitted=true;
    console.log("Form Submitted!");
    this.myform.updateValueAndValidity()
    console.log(JSON.stringify( this.myform.value));
    console.log( this.myform.controls);
    console.log(this.showInputs);
    if (this.myform.valid) {
      //console.log("Form Submitted!");
     // console.log(this.myform.get);
      ///this.myform.reset();
      this.httpClient.post('http://localhost:3000/saveData',{save:"saveFormData",data:this.myform.value}).subscribe(resp=>{
      
      console.log(resp);
      })
    }
  }

  public uploadFile(fileToUpload: File) {
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name); 
    return <any>this.httpClient.post('http://localhost:3000/upload/image',_formData);
  }


  public fileEvent($event,fileController,filetypes) {
    console.log(fileController)
   const fileSelected: File = $event.target.files[0];
   let temparr=fileSelected.name.split('.');
   let extfile=temparr[temparr.length-1]

   if(filetypes.indexOf(extfile)>-1){
    this.uploadFile(fileSelected)
    .subscribe( (response) => {
      let fc=<FormControl>fileController;
      fc.setValue(response.filename);
     })
   }else{
     alert("file type not valid. Should be one of following."+filetypes.join())
   }
   console.log()
   /* this.uploadFile(fileSelected)
   .subscribe( (response) => {
     let fc=<FormControl>fileController;
     fc.setValue(response.filename);
    }) */
    // ,(error) => {
    //    console.log('set any error actions...');
    //  });
}

}






/* {"type":"info","name":"info","header":"Sampler header","subHeader":"Sample Sub Header","desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged","col":6},
    {"type":"empty","name":"ep1","col":6},
    {"type":"empty","name":"ep1","col":12},
    {"type":"text","name":"name","label":"Name.","col":3},
    {"type":"text","name":"fathername","label":"Father Name.","col":3},
    {"type":"text","name":"mothername","label":"Mother Name.","col":6},
    {"type":"number","name":"regno","label":"Registration No.","col":6},
    {"type":"number","name":"adhaarno","label":"Adhaar No.","col":3},
    {"type":"number","name":"phoneno","label":"Phone No.","col":3},
    {"type":"text","name":"aboutinfo","label":"Info","col":12},
    {"type":"radio","name":"isIndian","label":"Is Indian","col":6,"choices":['yes','no']},
    {"type":"address","name":"temp","label":"Temp Address"},
    {"type":"address","name":"perma","label":"Perma Address","col":6},
    {"type":"info","name":"info","subHeader":"Sample Sub Header","desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged","col":12},
    {"type":"matrix","name":"m1","label":"Perma Address","desc":"asdf adf asdf adsf ","matrixCol":[{"name":"Name1","type":"text"},{"name":"Name2","type":"text"},{"name":"Name3","type":"text"}]},                                                                                                                                                                                                                                                                                        
    
    {"type":"empty","name":"ep1","col":12},
    {"type":"empty","name":"ep1","col":12},
    {"type":"info","name":"info","subHeader":"Testing Relations with other fields"},
    {"type":"select","name":"select1","choices":['yes','no','don\'t know'],"value":["1","2","3"], "col":"6",  },
    {"type":"text","name":"testrel","label":"Father Name.","col":6,"relationWith":"select1" ,"requiredIf":["1","3"],"showIf":["1"] },
    {"type":"text","name":"testre2","label":"fhgfh Name.","col":6, },
    {"type":"empty","name":"ep1","col":12},
    {"type":"empty","name":"ep1","col":12},
    {"type":"checklist","name":"adf","list":[{name:'AA',detail:"asdf ad fadsf asdf adf asdf a"},{name:'AA',detail:"asdf ad fadsf asdf adf asdf a"},{name:'AA',detail:"asdf ad fadsf asdf adf asdf a"}]},
    {"type":"textarea","name":"comment","label":"Extra Comments"},
      {"type":"radio","name":"gender","choices":['yes','no','don\'t know',]},
      {"type":"radio","name":"gender","choices":['yes','no','don\'t know']},
      {"type":"radio","name":"gender","choices":['yes','no','don\'t know']},
      {"type":"radio","name":"gender","choices":['yes','no','don\'t know']},
      {"type":"select","name":"select","choices":['yes','no','don\'t know'],"value":["1","2","3"] },
      {"type":"checkbox","name":"ach","choices":['yes','no','don\'t know']}, */
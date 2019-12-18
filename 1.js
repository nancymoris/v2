function rand(t)
            {
                document.getElementById("pic").innerHTML=" ";
                var arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
                var showBefore=
                    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
                document.getElementById("ContenLetters").textContent="";
                var num =t;
                if(num>26)
                {
                    alert("enter number less than 26");
                }
                else if(num<1)
                {
                    alert("enter num greater than 0");
                }
                else
                {
                    while(num>0)
                    {
                        var index=Math.floor(Math.random() * 26);
                        if(showBefore[index]==false){
                            showBefore[index]=true;
                            var letter=arr[index];
                            var NewItem=document.createElement("input");
                            NewItem.setAttribute("value",letter);
                            NewItem.setAttribute("type","button");
                            var per=document.getElementById("ContenLetters");
                            per.appendChild(NewItem);
                            NewItem.setAttribute("id",letter);
                            NewItem.setAttribute("class","Alph");
                            num=num-1;
                        }
                    }
                }
            }
/**********************tempFunction***********************/

function interaction(type,target,time){
    this.type=type;
    this.target=target;
    this.time=time;
}

/******************createOpject*******************/
function GenertLocalSortage(e,item){
    var a=[]
    if(JSON.parse(localStorage.getItem(item))!=null)
        a=JSON.parse(localStorage.getItem(item));
    var t=new Date();
    a.push(new interaction(e.type,e.target.value,t));
    localStorage.setItem(item, JSON.stringify(a));
}

/**************event on click generation*************/
var gene=document.getElementById("sub");
gene.addEventListener("click",function(e){
        GenertLocalSortage(e,"generationButton");
        var numberOfLetters=document.getElementById("numOfLetter").value;
        rand(parseInt(numberOfLetters));
    });
/**********************letters&img*****************/
var AllLetter=document.getElementById("ContenLetters");
DivPic=document.getElementById("pic");
/*****************on click letter*****************/
AllLetter.addEventListener("click",function(e){
    GenertLocalSortage(e,"letterClicked");
    var clickedLetter=e.target.value;
    DivPic.innerHTML="<img src="+clickedLetter+".jpg>";
});

/******************load&Unload*****************/
window.addEventListener("load",function(e){
    setInterval(removeItems,5000);
    //setInterval(DisplayItems,5000);
    GenertLocalSortage(e,"loading");
});
window.addEventListener("unload",function(e){
    GenertLocalSortage(e,"unloading");
    //localStorage.setItem("loading", JSON.stringify(e.type,e.target,new Date()));
});
/*********************SaveDataInDataBase*******************/
function removeItems(){
    var $str=[];
    $str=[JSON.parse(localStorage.getItem("loading"))];
    $str[1]=JSON.parse(localStorage.getItem("unloading"));
    $str[2]=JSON.parse(localStorage.getItem("generationButton"));
    $str[3]=JSON.parse(localStorage.getItem("letterClicked"))
    $.ajax({
     "type": "POST",
     "url": "db.php",
     "data": {"action":JSON.stringify($str)},
     "success": function(response){
         //console.log(response);
         //console.log(typeof(response));
         localStorage.clear();
         //console.log(JSON.stringify($str));
     }
   });              
}
/*****************FunationDisplayDataFromDataB*********************/
function DisplayItems(){
    $.ajax({
        "type": "GET",
         "url": "db.php",
         "data": {"action": ""},
         "success": function(response){
            if(response){
                if(response!="[]"){
                    console.log(response);
                    var actions = JSON.parse(response);
                    var $div=$("#div");
                    var $str="<br>";
                    $.each(actions,function(){
                        //console.log(this["time"]);
                        //console.log(this.type+"  "+this["target"]+"  "+this["time"]);
                        $str+="type: "+this.type+"<br>target.value:"+this["target"]+"<br>time:  "+this["time"]+"<br>--------------------------------------------<br>";
                    });
                    $div.html($str);
                    //console.log($str);
                }
                else
                    console.log("NO DATA");
            }else{
                console.log("oops");
            }
         }
    });           
}
/********************buttonShow*****************************/
var BuShow=document.getElementById("BuShow");
BuShow.addEventListener("click",DisplayItems)

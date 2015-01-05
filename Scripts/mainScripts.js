
var currentPage;
var hiddenItems;


var art;
var shakeInterval;
var bannerSize=0;
function shake(){
        /*banner.style.left=""+Math.round(Math.random()*10 -5)+"px";
        var amount=25+bannerSize;
        bannerSize+=1;
        if(amount>100) {
            if(amount>140)
                amount=140;
            
            banner.style.width="100%";
            banner.style.height=(amount-35)+"%";
            
        }else{
            banner.style.width=amount+"%";
        }*/
}

function loadScripts(){
    art = document.getElementById("TopArt").children[0];
    
    /*banner = document.getElementById("Banner").children[0];
    if(banner !== null){
        banner.style.left="00px";
        //banner.style.width="100px";
        banner.onmouseover=function(){bannerSize=0; shakeInterval=setInterval(function(){shake()},10);};
        banner.onmouseout=function(){banner.style.width="25%"; banner.style.height="auto"; clearInterval(shakeInterval)};   
    }*/
    
    
    
    
    
    hiddenItems=[];
    var array=document.getElementsByClassName("smallMenu");
   
    if(array.length>0){
         for(var i=0;i<array.length;i++){
              //alert("p: "+array[i]);
                var children=array[i].getElementsByTagName("li");
                for(var j=0;j<children.length;j++){
                    //alert("c: "+children[j]+children[j].className);
                    var element=children[j];
                    if(element.className!="current"){
                        children[j].style.fontSize="0";//display="none";
                        children[j].style.border="solid 0 gray";
                        hiddenItems.push(children[j]);
                    }else{
                        currentPage=element;


                    }
                }     
         }
        
        array[0].onmouseout=function(){
            for(var i=0;i<hiddenItems.length;i++){
                hiddenItems[i].style.fontSize="0";
                hiddenItems[i].style.border="solid 0 gray";
            }
        };
        array[0].onmouseover=function(){
            for(var i=0;i<hiddenItems.length;i++){
                hiddenItems[i].style.fontSize="20";
                hiddenItems[i].style.border="ridge 9 gray";
            }
        };
    }
}

function changeFont(bool){
    var body=document.getElementsByTagName("body")[0];
    if(bool)
        body.style.fontFamily="drawnFont,Tahoma,sans-serif";
    else
        body.style.fontFamily="Tahoma,sans-serif";
}
function changeBackground(value){
    var back=document.getElementById("DivWrapper");
    if(value=='red'){
        back.style.background= "#c2756f";
    }else if(value=='blue'){
        back.style.background= "#6f85c2";
    }else{
         back.style.background= "#99C26F";
    }
}
function changeName(){
    var Name=document.getElementById("NameBox").value;
    //alert("Changed title to "+Name);
    var Banner=document.getElementById("Banner");
    Banner.getElementsByTagName("img")[0].style.display="none";
    
    var array=Banner.getElementsByTagName("h1");

    if(array.length>0){
        array[0].innerHTML=Name;
    }else{
        var node=document.createElement("h1");
        var textnode=document.createTextNode(Name);
        node.appendChild(textnode);
        Banner.appendChild(node);
    }
    
    
    
   // textnode.style.marginLeft="auto";
    //note.style.fontWeight="bolder";

    
}



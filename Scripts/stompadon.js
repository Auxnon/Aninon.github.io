
var mx = 0;
var my = 0;
var x = 0, y = 0, vx = 0, vy = 0;
var moving = true;
var mDown = false;
var mOnce = true;

var blink = 0;
var side = 16;
var tick = 0;
var action = 0;
var dir = 0.1;
var grab = "";
var stompy;
var stuffX = [];
var stuffY = [];

var tummy = 0.5;
var potty = 0;
var target = 0;

var poop = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var canvas;
var ctx;
var rect;
var items;
var BG;






function onDown(e) {
    "use strict";
    mDown = true;
}

function onUp(e) {
    "use strict";
    mDown = false;
}



function refresh() {
    "use strict";

    ctx.fillStyle = "#FF00ff";
    
    ctx.fillRect(0, 0, 512, 512);
    
    ctx.drawImage(BG, 0, 0, 512, 512);
    
    if (potty < 1) {
        potty += 0.0004;
    }

    ctx.fillStyle = "#bfb19c";

    ctx.fillRect(388, 96, Math.round(tummy * 24) * 4, 16);
    ctx.fillRect(388, 116, Math.round(potty * 24) * 4, 16);


    if (mDown) {
        
        if (grab !== "stomp") {
            //console.log("no stomp");
            if (mOnce) {
                //console.log("monce");
                if (mx > x - 32 && mx < x + 32 && my > y && my < y + 64) {
                    grab = "stomp";
                    //console.log("grab stomp");
                } else if (my < 64) {
                    if (stuffX.length < 10) {
                        stuffX[stuffX.length] = mx;
                        stuffY[stuffY.length] = my;
                    }
                    //console.log("add food");
                } else {
                    //console.log("depoop");
                    var tx = Math.floor(mx / 32);
                    var ty = Math.floor((496 - my) / 16);
                    if (ty < poop[tx] && poop[tx] > 0) {
                        poop[tx] -= 1;
                    }
                }
            }
        } else {
            vx = (mx - x);
            vy = (my - y - 32);
            x = mx;
            y = my - 32;
            moving = true;
        }

        mOnce = false;
    } else {
        mOnce = true;
        grab = "";
    }



    for (var i=0;i<poop.length;i++){
        for(var k=0;k<poop[i];k++){
        //ctx.fillRect(i*32,448-(k*32),32,32);
            ctx.drawImage(items, 0, 8, 8, 8, i*32, 480-(k*16), 32, 32);
        }
    }
    if(stuffX.length>0){

        for(var i=0;i<stuffX.length;i++){
            if(stuffY[i]<480){
                stuffY[i]++;
            }
            ctx.drawImage(items, 8, 8, 8, 8, stuffX[i], stuffY[i], 32, 32);
        }
    }


      //ctx.fillText("P",374,96);


    if (moving) {
        if (grab != "stomp") {
            tick = 0;
            action = 0;
            vy += 0.1;
            y += vy;
            x += vx;
            if (y > 448) {
                y = 448;
                vy = -0.50 * vy;
                vx *= 0.9;
                if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.1) {
                    moving = false;
                }
            } else if (y < 0) {
              y = 0;
              vy = -0.5 * vy;
            }
            if (x < 32) {
              x = 32;
              vx = -0.9 * vx;
              tummy-=0.02;if(tummy<0){tummy=0;}
            } else if (x > 480) {
              x = 480;
              vx = -0.9 * vx;
              tummy-=0.02;if(tummy<0){tummy=0;}
            }
        }

        if (vx != 0) {
            side = (vx > 0) ? 16 : 0;
        }
        draw(64);
    } else {
      tick++;
      switch (action) {
        case 1: //WALK
          x += dir;
          if (x < 0) {
            x = 0;
            dir = -dir;
            side = (side == 0) ? 16 : 0;
          } else if (x > 480) {
            x = 480;
            dir = -dir;
            side = (side == 0) ? 16 : 0;
          }
          if (tick > target) {
            tick = 0;
            action = 0;
          }

          draw((tick % 24 < 12) ? 0 : 160);

          break;
        case 2: //POOP
          if (tick > 250) {
            action = 0;
            var xx=Math.round((x-(side+16))/32);
            poop[xx]=poop[xx]+1;
            potty=0;
            tummy-=0.2;
            if(tummy<0){tummy=0;}
          }
          draw((tick < 150) ? 96 : 128);

          break;

        case 3://WALK TO FOOD
          x += dir;

          if (Math.abs(x-stuffX[target]) <32) {
            tick = 0; side=0;
            action = 4;
            stuffX.splice(target,1);stuffY.splice(target,1);
          }

          draw((tick % 24 < 12) ? 0 : 160);
        break;
        case 4://EAT
          if (tick > 150) {
            action = 0;

            tummy+=0.2;
            if(tummy>1){
              tummy=1;
            }
            potty+=0.1;
            if(potty>1){
              potty=1;
            }
          }
          draw(((tick%10) < 5) ? 192 : 208);
        break;
        case 5:
          draw((tick % 100 > 50) ? 224 : 240);
          if (tick > 100) {
            tick = 0;
           if(stuffX.length>0){
              for(var i=0;i<stuffX.length;i++){
                if(stuffY[i]>=448){
                  target=i;
                  dir=((stuffX[i]-x)<0)?-0.5:0.5;
                  side=(dir>0)?16:0;
                  action=3;
                  break;
                }
              }
            }
          }
          break;
        default: //Stand

          side = (x - mx < 0) ? 16 : 0;


          draw((tick % 200 > 190) ? 32 : 0);

          if (tick > 300) {
            tick = 0;
           if(tummy<0.8 && stuffX.length>0){
              for(var i=0;i<stuffX.length;i++){
                if(stuffY[i]>=448){
                  target=i;
                  dir=((stuffX[i]-x)<0)?-0.5:0.5;
                  side=(dir>0)?16:0;
                  action=3;
                  break;
                }
              }
            }
            if(action!=3){
              if(tummy<=0.1){
                action=5;side=0;
              }else if (Math.random() > potty) {
                action = 1;
                target=100+Math.random()*500;
                if (Math.random() > 0.5) {
                  dir = 0.4;
                  side = 16;
                } else {
                  dir = -0.4;
                  side = 0;
                }
              } else {
                action = 2;
              }
            }
          }
      }
      }
}
function pixel(a) {
    "use strict";
    return Math.round(a / 4) * 4;
}
function draw(i) {
    "use strict";
    ctx.drawImage(stompy, i + side, 0, 16, 16, pixel(x) - 32, pixel(y), 64, 64);
}

function onMove(e) {
    "use strict";
    refresh();
    mx = e.clientX - rect.left + document.body.scrollLeft;
    my = e.clientY - rect.top + document.body.scrollTop;
}

var interval;

function init() {
    "use strict";
    canvas = document.getElementById("theFrame");
    ctx = canvas.getContext("2d");
    rect = canvas.getBoundingClientRect();
    
    stuffX[0] = 50;
    stuffY[0] = 80;
    BG = new Image();
    BG.src = "../../../Images/BG.png";
    stompy = new Image();
    stompy.src = "../../../Images/stampy.png";
    items = new Image();
    items.src = "../../../Images/stampItems.png";
    
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.font = "32px Arial";
    
    //refresh();
    interval = window.setInterval(function(){refresh()}, 10);

     //var node=document.createElement("img");
    //node.src="../../../Images/stampy.png";
    //document.getElementById("Banner").appendChild(node);
}

  

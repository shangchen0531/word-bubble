var arr;
var timer;
var http_request = createXmlHttpRequestObject();
        if (!http_request) {
            alert("不能创建XMLHTTP实例!");
        }

        http_request.onreadystatechange = 
        function() {
            if (http_request.readyState == 4) {
                if ( (http_request.status >= 200 && http_request.status < 300) || http_request.status == 304) {
                    var XMLDoc = http_request.response;
                    // console.log(XMLDoc);
                    // console.log(http_request.status);
                    // console.log(typeof(XMLDoc));
                    var res = XMLDoc.substring(XMLDoc.indexOf('<pre>') + 5, XMLDoc.indexOf('</pre>'));
                    // console.log(res);
                    arr = res.split('\n');
                    // console.log("arr.leng = " + arr.length);
                    // console.log(typeof(arr));
                    
                    if (typeof(timer) != undefined)
                        clearInterval(timer);

                    // 很多东西，还是越实用越好

                    timer = setInterval(bubble, 6000);

                    //2020-10-4 17:24 殇尘


                    // Anima({
                    //     duration: 1000,
                    //     timing: function(timeFraction) {
                    //         return timeFraction;
                    //     },
                    //     draw: bubble
                    // });
                }
            }
        }
$('select').change(
    function () {
        var k = "./vocabulary/" + $('select').val();
        k = k.replaceAll('\+', '%2B');
        console.log((http_request));
        http_request.open('get', 'deal.php?add=' + k, true);
        http_request.send();
    }
)
function sleep(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms));
}
var a_idx = 0;
function Anima({timing, draw, duration}) {
    
    let start = performance.now();
    console.log("start = " + start);
    requestAnimationFrame(function Anima(time) {
        console.log(time);
        // timeFraction 从 0 增加到 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // 计算当前动画状态
        let progress = timing(timeFraction);
        draw(progress); // 绘制

        console.log("3s");
        if (timeFraction < 1) {
            requestAnimationFrame(Anima);
        }
    });
    
}

function bubble(progress = 0) {
    // console.log(k);
    // console.log(progress);
    // var a = new Array("Java", "C", "Python", "C++", "C#", "Visual Basic .NET", "JavaScript", "PHP", "SQL", "Swift", "Ruby", "Delphi/Object Pascal", "Objective-C", "Assembly language", "Go", "R", "MATLAB", "D", "Visual Basic", "Perl", "SAS", "Groovy", "Dart", "PL/SQL", "Scratch", "Scala", "Lisp", "COBOL", "Fortran", "Kotlin", "Rust", "Transact-SQL", "Logo", "ABAP", "Lua", "Ada", "TypeScript", "RPG", "ML", "PowerShell", "Haskell", "LabVIEW", "Julia", "Scheme", "Hack", "OpenEdge ABL", "ActionScript", "LiveCode", "F#", "Prolog");
    var $i = $("<span/>").text(arr[a_idx]); 
    a_idx = Math.round(Math.random() * arr.length) % arr.length;
    // a_idx = (a_idx + 1) % arr.length; 
    var pos = randPOS();
    $i.css({ 
        "z-index": 999999999999999999999999999999999999999999999999999999999999999999999, 
        "top": pos[1] - 20, 
        "left": pos[0], 
        "position": "absolute", 
        // "font-weight": "bold", 
        "font-size": "280%",
        "font-family": "Consolas, 'Courier New', monospace, 'Times New Roman', serif",
        "color": "#393b44"
        // "color": '#'+Math.floor(Math.random()*0xffffff).toString(16)
    }); 
    $("body").append($i); 
    $i.animate({ 
        "top": pos[1] - 480, 
        "opacity": 0 
    }, 
    10000, 
    function() { 
        $i.remove(); 
    });
}

function randPOS() {
    let w = window.screen.width * 0.5;
    let h = window.screen.height * 0.3;
    // console.log(w);
    // console.log(h);
    w2 = Math.round(Math.random() * w);
    h2 = Math.round(0.5 * window.screen.height) + Math.round(Math.random() * h);
    return new Array(w2, h2);
}

function createXmlHttpRequestObject(){
	"use strict";
	var http_request = false;
	if (window.XMLHttpRequest){
		//Mozilla or apart from IE
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType("text/xml");
		}
	} else if (window.ActiveXObject) {//IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {}
		}
	}
	return http_request;
}

// class BubbleAnimate {
//     constructor(canvas, number=10,radius=6,color=[255,255,255],speed=0.15,speedRandomPercent=0.5,startFull=true) {
//         try{
//             this.canvas = canvas;
//         }catch{
//             throw("please provide canvas dom"); 
//             return ;
//         }
//         this.ctx = canvas.getContext('2d');
//         this.width=canvas.width;
//         this.height=canvas.height;
//         this.radius=radius;
//         this.color=color;
//         this.speed=speed;
//         this.bubbles = [];
//         this.speedRandomPercent=speedRandomPercent;
//         this.startFull=startFull;
//         for(let i=0; i<number;i++) {
//             this.bubbles.push({
//                 isReborn:true,
//                 speed: speed+(Math.random()*2-1)*speedRandomPercent*speed,
//             });
//         }
//         this.renderCanvas();
//     };
//     renderCanvas() {
//         this.ctx.clearRect(0,0,this.width,this.height);
//         this.renderBubbles();
//         window.requestAnimationFrame(() => this.renderCanvas());
//     };
//     renderBubbles() {
//         //气泡
//         let initPoint = [this.width/2,this.height];
//         for(let i = 0;i<this.bubbles.length;i++) {
//             let bubble = this.bubbles[i];
//             if(bubble.isReborn) {
//                 let x = (Math.random()-0.5)*this.width*0.96 + initPoint[0];
//                 //气泡半径在一定范围内随机生成
//                 let bubbleRadius = this.radius+ Math.floor(Math.random()*2-1)*0.5;
//                 //判断气泡初始化时是否铺满
//                 let y = this.startFull?this.height*Math.random():(initPoint[1] - bubbleRadius);
//                 bubble.radius = bubbleRadius;
//                 bubble.currentLocation = [x, y];
//                 let opacity = 0.2 + 0.4* Math.random();
//                 bubble.color = `rgba(${this.color[0]}, ${this.color[1]},${this.color[2]}, ${opacity})`;
//                 bubble.isReborn = false;
//             }else {
//                 this.renderBubble(bubble);
//                 if(bubble.currentLocation[1]<= bubble.radius){
//                     bubble.isReborn = true;
//                 }
//                 bubble.currentLocation[1] = bubble.currentLocation[1] -bubble.speed;
//             }
//         }
//     }
//     renderBubble(item) {
//         this.ctx.beginPath();
//         this.ctx.arc(...item.currentLocation, item.radius, 0, 2*Math.PI);
//         this.ctx.fillStyle = item.color;
//         this.ctx.fill();
//     }
// } 
// let canvas = document.getElementById('test-canvas');
// let bubbleCreater= new BubbleAnimate(canvas);
// bubbleCreater.renderCanvas();
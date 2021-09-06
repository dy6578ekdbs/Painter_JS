const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const saveBtn = document.getElementById("jsSave");



const INITIAL_COLOR = "#2c2c2c";
canvas.width = 700;
canvas.height = 700;

const ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);


ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let paint = false;

//그리기 멈추기
function stopPainting(){
    paint = false;
}

// 그리기
function startPainting(){
    paint = true;
}


//마우스 움직임
function onMouseMove(event){ 
    const x = event.offsetX; //client랑 다르다.
    const y = event.offsetY;
    
    if(!paint){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


function handleCanvasClick(){ //전체 색 채우기
  if(filling){ ctx.fillRect(0,0,700,700);
}}

function handleCM(event){
    event.preventDefault();

}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //마우스 클릭
    canvas.addEventListener("mouseup",  stopPainting); //클릭 풀기
    canvas.addEventListener("mouseleave", stopPainting); //클릭 풀기
    canvas.addEventListener("click", handleCanvasClick); 
    canvas.addEventListener("contextmenu", handleCM);
}


function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));


//두께 조절
const range = document.getElementById("jsRange");

function handleRangeChange(event){
    const size = event.target.value
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

//fill버튼 조작
const mode = document.getElementById("jsMode");
let filling = false;

function handeModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

if(mode){
    mode.addEventListener("click", handeModeClick);
}

function saveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();
}
if(jsSave){
    saveBtn.addEventListener("click", saveClick);
}
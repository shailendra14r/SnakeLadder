let board=document.getElementById('board');
let n;

//To put Ladder Images
function ladderImg(box,id)
{
    let img=document.createElement('img');
    img.classList.add('image');
    img.setAttribute('src','Snake2/ladder.png');
    box.appendChild(img);
}

//To put Snake Images
function snakeImg(box,id,v=0)
{
    let img=document.createElement('img');
    img.classList.add('image');
    if(v==0)
        img.setAttribute('src','Snake2/Snake1.png');
    else
        img.setAttribute('src','Snake2/Snake3.png');
    box.appendChild(img);
}

//To put Color in Boxes
function boxColor(box,i)
{
    if(i%4==0)
        box.classList.add('red');
    if(i%4==1)
        box.classList.add('blue');
    if(i%4==2)
        box.classList.add('yellow');
    if(i%4==3)
        box.classList.add('green');
}

//To create Boxes
for(let i=99;i>=0;i--)
{
    let box=document.createElement('div');
    let id;
    box.classList.add('box');
    if(Math.floor(i/10)%2!=0)
    {
        id=i+1;
        n=i-9;
    }
    else
    {
        id=n;
        n++;
    }
    box.innerHTML=`<span>${id}</span><br>`;
    box.setAttribute('id',`b${id}`);
    boxColor(box,i);
    if(id==68)
        snakeImg(box,id);
    else if(id==32)
        snakeImg(box,id,1);
    else if(id==95)
        snakeImg(box,id,1);
    else if(id==92)
        snakeImg(box,id);
    else if(id==45)
        snakeImg(box,id,1);
    else if(id==78)
        snakeImg(box,id);
    else if(id==22)
        snakeImg(box,id);
    if(id==43)
        ladderImg(box,id);
    else if(id==33)
        ladderImg(box,id);
    else if(id==87)
        ladderImg(box,id);
    board.appendChild(box);
}

//Player Initialiser
let img1=document.createElement('img');
let img2=document.createElement('img');

img1.setAttribute('class','player');
img2.setAttribute('class','player');

img1.setAttribute('src','Snake2/blue.png');
img2.setAttribute('src','Snake2/purple.png');

document.getElementById('b1').appendChild(img1);
document.getElementById('b1').appendChild(img2);


// Default values
let p1=1,p2=1;
let snake=[[22,19,2],[32,29,12],[45,36,25],[68,53,48],[78,63,58],[92,89,72],[95,86,75]];
let ladder=[[18,23,38,43],[8,13,28,33],[54,67,74,87]];

// Move Generator
generator=function(){
    let v=1+Math.floor(Math.random()*6);
    return v;
}

// Check if a player win or not
winner=function(){
    if(p1==100)
    {
        let banner=document.getElementById('banner');
        banner.innerText='Player 1 Wins';
        banner.style.display='block';
    }
    if(p2==100)
    {
        let banner=document.getElementById('banner');
        banner.innerText='Player 2 Wins';
        banner.style.display='block';
    }
    if(p1==100 || p2==100)
        return true;
    else
        return false;
}


// Check if Ladder or not
let isLadder=function(){
    ladder.forEach(function(element,index){
        if(element[0]==p1)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p1}`).removeChild(img1);
                p1=ladder[index][v];
                v++;
                if(v==4)
                    clearInterval(interval);
                document.getElementById(`b${p1}`).appendChild(img1); 
            },300);
        }
    });
    ladder.forEach(function(element,index){
        if(element[0]==p2)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p2}`).removeChild(img2);
                p2=ladder[index][v];
                v++;
                if(v==4)
                    clearInterval(interval);
                document.getElementById(`b${p2}`).appendChild(img2); 
            },300);
        }
    });
}

// Check if Snake or not
let isSnake=function(){
    snake.forEach(function(element,index){
        if(element[0]==p1)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p1}`).removeChild(img1);
                p1=snake[index][v];
                v++;
                if(v==3)
                    clearInterval(interval);
                document.getElementById(`b${p1}`).appendChild(img1); 
            },300);
        }
    });
    snake.forEach(function(element,index){
        if(element[0]==p2)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p2}`).removeChild(img2);
                p2=snake[index][v];
                v++;
                if(v==3)
                    clearInterval(interval);
                document.getElementById(`b${p2}`).appendChild(img2); 
            },300);
        }
    });
}


//Movement of Players on click
document.getElementById('btn1').addEventListener('click', function(){
    let v=p1+generator();
    let interval=setInterval(()=>{
        document.getElementById(`b${p1}`).removeChild(img1);
        p1++;
        if(winner())
        {
            clearInterval(interval);
            return ;
        }
        if(p1==v)
        {
            clearInterval(interval);
            isLadder();
            isSnake();
        }
        document.getElementById(`b${p1}`).appendChild(img1); 
    },300);
});

document.getElementById('btn2').addEventListener('click',function(){
    let v=p2+generator();
    let interval=setInterval(()=>{
        document.getElementById(`b${p2}`).removeChild(img2);
        p2++;
        if(winner())
        {
            clearInterval(interval);
            return ;
        }
        if(p2==v)
        {
            clearInterval(interval);
            isLadder();
            isSnake();
        }
        document.getElementById(`b${p2}`).appendChild(img2); 
    },300);
});
const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const mouse={
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

const n=50;
const radius=300;
const time=200;
const power=3;

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    init();
})

//utility functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(color_palate){
    return color_palate[Math.floor(Math.random()*color_palate.length)];
}

//Objects
function Particle(x,y,radius,color,velocity)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.velocity=velocity;
    this.ttl=700;
    this.draw=function(){
        c.beginPath();
        c.strokeStyle=this.color;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        // c.stroke();
        c.closePath();
    };
    this.update=function(){
        this.draw();
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        this.ttl--;
    };
}

//Implementation
let particles;
function init(){
    particles=[];
}
let hue=0;
let hueRadian=0;
function generateRing(){
    setTimeout(generateRing,time);
    hue=Math.sin(hueRadian);
    for(let i=0;i<n;i++)
    {
        const radian=(Math.PI*2)/n;
        const x=mouse.x;
        const y=mouse.y;
        particles.push(new Particle(x,y,5,`hsl(${Math.abs(hue*360)},70%,50%)`,{x:Math.cos(radian*i)*power,y:Math.sin(radian*i)*power}));
    }
    hueRadian+=0.01;
}

//Animation logo
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle='rgba(0,0,0,0.1)';
    c.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((particle,i)=>{
        if(particle.ttl<0)
            particles.splice(i,1);
        else
            particle.update();
    })
}

init();
animate();
generateRing();
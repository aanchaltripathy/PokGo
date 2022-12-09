const n_bushes=40
const n_balls=5
const player=document.querySelector('.player')//selcting the player 
const player_pos={//to set the position of the player to center
    x:parseInt(window.innerWidth/2),//for getting whole int numbers
    y:parseInt(window.innerHeight/2)
}
const balls = []
//function for setting velocity while running
const player_vel={
    x:0,
    y:0
}
const sound=new Audio('assests/coin.mp3')
function createBushes(){
    for(let i=0;i<n_bushes;i++){
        const div=document.createElement('div')
        div.classList.add('bush')
        div.style.left=Math.random() * 100 + '%'
        div.style.top=Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}
function generateBall(){
    const div=document.createElement('div')
    div.classList.add('pokeball')
    let x=Math.random()*100+ '%'
    let y=Math.random()*100+ '%'
    div.style.left=x
    div.style.top=y
    balls.push({
        ball:div,
        pos:{
            x,
            y
        }
    })
    document.body.appendChild(div)
}
function createBalls(){
    for(let i=0;i<n_balls;i++){
        generateBall()
    }
}
function collision($div1, $div2) {//to check if collides from stackoverflow
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;//if not overlapping false
    return true;
}
function checkCollisions(){
    balls.forEach(ball => {
        if(collision(ball.ball,player)){
            sound.play()
            ball.ball.remove()
            generateBall() 
        }
    })
}

function run(){
    player_pos.x+=player_vel.x
    player_pos.y+=player_vel.y
    player.style.left=player_pos.x+'px'
    player.style.bottom=player_pos.y+'px'

    checkCollisions()
    requestAnimationFrame(run)//so that run function is called again and again


}
function init(){
    createBushes()
    createBalls()
    run()
}
init()
//eventlistener for when key is pressed to sense it
window.addEventListener('keydown',function(e){
    //this.alert(e.key)
    if(e.key=="ArrowUp"){
        player_vel.y=3
        player.style.backgroundImage='url("assests/player_front.png")'
    }
    if(e.key=="ArrowDown"){
        player_vel.y=-3
        player.style.backgroundImage='url("assests/player_back.png")'
    }
    if(e.key=="ArrowLeft"){
        player_vel.x=-3
        player.style.backgroundImage='url("assests/player_left.png")'
    }
    if(e.key=="ArrowRight"){
        player_vel.x=3
        player.style.backgroundImage='url("assests/player_right.png")'
    }
    player.classList.add('active')//to give a moving animation
})
//function to set vel to 0 when key is released
window.addEventListener('keyup',function(){
    player_vel.x=0
    player_vel.y=0
    player.classList.remove('active')
})
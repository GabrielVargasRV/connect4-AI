import tokenSoundSRC from "./assets/token_sound.mp3";
const TokenSound = new Audio(tokenSoundSRC);


class Token{
    constructor(color, x, y){
        this.x = x;
        this.y = y;

        this.element = document.createElement("div");
        this.element.classList.add(`token-${color}`);

        this.currentY = 100;
            
        this.element.style.top = `${this.currentY}px`;
        this.element.style.left = `${this.x}px`;
        document.body.appendChild(this.element);

        this.animationFallInPlace(y)
    }
    
    animationFallInPlace(targetY,callback = () => {}){

        const clearIntervalAndSetY = () => {
            clearInterval(this.intervalId);
            this.currentY = targetY;
        }

        const intervalCallback = () => { 
            if(this.currentY >= targetY) {
                clearIntervalAndSetY();
                callback();
            }else this.currentY += 25;
            
            this.playTokenSound();
            this.element.style.top = `${this.currentY}px`
        }

        this.intervalId = setInterval(intervalCallback, 15);
    }

    changeColor(color){
        this.element.style.backgroundColor = color;
    }

    delete(){
        this.element.remove();
    }

    playTokenSound(){
        TokenSound.play();
    }

}

export default Token;
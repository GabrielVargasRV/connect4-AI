


class Token{
    constructor(color, x, y){
        this.element = document.createElement("div");
        this.element.classList.add(`token-${color}`);

        let currentY = 100;
            
        this.element.style.top = `${currentY}px`;
        this.element.style.left = `${x}px`;
        document.body.appendChild(this.element);

        this.intervalId = setInterval(() => {
            if(currentY > y){
                clearInterval(this.intervalId);
                currentY = y;
            }else{
                currentY += 25;
            }
            this.element.style.top = `${currentY}px`
        }, 15);
    }

}

export default Token;
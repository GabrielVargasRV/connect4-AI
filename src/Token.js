


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


    winnerAnimation(positionsOfTokens, player){
        const tokensEl = [];

		for(let token of positionsOfTokens){
			const indexOfEl = (7 * token.y) + token.x;
			if(boardElChildren[indexOfEl]) tokensEl.push(boardElChildren[indexOfEl]);
		}

		tokensEl.forEach((token, index) => {
			setTimeout(() => {
				console.log(token)
				token.animate([
					{backgroundColor: "black"},
					{backgroundColor: "green"},
					{backgroundColor: "black"},
				],{
					duration: 3000,
					iteration: 1
				})
			}, 100 * index)
		})
    }

}

export default Token;
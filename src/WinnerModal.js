const modal = document.getElementById('winner-modal');

const refresh = () => {
    window.location.reload();
}

class WinnerModal{
    static setRed(){
        modal.innerHTML = `
            <p>RED PLAYER WIN</p>
            <button onclick="refresh" class="modal-button" id="refreshBtn" >PLAY AGAIN</button>
        `;

        modal.classList.add('modal-visible');
        modal.classList.add('modal-red');
        document.getElementById('refreshBtn').addEventListener('click', refresh);
    }

    static setYellow(){
        modal.innerHTML = `
            <p>YELLOW PLAYER WIN</p>
            <button onclick="refresh" class="modal-button" id="refreshBtn" >PLAY AGAIN</button>
        `

        modal.classList.add('modal-visible');
        modal.classList.add('modal-yellow');
        document.getElementById('refreshBtn').addEventListener('click', refresh);
    }

    static set(color){
        if(color === 'red') this.setRed();
        if(color == 'yellow') this.setYellow();
    }

    static setWithDelay(color, delay = 150){
        setTimeout(() => {
            this.set(color);
        }, delay)
    }
}

export default WinnerModal;
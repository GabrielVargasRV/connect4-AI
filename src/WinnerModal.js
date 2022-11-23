const modal = document.getElementById('winner-modal');


let restartBtnCallback = null;

class WinnerModal{
    static setRed(){
        modal.innerHTML = `
            <p>RED PLAYER WIN</p>
            <button class="modal-button" id="refreshBtn" >PLAY AGAIN</button>
        `;

        modal.classList.add('modal-visible');
        modal.classList.add('modal-red');
        document.getElementById('refreshBtn').addEventListener('click', restartBtnCallback);
    }

    static setYellow(){
        modal.innerHTML = `
            <p>YELLOW PLAYER WIN</p>
            <button class="modal-button" id="refreshBtn" >PLAY AGAIN</button>
        `

        modal.classList.add('modal-visible');
        modal.classList.add('modal-yellow');
        document.getElementById('refreshBtn').addEventListener('click', restartBtnCallback);
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

    static setRestartFunction(callback){
        restartBtnCallback = callback;
    }

    static remove(){
        modal.innerHTML = '';
        modal.classList.remove('modal-visible');
        modal.classList.remove('modal-red');
        modal.classList.remove('modal-yellow');

        modal.classList.add('modal-hidden');
    }
}

export default WinnerModal;
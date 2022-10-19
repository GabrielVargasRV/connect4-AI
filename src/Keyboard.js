
document.addEventListener("keyup", Keyboard.handleKeyUp);

class Keyboard{
    listinTo = new Map();

    static handleKeyUp(event){
        if(this.listinTo.has(event.keyCode)){
            this.listinTo.get().forEach((callback) => {
                callback(event);
            })
        }

        this.keyup(event);
    }

    static keyup(event){
        // callback()
    }

    static onKeyUp(keyCode, callback){
        if(!this.listinTo.has(keyCode)){
            this.listinTo.set(keyCode, []);
        }

        const callbacks = this.listinTo.get(keyCode);
        callbacks.push(callback);

        this.listinTo.set(keyCode, callbacks);
    }
}


export default Keyboard;
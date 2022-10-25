

const listinTo = new Map();
const keyUpCallbacks = [];
class Keyboard{
    
    static handleKeyUp(event){
        if(listinTo.has(event.keyCode)){
            listinTo.get().forEach((callback) => {
                callback(event);
            })
        }

        // console.log(event);
        keyUpCallbacks.forEach((callback) => callback(event));
    }
    
    
    
    static keyup(callback){
        keyUpCallbacks.push(callback);
    }

    static onKeyUp(keyCode, callback){
        if(!listinTo.has(keyCode)){
            listinTo.set(keyCode, []);
        }
        
        const callbacks = listinTo.get(keyCode);
        callbacks.push(callback);
        
        listinTo.set(keyCode, callbacks);
    }
}

document.addEventListener("keyup", Keyboard.handleKeyUp);

export default Keyboard;
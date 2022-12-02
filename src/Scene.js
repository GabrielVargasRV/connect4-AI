


class Scene{
    constructor(){
        this.html = '';
        this.onUpdateListeners = [];

    }

    setHTML(html){
        this.html = html;
    }

    appendHTML(){
        const sceneFatherHTML = document.getElementById('scene');
        sceneFatherHTML.innerHTML = this.html;
    }

    run(){
        this.appendHTML();


    }

    update(){

        for(let callback of this.onUpdateListeners){
            callback();
        }
    }

    onUpdate(callback){
       this.onUpdateListeners.push(callback);
    }

}


export default Scene;



class SceneManager{
    constructor(initialScene){
        this.scenes = new Map();
        this.currentScene = initialScene;
    }


    add(scene){
        this.scenes.set(scene.id, scene);
    }

    remove(id){
        this.scenes.delete(id);
    }

    stop(){
        this.currentScene.stop();
    }

    run(id){
        const scene = this.scenes.get(id);
        

        if(!scene) return;

        this.currentScene.stop();
        this.currentScene = scene; 
        this.currentScene.run();
    }
}


export default SceneManager;
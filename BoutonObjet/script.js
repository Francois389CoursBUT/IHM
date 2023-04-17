class Model {
    #number;
    constructor(number) {
        this.#number = number;
        console.log("Model initialisé");
    }

    /**
     * Retourne le nombre
     * @returns {number} le nombre
     */
    getNumber() {
        console.log("Nombre retourné");
        return this.#number;
    }

    /**
     * Incrémente le nombre
     */
    increment() {
        this.#number++;
        console.log("Nombre incrémenté");
    }
}

class View {
    #display;
    #myButton;
    constructor(displayID,buttonID) {
        this.#display  = document.getElementById(displayID);
        this.#myButton = document.getElementById(buttonID);
        console.log("View initialisé");
    }
    
    /**
     * Met à jour l'affichage avec le nombre passé en paramètre
     * @param {Number} n 
     */
    updateView(n) {
        this.#display.innerText = n;
        console.log("View mise à jour");
    }

    bindMyButton(arg) {
        this.#myButton.addEventListener("click",arg);
    }
}

class Controller {
    model;
    view;
    
    /**
     * The constructor function for the Controller class.
     * @param argModel Link a instance of the model
     * @param argView Link  controller to the view
     */
    constructor(argModel, argView) {
        this.model = argModel;
        this.view = argView;
        this.view.bindMyButton(this.callBack);
        console.log("Controller initialisé");
    }

    updateView() {
        console.log("Le controller update la view");
        this.view.updateView(this.model.getNumber());
    }

    updateModel() {
        console.log("Le controller update le model");
        this.model.increment();
    }
    
    callBack = () => {
        console.clear();
        console.log("Le controller reçoit un signal");
        this.updateModel();

    }
}

console.log("Lancement de l'application ...");
const app = new Controller(new Model(0), new View("display","myButton"));
console.log("L'application est lancée");
console.log(app.model.getNumber());
app.view.updateView(app.model.getNumber());
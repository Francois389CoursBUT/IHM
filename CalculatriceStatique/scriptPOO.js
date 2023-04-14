class Model {
    #nombreAffiche;

    constructor(nombre) {
        this.#nombreAffiche = nombre;
    }

    calcul (operation, operandeDroite) {
        switch (operation) {
            case '+':
                console.log(this.#nombreAffiche + " + " + operandeDroite);
                this.#nombreAffiche += operandeDroite
                break;
            case '-':
                console.log(this.#nombreAffiche + " - " + operandeDroite);
                this.#nombreAffiche -= operandeDroite
                break;
            case '*':
                console.log(this.#nombreAffiche + " * " + operandeDroite);
                this.#nombreAffiche *= operandeDroite
                break;
            case '/':
                console.log(this.#nombreAffiche + " / " + operandeDroite);
                this.#nombreAffiche /= operandeDroite
                break;
            default:
                console.log("Opération inconnu");
                break;
        }
    }

    getNombreAffiche () {
        return this.#nombreAffiche;
    }
}

class View {
    #ecran;
    #collectionBouton;
    constructor(ecranID) {
        this.#ecran = document.getElementById(ecranID);
        this.#collectionBouton = {
            nombre:document.getElementsByClassName("nombre"),
            operation:document.getElementsByClassName("operation"),
            exe:document.getElementById("boutonExe"),
            dot:document.getElementById("boutonPoint"),
            memory:{
                memoryClearBouton: document.getElementById("boutonMC"),
                memoryRecallBouton: document.getElementById("boutonMR"),
                memoryStoreBouton: document.getElementById("boutonMS"),
                memoryAddBouton: document.getElementById("boutonMPlus"),
                memorySubstractBouton: document.getElementById("boutonMMoins")
            },
            fonction:{
                changeSigneBouton: document.getElementById("boutonPlusMoins"),
                pourcentageBouton: document.getElementById("boutonPourcentage"),
                pointDecimalBouton: document.getElementById("boutonPoint")
            },
            effacement:{
                clearBouton: document.getElementById("boutonC"),
                clearEntryBouton: document.getElementById("boutonCE"),
                clearLastDigitBouton: document.getElementById("boutonFlecheRetour")
            }
        }
        console.log("Vue initialisé");
    }

    update(n) {
        this.#ecran.innerText = n;
    }

    getBoutons() {
        return this.#collectionBouton;
    }
}

class Controller {
    model;
    view;
    constructor(argModel, argView) {
        this.model = argModel;
        this.view = argView;
        console.log("Controleur initialisé");
    }
}

console.log("Lancement application");
const app = new Controller(new Model(0), new View("ecran"))
console.log("Application lancé");
app.view.update(app.model.getNombreAffiche());
console.log(app.view.getBoutons()['nombre'].item(1).innerText);
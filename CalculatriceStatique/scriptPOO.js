class Model {
    #nombreAffiche;
    #operandeGauche;

    constructor(nombre) {
        this.#nombreAffiche = nombre.toString();
        this.#operandeGauche = null;
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

    updateModelAvecNombre (n) {
        if (this.#nombreAffiche === "0") {
            this.#nombreAffiche = "";
        } 
        this.#nombreAffiche = this.#nombreAffiche + "" + n;
        console.log("Mise à jour model ");
    }

    updateModelAvecOperation () {


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
        console.log("Mise à Jour de la vue");
        if (n.length >= 10) {
            this.#ecran.innerText = "  OVERFLOW"
        } else {
            this.#ecran.innerText = n;
        }
    }

    getBoutons() {
        return this.#collectionBouton;
    }

    /**
     * @param {Function} fonction 
     */
    bindButtonNombre (fonction) {
        for (const boutonNombre of this.#collectionBouton['nombre']) {
            boutonNombre.addEventListener("click",() => {fonction(boutonNombre.innerText)});
        }
    }

    bindButtonEffacement (fonction) {
        for (const boutonEffacement of this.#collectionBouton['effacement']) {
            boutonEffacement.addEventListener("click", () => {fonction(boutonEffacement)})
        }
    }
}

class Controller {
    model;
    view;
    constructor(argModel, argView) {
        this.model = argModel;
        this.view = argView;
        console.log("Controleur initialisé");
        this.view.bindButtonNombre(this.callBackNombre);
        this.view.bindButtonEffacement(this.callBackEffacement);
    }

    updateView () {
        console.log("Controlleur demande update vue");
        this.view.update(this.model.getNombreAffiche());
    }

    updateModelAvecNombre (n) {
        console.log("Controleur demande update model");
        this.model.updateModelAvecNombre(n)
    }

    callBackNombre = (n) => {
        console.log("");
        console.log("Bouton " + n + " cliqué");
        this.updateModelAvecNombre(n)
        this.updateView();
    }

    callBackEffacement = (bouton) => {
        console.log("Bouton d'effacement (" + bouton.innerText + ") cliqué");

    }
}

console.log("Lancement application");
const app = new Controller(new Model(0), new View("ecran"))
console.log("Application lancé");
app.updateView();
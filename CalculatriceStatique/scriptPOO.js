class Model {
    #nombreAffiche;
    #operandeGauche;
    #operationSaisie;

    constructor(nombre) {
        this.#nombreAffiche = nombre.toString();
        this.#operandeGauche = null;
    }

    /**
     * Retourne les calcul de operandeGauche et de operandeDroite 
     * par l'opération mathématique operation
     * @param {Integer} operandeGauche 
     * @param {String} operation 
     * @param {Integer} operandeDroite 
     */
    calcul (operandeGauche, operation, operandeDroite) {
        let resultat;
        switch (operation) {
            case '+':
                console.log(operandeGauche + " + " + operandeDroite);
                resultat = operandeGauche + operandeDroite
                break;
            case '-':
                console.log(operandeGauche + " - " + operandeDroite);
                resultat = operandeGauche - operandeDroite
                break;
            case '*':
                console.log(operandeGauche + " * " + operandeDroite);
                resultat = operandeGauche * operandeDroite
                break;
            case '/':
                console.log(operandeGauche + " / " + operandeDroite);
                resultat = operandeGauche / operandeDroite
                break;
            default:
                console.log("Opération inconnu");
                resultat = null;
                break;
        }
        return resultat;
    }

    getNombreAffiche () {
        return this.#nombreAffiche;
    }

    getOperation () {
        return this.#operationSaisie === null;
    }

    getOperandeGauche () {
        return this.#operandeGauche;
    }

    /**
     * 
     * @param {int} n 
     */
    updateModelAvecNombre (n) {
        if (this.#nombreAffiche == "0") {
            this.#nombreAffiche = "";
        } 
        this.#nombreAffiche = this.#nombreAffiche + "" + n;
        console.log("Mise à jour model ");
    }


    updateAvecOperation (textOperation) {
        if (this.#operandeGauche === null) {
            /* Exemple : L'utilisateur à saisie "3" puis "+", on enregistre ces donnés */
            this.#operandeGauche = parseFloat(this.#nombreAffiche);
            this.#operationSaisie = textOperation;
            this.#nombreAffiche = "";
        } else {
            let operandeGauche = parseFloat(this.#operandeGauche);
            let operandeDroite = parseFloat(this.#nombreAffiche);
            let operation = this.#operationSaisie;
            this.#nombreAffiche = this.calcul(operandeGauche, operation, operandeDroite)
            
            /*  */
            this.#operationSaisie = textOperation;
        }
    }

    /**
     * En fonction de l'id du bouton, execute la fonction correspondante
     * @param {HTMLElement} bouton 
     */
    updateModelEffacement (bouton) {
        switch (bouton.id) {
        case "boutonC":
            this.effaceCalcul();
            break;
        case "boutonCE":
            this.effaceEntre();
            break;
        case "boutonFlecheRetour":
            this.effaceDernierChar();
            break;
        default:
            break;
        }
    }

    effaceCalcul() {
        this.#nombreAffiche = 0;
        this.#operandeGauche = null;
    }

    effaceEntre() {
        this.#nombreAffiche = 0;
    }

    effaceDernierChar() {
        this.#nombreAffiche = this.#nombreAffiche.toString().substring(0,this.#nombreAffiche.length-1);
        if (this.#nombreAffiche === "") this.#nombreAffiche = "0";
    }
}

class View {
    #ecran;
    #ecranOperandeGauche;
    #ecranOperation
    #collectionBouton;
    
    constructor(ecranID,ecranOperandeID,ecranOperationID) {
        this.#ecran = document.getElementById(ecranID);
        this.#ecranOperandeGauche = document.getElementById(ecranOperandeID);
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

    /**
     * Met à jour l'écran.
     * Si le texte est invalide, affiche OVERFLOW
     * 
     * @param {String} operandeGauche 
     * @param {String} operation 
     * @param {String} operandeDroite 
     */
    update(operandeGauche,operation,operandeDroite) {
        console.log("Mise à Jour de la vue");
        if (!this.affichageEstValide(operandeDroite)) {
            this.#ecran.innerText = "OVERFLOW"
        } else {
            this.#ecran.innerText = operandeDroite;
        }
        this.#ecranOperandeGauche.innerText = operandeGauche;
    }

    /**
     * Vérifie si le texte entré est valide.
     * C'est à dire qu'il ne contient pas plus de 10 chiffres, 
     * le point, et la dernière opération saisie
     * 
     * @param {boolean} text 
     * @returns 
     */
    affichageEstValide(text) {
        let valide = false;
        //TODO Ecrire test
        return valide;
    }

    getBoutons() {
        return this.#collectionBouton;
    }

    /**
     * @param {Function} fonction 
     */
    bindButtonNombre (fonction) {
        for (let index = 0; index < this.#collectionBouton['nombre'].length; index++) {
            let boutonNombre = this.#collectionBouton['nombre'].item(index);
            boutonNombre.addEventListener("click",() => {fonction(boutonNombre.innerText)});
        }
    }


    /**
     * 
     * @param {Function} fonction La fonction à éxécuter au clique
     */
    bindButtonEffacement (fonction) {
        for (let index = 0; index < Object.keys(this.#collectionBouton['effacement']).length; index++) {
            const boutonEffacement = Object.values(this.#collectionBouton['effacement'])[index];
            boutonEffacement.addEventListener("click", () => {fonction(boutonEffacement)})
        }
    }
    
    /**
     * Ajoute à chaque bouton représentant une opération un EventListener
     * 
     * @param {Function} fonction 
     */
    bindButtonOperation (fonction) {
        for (let index = 0; index < Object.keys(this.#collectionBouton['operation']).length; index++) {
            const boutonOperation = Object.values(this.#collectionBouton['operation'])[index];
            boutonOperation.addEventListener("click", () => {fonction(boutonOperation)})
        }
    }
}

class Controller {
    model;
    view;

    /**
     * Constructeur du controlleur
     * @param {Model} argModel Le modéle du controlleur
     * @param {View} argView La vue du controlleur
     */
    constructor(argModel, argView) {
        this.model = argModel;
        this.view = argView;
        console.log("Controleur initialisé");
        this.view.bindButtonNombre(this.callBackNombre);
        this.view.bindButtonEffacement(this.callBackEffacement);
    }

    updateView () {
        console.log("Controlleur demande update vue");
        this.view.update(this.model.getOperandeGauche(),
                         this.model.getOperation(),
                         this.model.getNombreAffiche());
    }

    /**
     * 
     * @param {int} n 
     */
    updateModelAvecNombre (n) {
        console.log("Controleur demande update model suite aux clique d'un nombre");
        this.model.updateModelAvecNombre(n)
    }

    /**
     * 
     * @param {HTMLElement} bouton 
     */
    updateModelEffacement (bouton) {
        console.log("Update du modéle demandé par le controlleur suite aux clique d'un effacement");
        this.model.updateModelEffacement(bouton)
    }

    /**
     * 
     * @param {String} bouton 
     */
    updateModelAvecOperation(boutonText) {
        this.model.updateAvecOperation(boutonText);
    }

    callBackNombre = (n) => {
        console.log("");
        console.log("Bouton " + n + " cliqué");
        this.updateModelAvecNombre(n)
        this.updateView();
    }

    callBackEffacement = (bouton) => {
        console.log("Bouton d'effacement (" + bouton.innerText + ") cliqué");
        this.updateModelEffacement(bouton);
        this.updateView();
    }

    callBackOperation = (bouton) => {
        console.log("Opération (" + bouton.innerText + ") cliqué");
        this.updateModelAvecOperation(bouton.innerText);
        this.updateView();
    }
}


console.log("Lancement application");
const app = new Controller(new Model(0), new View("ecran","ecranNbGauche"));
console.log("Application lancé");
app.updateView();
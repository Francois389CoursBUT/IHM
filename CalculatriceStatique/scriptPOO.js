class Model {
    #nombreAffiche;
    #operandeGauche;
    #operationSaisie;

    constructor(nombre) {
        this.#nombreAffiche = nombre.toString();
        this.#operandeGauche = null;
    }

    /**
     * Retourne les calculs de operandeGauche et de operandeDroite
     * par l'opération mathématique operation
     * @param {number} operandeGauche
     * @param {String} operation 
     * @param {number} operandeDroite
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
        if (this.#nombreAffiche === "0") {
            this.#nombreAffiche = "";
        } 
        this.#nombreAffiche = this.#nombreAffiche + "" + n;
        console.log("Mise à jour model ");
        return this.#nombreAffiche;
    }


    updateAvecOperation (textOperation) {
        if (this.#operandeGauche === null) {
            /* Exemple : L'utilisateur a saisi "3" puis "+", on enregistre ces données */
            this.#operandeGauche = parseFloat(this.#nombreAffiche);
            this.#operationSaisie = textOperation;
            this.#nombreAffiche = "";
        } else {
            let operandeGauche = parseFloat(this.#operandeGauche);
            let operandeDroite = parseFloat(this.#nombreAffiche);
            let operation = this.#operationSaisie;
            this.#nombreAffiche = this.calcul(operandeGauche, operation, operandeDroite)

            this.#operationSaisie = textOperation;
        }
        //TODO Retourner quelque chose
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

    updateModelAvecPoint () {
        if (this.#nombreAffiche.indexOf(".") === -1) {
            this.#nombreAffiche = this.#nombreAffiche + ".";
        }
    }

    updateModelExe () {
        if (this.#operandeGauche !== null) {
            let operandeGauche = parseFloat(this.#operandeGauche);
            let operandeDroite = parseFloat(this.#nombreAffiche);
            let operation = this.#operationSaisie;
            this.#nombreAffiche = this.calcul(operandeGauche, operation, operandeDroite)
            this.#operandeGauche = null;
            this.#operationSaisie = null;
        }
    }

    effaceCalcul() {
        this.#nombreAffiche = 0;
        this.#operandeGauche = null;
    }

    effaceEntre() {
        this.#nombreAffiche = 0;
        return this.#nombreAffiche;
    }

    effaceDernierChar() {
        this.#nombreAffiche = this.#nombreAffiche.toString().substring(0,this.#nombreAffiche.length-1);
        if (this.#nombreAffiche === "") this.#nombreAffiche = "0";
        return this.#nombreAffiche;
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
     * C'est-à-dire qu'il ne contient pas plus de 10 chiffres,
     * le point et la dernière opération saisie
     * 
     * @param {String} text
     * @returns 
     */
    affichageEstValide(text) {
        //TODO écrire test
        let valide = false;
        if (text.toString().includes(".")) {
            valide = text.length <= 11;
        } else {
            valide = text.length <= 10;
        }
        if (!valide) {
            console.log("Affichage invalide" + text)
        }
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
     * @param {Function} fonction La fonction à exécuter aux clique sur le bouton
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

    bindButtonPoint (fonction) {
        this.#collectionBouton['dot'].addEventListener("click", () => {fonction(this.#collectionBouton['dot'])})
    }

    bindButtonExe (fonction) {
        this.#collectionBouton['exe'].addEventListener("click", () => {fonction(this.#collectionBouton['exe'])})
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

        /* Initialisation des fonctions de rappel */
        this.view.bindButtonNombre(this.callBackNombre);
        this.view.bindButtonEffacement(this.callBackEffacement);
        this.view.bindButtonOperation(this.callBackOperation);
        this.view.bindButtonPoint(this.callBackPoint);
        this.view.bindButtonExe(this.callBackExe);
    }

    /**
     * Demande la mise à jour de la vue.
     */
    updateView () {
        console.log("Controlleur demande update vue");
        this.view.update(this.model.getOperandeGauche(),
                         this.model.getOperation(),
                         this.model.getNombreAffiche());
    }

    /**
     * Met à jour le modèle avec le nombre cliqué
     * @param {int} n 
     */
    updateModelAvecNombre (n) {
        console.log("Controleur demande update model suite aux clique d'un nombre");
        this.model.updateModelAvecNombre(n)

    }

    /**
     * Met à jour le modèle avec la méthode d'effacement demandé
     * @param {HTMLElement} bouton 
     */
    updateModelEffacement (bouton) {
        console.log("Update du modéle demandé par le controlleur suite aux clique d'un effacement");
        this.model.updateModelEffacement(bouton)
    }

    /**
     * Met à jour le modèle avec l'opération demandé
     * @param {String} boutonText
     */
    updateModelAvecOperation(boutonText) {
        this.model.updateAvecOperation(boutonText);
    }

    /**
     * Met à jour le modèle avec le point décimal
     */
    updateModelAvecPoint() {
        console.log("Update du modéle demandé par le controlleur suite aux clique d'un point");
        this.model.updateModelAvecPoint();
    }

    /**
     * Callback appelé lors du clique sur un bouton nombre
     * @param nombre
     */
    callBackNombre = (nombre) => {
        console.log("");
        console.log("Bouton " + nombre + " cliqué");
        this.updateModelAvecNombre(nombre)
        this.updateView();
    }

    /**
     * Callback appelé lors du clique sur un bouton d'effacement
     * @param bouton
     */
    callBackEffacement = (bouton) => {
        console.log("Bouton d'effacement (" + bouton.innerText + ") cliqué");
        this.updateModelEffacement(bouton);
        this.updateView();
    }

    /**
     * Callback appelé lors du clique sur un bouton d'opération
     * @param bouton
     */
    callBackOperation = (bouton) => {
        console.log("Opération (" + bouton.innerText + ") cliqué");
        this.updateModelAvecOperation(bouton.innerText);
        this.updateView();
    }

    /**
     * Callback appelé lors du clique sur le bouton point
     */
    callBackPoint = (bouton) => {
        console.log("Bouton Point cliqué");
        this.updateModelAvecPoint();
    }

    /**
     * Callback appelé lors du clique sur le bouton exe
     */
    callBackExe = (bouton) => {
        console.log("Bouton Exe cliqué");
        this.model.updateModelExe();
        this.updateView();
    }
}


console.log("Lancement application");
const app = new Controller(new Model(0), new View("ecran","ecranNbGauche"));
console.log("Application lancé");
app.updateView();
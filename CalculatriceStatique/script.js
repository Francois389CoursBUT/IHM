//Variables globales
let nbAffichage = "";
let nbDeCote = 0; //Des qu'un bouton opération est cliqué, on met le nombre affiché de coté.
let resultat = 0;

let eltAAfficher = 0;
let operationSelectionner = '';

let premiereOperation = true;
let estDejaFlottant = false;
let calculAEteExecuter = false;

// Récupération des élement du DOM
const affichage = document.getElementById("ecran");



const memoryClearBouton = document.getElementById("boutonMC");         //
const memoryRecallBouton = document.getElementById("boutonMR");        //
const memoryStoreBouton = document.getElementById("boutonMS");         //
const memoryAddBouton = document.getElementById("boutonMPlus");        //
const memorySubstractBouton = document.getElementById("boutonMMoins"); //

const clearBouton = document.getElementById("boutonC");                     //
const clearEntryBouton = document.getElementById("boutonCE");               // 
const clearLastDigitBouton = document.getElementById("boutonFlecheRetour"); //
const changeSigneBouton = document.getElementById("boutonPlusMoins");       //
const pourcentageBouton = document.getElementById("boutonPourcentage");     //
const pointDecimalBouton = document.getElementById("boutonPoint");          //

const listeBoutonChiffre = document.getElementsByClassName("nombre");

const additionBouton     = document.getElementById("boutonPlus");             //Done
const soustractionBouton = document.getElementById("boutonMoins");            //Done
const multiplicationBouton = document.getElementById("boutonMultiplication"); //Done
const divisionBouton = document.getElementById("boutonDiviser");              //Done

const executerBouton = document.getElementById("boutonExe");                  //

for (const boutonNombre of listeBoutonChiffre) {
    boutonNombre.firstChild.addEventListener('click',concatenerNombre);
}
pointDecimalBouton.addEventListener('click',callBackpointDecimalBouton); 

clearBouton.addEventListener('click',clearCalul);
clearEntryBouton.addEventListener('click',resetAffichage);
clearLastDigitBouton.addEventListener('click',clearLastDigit);

additionBouton.addEventListener      ('click',callBackOperande)  // +
soustractionBouton.addEventListener  ('click',callBackOperande)  // -
multiplicationBouton.addEventListener('click',callBackOperande)  // *
divisionBouton.addEventListener      ('click',callBackOperande)  // /

executerBouton.addEventListener('click',callBackExecuter)

/**
 * Effectue le calul est le garde en mémoire
 * @param {boolean} affichage Si a true affiche le resultat
 */
function executer() {
        console.log(nbAffichage + " " + operationSelectionner + " " + nbDeCote);
        switch (operationSelectionner) {
        case '+':
            resultat = nbAffichage + nbDeCote;
            break;
        case '-':
            resultat = nbAffichage - nbDeCote;
            break;
        case '*':
            resultat = nbAffichage * nbDeCote;
            break;
        case '/':
            resultat = nbAffichage / nbDeCote;
            break;
        default:
            console.log(this + " à pour valeur " + this.innerText);
            break;
        }
        nbDeCote = resultat;
}

function callBackExecuter() {
    console.log("Une opération a été saisie ? " + operationAEtaitSaisie);
    if (operationAEtaitSaisie) {
        console.log(nbAffichage + " " + operationSelectionner + " " + nbDeCote);
        switch (operationSelectionner) {
        case '+':
            resultat = nbAffichage + nbDeCote;
            break;
        case '-':
            resultat = nbAffichage - nbDeCote;
            break;
        case '*':
            resultat = nbAffichage * nbDeCote;
            break;
        case '/':
            resultat = nbAffichage / nbDeCote;
            break;
        default:
            console.log(this + " à pour valeur " + this.innerText);
            break;
        }
        
        nbAffichage = resultat;
        updateAffichage();
        calculAEteExecuter = true;
    }
}

/**
 * Récupére l'opération selectionner,
 * met de coté le nombre saisie et supprime l'affichage.
 */
function callBackOperande() {
    //TODO L’opération qui a été saisie mais non exécutée doit être visible à l’écran pour permettre à l’utilisateur de 
    //TODO vérifier qu’il ait bien cliqué sur la bonne touche.
    //TODO La saisie d’une autre opération remplace celle déjà saisie.
    //TODO Si un calcul était déjà présent avant la saisie de l'opération alors fair le calule et afficher le résultat ainsi que l'opérateur saisie
    
}

/**
 * Ajoute la virgule décimal au nombre
 */
function callBackpointDecimalBouton() {
    if (!estDejaFlottant) {
        nbAffichage += ".";
        estDejaFlottant = true;
    }
    eltAAfficher = nbAffichage;
    updateAffichage();
}

/**
 * Ajoute le nombre de l'élement cliqué, à droite du nombre présent en mémoire.
 */
function concatenerNombre() {
    if (nbAffichage.toString.length = 10) {
        afficheErreur("OVERFLOW");
    }
    if (calculAEteExecuter) {
        calculAEteExecuter = false;
        nbAffichage = "";
    }
    nbAffichage += "" + this.innerText;
    eltAAfficher = nbAffichage;
    updateAffichage();
}

/**
 * Retire le nombre présent dans l'affichage
 */
function resetAffichage() {
    nbAffichage = "";
    eltAAfficher = 0;
    estDejaFlottant = false;
    updateAffichage();
}

/**
 * Supprime le calcul de la mémoire
 */
function clearCalul() {
    resetAffichage();
    estDejaFlottant = false;
    //TODO Effacer le calcul de la mémoire
}

function clearLastDigit() {
    console.log("Clear last digit");
    nbAffichage = nbAffichage.toString().substring(0,nbAffichage.length-1);
    eltAAfficher = nbAffichage;
    updateAffichage();
}

/**
 * Affiche le nombre présent dans la mémoire
 */
function updateAffichage() {
    affichage.innerText = eltAAfficher;
}

function afficheErreur(messageErreur) {
    affichage.innerText = messageErreur;
}

//Affichage initial
updateAffichage();
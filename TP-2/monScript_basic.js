// Initialisation des variables globales :
const AJOUT_NORMAL = 1;
const CYCLE_COULEUR = ["green","red","blue","black"];
let indexCouleur = 0;
let nombreCompteur = 0;
let ajout = AJOUT_NORMAL;
let incrementNegatifValide = false;
const  LISTE_BOUTON = document.getElementsByTagName("button");

// Récupération des éléments du DOM
const display = document.getElementById("displayednombreCompteur");

const myButton = document.getElementById("myButtonID");

const resetAjout = document.getElementById("resetAjout");
const resetBouton = document.getElementById("resetBouton");

const incrementeBouton = document.getElementById("incrementeBouton");
const decrementeBouton = document.getElementById("decrementeBouton");

const textAjoutManuel = document.getElementById("ajoutManuel");
const messageAlerte = document.getElementById("messageAlerte");

const checkincrementNegatif = document.getElementById("autoriseIncrementNegatif");

const changeColorButton = document.getElementById("changeColorButton");
const listeCouleur = document.getElementById("colorList");

// Ajout d'un Event Listener sur le bouton
myButton.addEventListener("click", callBack);
resetBouton.addEventListener("click", restCompteur);
resetAjout.addEventListener("click", callBackResetAjout);

incrementeBouton.addEventListener("click", incrementeAjout);
decrementeBouton.addEventListener("click", decrementeAjout);
textAjoutManuel.addEventListener("keyup", updateIncrement);

checkincrementNegatif.addEventListener("click",toogleNegatif);

changeColorButton.addEventListener("click",changeColor );
listeCouleur.addEventListener("change",changeColorAvecListe );

// Fonction liée à l'appui du bouton
/**
 * Ajoute au compteur la valeur de la variable ajout
 */
function callBack() {
    nombreCompteur = nombreCompteur + ajout;
    displayUpdate();
}

/**
 * Remet la valeur du compteur à zéro.
 * Puis met à jour l'affichage du compteur.
 */
function restCompteur() {
    nombreCompteur = 0;
    displayUpdate();
}

/**
 * Met la variable ajout à la valeur par défaut (1).
 */
function callBackResetAjout() {
    ajout = AJOUT_NORMAL;
    displayUpdate();
}

/**
 * Ajoute 1 à la variable ajout.
 * Puis met à jour l'affichage du compteur.
 */
function incrementeAjout() {
    ajout ++;
    displayUpdate();
}

/**
 * Retire 1 à la variable ajout.
 * Puis met à jour l'affichage du compteur.
 */
function decrementeAjout() {
    if (incrementNegatifValide) {
        ajout --;
        displayUpdate();
    }
}

/**
 * Autorise la décrémentation pour la variable ajout.
 * Si on décoche et que la variable ajout est négatif
 * alors mettre la variable ajout à la valeur par défaut (1).
 */
function toogleNegatif() {
    incrementNegatifValide = checkincrementNegatif.checked;
    if (!incrementNegatifValide && ajout < 0) {
        ajout = 1;
        console.log();
    }
    updateIncrement();
}


/**
 * Incrémente l'index de la couleur.
 * Puis met à jour la valeur de l'index de la couleur
 * grâce à la fonction updateCouleur().
 */
function changeColor() {
    indexCouleur ++;
    updateCouleur();
}

/**
 * Change l'index de la couleur en fonction de la valeur
 * choisie par l'utilisateur dans la liste déroulante.
 *
 * Puis met à jour la valeur de l'index de la couleur
 * grâce à la fonction updateCouleur().
 */
function changeColorAvecListe() {
    let couleurSelectionner = listeCouleur.value;
    indexCouleur = CYCLE_COULEUR.indexOf(couleurSelectionner);
    updateCouleur();
}

///////////////// Mise à jour de la vue ////////////////////

/**
 * Met à jour la couleur des boutons
 * en fonction de l'index de la couleur
 * dans le tableau CYCLE_COULEUR.
 */
function updateCouleur() {
    let indiceCouleurChoisie = indexCouleur % CYCLE_COULEUR.length;
    for (const element of LISTE_BOUTON) {
        element.style.color = CYCLE_COULEUR[indiceCouleurChoisie];
    }
    listeCouleur.value = CYCLE_COULEUR[indiceCouleurChoisie];
}

/**
 * Met à jour la valeur de l'ajout
 * en fonction de la saisie de l'utilisateur
 * dans le champ de texte.
 */
function updateIncrement() {
    if (textAjoutManuel.value === "") {
        cacherElement(messageAlerte);
    } else {
        let valeurSaisie = parseInt(textAjoutManuel.value);

        if (nombreCompteur.isInteger(valeurSaisie) && incrementNegatifValide) {
            ajout = valeurSaisie;
            cacherElement(messageAlerte);

        } else if (nombreCompteur.isInteger(valeurSaisie)) {
            ajout = Math.abs(valeurSaisie);
            cacherElement(messageAlerte);
        } else {
            afficherElement(messageAlerte);
            console.log(valeurSaisie);
        }
        displayUpdate();
    }
}

/**
 * Met à jour l'affichage du bouton d'ajout
 * et du compteur
 */
function displayUpdate() {
    if (ajout < 0) {
        myButton.innerText = "Cliquer retire " + -ajout;
    } else if (ajout === 0) {
        myButton.innerText = "Cliquer n’ajoute rien";
    } else {
        myButton.innerText = "Cliquer pour ajouter " + ajout;
    }
    display.innerText = nombreCompteur;
}

/**
 * Affiche element
 * @param {HTMLElement} element element à afficher
 */
function afficherElement(element) {
    element.style.display = "block";
}

/**
 * Cache element
 * @param {HTMLElement} element element à cacher
 */
function cacherElement(element) {
    element.style.display = "none";
}

// Affichage initial
display.innerText = nombreCompteur;
cacherElement(messageAlerte);
messageAlerte.style.color = "red";
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const form = document.getElementsByName('reserve');

// lancer l’événement modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// lancer le formulaire modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fermer le formulaire modal
function closeModal() {
    modalbg.style.display = "none";
    window.location.href = "index.html";
}

// Fermer l’événement modal
modalCloseBtn[0].addEventListener ("click", closeModal);

// Conserver les données de formulaire
form[0].addEventListener('submit', (e) => {
  e.preventDefault();
});

// Vérifier la validation de l’état fourni
function checkCondition(condition){
  if(!condition) return false;
  else return true;
}

//Envoyer un message d’erreur spécifique plutôt que elementId fourni
//Ajouter aria non valide pour utiliser CSS
function getErrorMessage(elementId, message, inputAssociate){
  if(elementId && message) {
    document.getElementById(elementId).style.display = "block";
    document.getElementById(elementId).innerText = message;
    if(inputAssociate) inputAssociate.setAttribute("aria-invalid", "true");
  }
  else throw new Error('Missing parameter for handler error message');
}

//2ème soumission, masquer un champ valide précédemment invlid
// Swich aria invalid to false pour utiliser CSS

function hideErrorMessage(elementId, inputAssociate) {
  if(elementId) document.getElementById(elementId).style.display = "none";
  if(inputAssociate) inputAssociate.setAttribute("aria-invalid", "false");
}

//Vérifiez après avoir envoyé la condition du formulaire et appelez la fonction qui affiche un message spécifique ou un champ valide
function validate(form) { 
    let firstNameValid = checkCondition(form["first"].value) && checkCondition(form["first"].value.length >= 2);
    firstNameValid ? 
      hideErrorMessage('error-firstName', form["first"]) : 
      getErrorMessage('error-firstName', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", form["first"]);
    
    let lastNameValid = checkCondition(form["last"].value) && checkCondition(form["last"].value.length >= 2);
    lastNameValid ?  
      hideErrorMessage('error-lastName', form["last"]) : 
      getErrorMessage('error-lastName', "Veuillez entrer 2 caractères ou plus pour le champ du nom.", form["last"]); 
    
    //https://regex101.com/
    let emailValid = checkCondition(form["email"].value) && checkCondition(/[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(form["email"].value));
    emailValid ? 
      hideErrorMessage('error-email', form["email"]) : 
      getErrorMessage('error-email', "Veuillez entrer une addresse mail valide.", form["email"]);

    let birthdateValid = checkCondition(form["birthdate"].value) && checkCondition(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(form["birthdate"].value));
    birthdateValid ? 
      hideErrorMessage('error-birthdate', form["birthdate"]) : 
      getErrorMessage('error-birthdate', "Veuillez entrer une date de naissance.", form["birthdate"]);

    //isNaN renvoie false si est un nombre, true si ce n’est pas le cas
    let qteTournamentValid = checkCondition(form["quantity"].value) && checkCondition(/^[0-9]+$/.test(form["quantity"].value));
    qteTournamentValid ? 
      hideErrorMessage('error-tournament', form["quantity"]) : 
      getErrorMessage('error-tournament', "Veuillez entrer une valeur numérique.", form["quantity"]);

    let locationValid = checkCondition(form.location.value);
    locationValid ?  hideErrorMessage('error-location') : getErrorMessage('error-location', "Veuillez sélectionner une ville.");

    let termsValid = checkCondition(form.terms.checked);
    termsValid ? hideErrorMessage('error-terms') : getErrorMessage('error-terms', "Veuillez indiquer que vous acceptez les conditions générales.");

    // Vérifiez le formulaire de confirmation, affichez un message de confirmation
    if(
        firstNameValid 
        && lastNameValid 
        && emailValid
        && birthdateValid 
        && qteTournamentValid
        && locationValid
        && termsValid
      ) {
        document.querySelector(".modal-body").style.display = "none";
        document.querySelector(".formConfirmation").style.display = "block";
      }
  }

 
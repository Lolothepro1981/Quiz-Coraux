// Fonction pour gérer l'enregistrement du score
const saveHighScore = (e) => {
    // Afficher un message dans la console lorsque le bouton est cliqué
    console.log("Clicked the save button!");

    // Empêche le comportement par défaut de l'événement (par exemple, la soumission du formulaire)
    e.preventDefault();
};

const MostRecentScore

// Ajout d'un gestionnaire d'événement au bouton "Save"
const saveButton = document.getElementById("saveButton");
if (saveButton) {
    saveButton.addEventListener("click", saveHighScore);
}

// Gestion de l'état du bouton Save Score
const saveScoreBtn = document.getElementById("saveScoreBtn");
const username = document.getElementById("username");

if (username && saveScoreBtn) {
    username.addEventListener("keyup", () => {
        console.log(username.value);
        // Correction : utilise la propriété `disabled` correctement
        saveScoreBtn.disabled = !username.value.trim(); // Désactivé si la saisie est vide ou composée d'espaces
    });
}

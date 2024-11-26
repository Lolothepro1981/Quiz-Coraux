// Identifier les éléments DOM
const questionElement = document.getElementById("question"); // Correctement identifié l'élément
const choices = Array.from(document.getElementsByClassName("choice-text")); // Récupérer les choix
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

console.log(choices);

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Jeu de questions
const questionSet = [
    {
        question: "Combien de temps faut-il pour qu'un récif corallien se forme ?",
        choice1: "Des millions d'années",
        choice2: "Des dizaines d'années",
        choice3: "Plusieurs siècles",
        choice4: "Quelques mois",
        answer: 3,
    },
    {
        question: "Que sont les coraux ?",
        choice1: "Des plantes aquatiques",
        choice2: "Des colonies d'animaux marins",
        choice3: "Des roches",
        choice4: "Des algues",
        answer: 2,
    },
    {
        question: "Quel élément est essentiel pour la survie des coraux ?",
        choice1: "La lumière du soleil",
        choice2: "Le sel",
        choice3: "Les poissons",
        choice4: "Le sable",
        answer: 1,
    },
    {
        question: "Où trouve-t-on la plupart des récifs coralliens ?",
        choice1: "Dans les océans arctiques",
        choice2: "Dans les mers chaudes tropicales",
        choice3: "Dans les rivières",
        choice4: "Dans les lacs salés",
        answer: 2,
    },
    {
        question: "Quel est le principal danger pour les coraux ?",
        choice1: "Les tempêtes marines",
        choice2: "Le blanchiment causé par le changement climatique",
        choice3: "Les requins",
        choice4: "Les oiseaux marins",
        answer: 2,
    },
    {
        question: "De quelle couleur sont les coraux mort ?",
        choice1: "Blanc",
        choice2: "Gris",
        choice3: "Colorés",
        choice4: "Noir",
        answer: 1,
    },
    {
        question: "Les coraux ont une relation symbiotique avec :",
        choice1: "Les algues zooxanthelles",
        choice2: "Les méduses",
        choice3: "Les étoiles de mer",
        choice4: "Les mollusques",
        answer: 1,
    },
    {
        question: "Quel type de coraux forme des récifs ?",
        choice1: "Les coraux mous",
        choice2: "Les coraux durs",
        choice3: "Les coraux profonds",
        choice4: "Tous les types de coraux",
        answer: 2,
    },
    {
        question: "Les récifs coralliens couvrent environ quel pourcentage du fond marin ?",
        choice1: "10%",
        choice2: "25%",
        choice3: "1%",
        choice4: "50%",
        answer: 3,
    },
    {
        question: "Pourquoi les récifs coralliens sont-ils importants pour l'environnement ?",
        choice1: "Ils produisent du pétrole",
        choice2: "Ils abritent une grande diversité de vie marine",
        choice3: "Ils régulent les marées",
        choice4: "Ils empêchent les tsunamis",
        answer: 2,
    },
];

// CONSTANTES
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

// Initialisation du jeu
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionSet]; // Copie des questions
    console.log("Questions disponibles:", availableQuestions);
    getNewQuestion();
};

// Fonction pour obtenir une nouvelle question
const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        console.log("Fin du jeu !");
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    localStorage.setItem('MostRecentScore', score)
    // Mise à jour de la barre de progression
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    // Afficher la question
    questionElement.innerText = currentQuestion.question;

    // Assigner les textes des choix
    choices.forEach((choice, index) => {
        const number = index + 1;
        choice.innerText = currentQuestion[`choice${number}`];
        choice.setAttribute("data-number", number); // Ajout de l'attribut dataset
    });

    // Retirer la question actuelle du tableau des questions disponibles
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

// Gestion des clics sur les réponses
choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset["number"]);

        // Vérifier si la réponse est correcte
        const classToApply = selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // Retirer la classe après un court délai
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});

// Fonction pour incrémenter le score
const incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// Lancer le jeu
startGame();

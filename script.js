const defaultWords = [
    { english: "Contribution", russian: "вклад" },
    { english: "Transactional", russian: "транзакционный" },
    { english: "Oversight", russian: "надзор" },
    { english: "Encompass", russian: "охватывать" },
    { english: "Irritants", russian: "раздражители" },
    { english: "Frustrate", russian: "расстраивать" },
    { english: "Showstopper", russian: "критическая проблема" },
    { english: "Mitigation", russian: "смягчение" },
    { english: "Mutuality", russian: "взаимность" },
    { english: "Tentatively", russian: "предварительно" },
    { english: "Commensurate", russian: "соразмерный" },
    { english: "Endorse", russian: "одобрять" },
    { english: "Remedy", russian: "исправлять" },
    { english: "Harm", russian: "вред" },
    { english: "Apprehension", russian: "опасение" },
    { english: "Comprehension", russian: "понимание" },
    { english: "Encourage", russian: "поощрять" },
    { english: "Do not disagree", russian: "не возражать" },
    { english: "Overstatement", russian: "преувеличение" },
    { english: "Understatement", russian: "преуменьшение" }
];

let words = JSON.parse(localStorage.getItem('words')) || defaultWords;

let currentIndex = 0;
const wordBox = document.getElementById('wordBox');
const translationBox = document.getElementById('translationBox');

const showWordsButton = document.getElementById('showWordsButton');
const wordListModal = document.getElementById('wordListModal');
const addWordModal = document.getElementById('addWordModal');
const wordList = document.getElementById('wordList');
const addWordIcon = document.getElementById('addWordIcon');
const closeButtons = document.querySelectorAll('.close');

const englishWordInput = document.getElementById('englishWord');
const russianWordInput = document.getElementById('russianWord');
const addWordButton = document.getElementById('addWordButton');

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

function displayWordList() {
    wordList.innerHTML = '';
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = `${word.english} - ${word.russian}`;
        wordList.appendChild(listItem);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function changeBackgroundColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

function displayWord() {
    if (currentIndex >= words.length) {
        currentIndex = 0;
        shuffle(words);
    }

    const word = words[currentIndex];
    wordBox.innerHTML = '';
    translationBox.innerHTML = '';
    translationBox.style.opacity = 0; 

    word.english.split('').forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.className = 'letter';
        letterElement.textContent = letter;
        wordBox.appendChild(letterElement);
    });

    setTimeout(() => {
        translationBox.textContent = word.russian; 
        translationBox.style.opacity = 1;
    }, 6000);

    setTimeout(() => {
        currentIndex++;
        changeBackgroundColor();
        displayWord();
    }, 12000);
}

showWordsButton.addEventListener('click', () => {
    displayWordList();
    wordListModal.style.display = 'block';
});

addWordIcon.addEventListener('click', () => {
    addWordModal.style.display = 'block';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        wordListModal.style.display = 'none';
        addWordModal.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === wordListModal) {
        wordListModal.style.display = 'none';
    } else if (event.target === addWordModal) {
        addWordModal.style.display = 'none';
    }
});

addWordButton.addEventListener('click', () => {
    const englishWord = englishWordInput.value.trim();
    const russianWord = russianWordInput.value.trim();

    if (englishWord && russianWord) {
        words.push({ english: englishWord, russian: russianWord });
        localStorage.setItem('words', JSON.stringify(words));
        englishWordInput.value = '';
        russianWordInput.value = '';
        alert('Слово добавлено!');
        displayWordList();
    } else {
        alert('Пожалуйста, введите оба слова.');
    }
});

shuffle(words);
changeBackgroundColor();
displayWord();

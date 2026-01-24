
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const resultType = document.getElementById('result-type');
const resultDescription = document.getElementById('result-description');

const questions = [
    {
        question: "주말에 당신은...",
        options: {
            a: "친구들과 밖에서 활기차게!",
            b: "집에서 조용히 휴식.",
        }
    },
    {
        question: "새로운 것을 배울 때...",
        options: {
            a: "직접 부딪히며 경험으로 배운다.",
            b: "책이나 강의를 통해 이론부터 탄탄히.",
        }
    },
    {
        question: "결정을 내릴 때 중요한 것은...",
        options: {
            a: "객관적인 사실과 데이터.",
            b: "나와 다른 사람의 감정.",
        }
    }
];

const results = {
    "aaa": { type: "열정적인 탐험가", description: "새로운 경험을 즐기며, 항상 에너지가 넘치는 당신! 직접 행동으로 옮기는 것을 좋아하며, 논리적인 사고를 바탕으로 문제를 해결합니다." },
    "aab": { type: "사려깊은 전략가", description: "활기차고 행동 지향적이지만, 다른 사람의 감정을 중요하게 생각하는군요. 당신은 뛰어난 리더가 될 자질이 충분합니다." },
    "aba": { type: "현실적인 발명가", description: "이론과 실제의 균형을 맞추는 당신! 실용적인 해결책을 찾는 데 능숙하며, 창의적인 아이디어를 현실로 만들어냅니다." },
    "abb": { type: "따뜻한 중재자", description: "지식과 감성의 조화를 이루는 당신. 주변 사람들에게 따뜻한 조언과 위로를 건네는 훌륭한 상담가입니다." },
    "baa": { type: "논리적인 사색가", description: "고요한 시간을 즐기며 깊이 생각하는 당신. 복잡한 문제도 논리적으로 풀어내는 능력이 뛰어납니다." },
    "bab": { type: "섬세한 예술가", description: "풍부한 감수성과 깊은 통찰력을 지닌 당신. 예술적인 감각이 뛰어나며, 자신만의 세계를 구축하는 것을 좋아합니다." },
    "bba": { type: "신중한 계획가", description: "이론을 바탕으로 신중하게 계획을 세우는 당신. 꼼꼼하고 체계적인 일 처리가 돋보입니다." },
    "bbb": { type: "이деа리스트 상담가", description: "깊은 공감 능력과 풍부한 상상력을 가진 당신. 다른 사람의 성장을 돕는 일에서 큰 보람을 느낍니다." }
};

let userAnswers = [];

function renderQuiz() {
    quizContainer.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        
        for (const key in q.options) {
            const option = document.createElement('div');
            option.classList.add('option');
            option.dataset.key = key;
            option.dataset.questionIndex = index;
            option.textContent = q.options[key];
            option.addEventListener('click', selectAnswer);
            optionsDiv.appendChild(option);
        }
        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

function selectAnswer(event) {
    const selectedOption = event.target;
    const questionIndex = selectedOption.dataset.questionIndex;
    const answerKey = selectedOption.dataset.key;
    
    userAnswers[questionIndex] = answerKey;

    // Highlight selected option
    const optionsForQuestion = selectedOption.parentElement.childNodes;
    optionsForQuestion.forEach(opt => opt.style.backgroundColor = 'var(--input-bg)');
    selectedOption.style.backgroundColor = 'var(--primary-color)';
    selectedOption.style.color = 'white';

    // Check if all questions are answered
    if (userAnswers.length === questions.length && !userAnswers.includes(undefined)) {
        showResult();
    }
}

function showResult() {
    const resultKey = userAnswers.join('');
    const result = results[resultKey];

    if (result) {
        resultType.textContent = result.type;
        resultDescription.textContent = result.description;
        resultContainer.style.display = 'block';
        quizContainer.style.display = 'none'; // Hide questions
    }
}

// Add theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}
themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '라이트 모드' : '다크 모드';

renderQuiz();

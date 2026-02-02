const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const introSection = document.getElementById('intro-section');
const previewSection = document.getElementById('preview-section');

// MBTI questions - 3 per dimension, 12 total
const questions = [
    // E/I questions
    {
        dimension: 'EI',
        question: "After spending time with friends, you...",
        options: {
            E: "Feel energized and more lively",
            I: "Feel the need for some alone time"
        }
    },
    {
        dimension: 'EI',
        question: "When you go to a new gathering, you...",
        options: {
            E: "Approach people first and chat with many",
            I: "Quietly observe and have deep conversations with a few"
        }
    },
    {
        dimension: 'EI',
        question: "When organizing your thoughts, you...",
        options: {
            E: "Think out loud by talking to others",
            I: "Reflect quietly on your own"
        }
    },
    // S/N questions
    {
        dimension: 'SN',
        question: "When learning something new, you...",
        options: {
            S: "Start with concrete facts and details",
            N: "Try to understand the big picture and concepts first"
        }
    },
    {
        dimension: 'SN',
        question: "At work, what matters more to you is...",
        options: {
            S: "Proven methods and practical results",
            N: "New possibilities and creative ideas"
        }
    },
    {
        dimension: 'SN',
        question: "In conversations, you...",
        options: {
            S: "Prefer concrete and realistic topics",
            N: "Enjoy abstract and theoretical topics too"
        }
    },
    // T/F questions
    {
        dimension: 'TF',
        question: "When making important decisions, you...",
        options: {
            T: "Follow logical analysis and objective criteria",
            F: "Consider people's feelings and values involved"
        }
    },
    {
        dimension: 'TF',
        question: "When a friend makes a mistake, you...",
        options: {
            T: "Honestly point out the problems",
            F: "First comfort them and show empathy"
        }
    },
    {
        dimension: 'TF',
        question: "In conflict situations, what matters more to you is...",
        options: {
            T: "Fairness and principles",
            F: "Harmony and maintaining relationships"
        }
    },
    // J/P questions
    {
        dimension: 'JP',
        question: "When traveling, your style is...",
        options: {
            J: "Plan detailed itineraries in advance",
            P: "Set a rough direction and go spontaneously"
        }
    },
    {
        dimension: 'JP',
        question: "When working on tasks with deadlines, you...",
        options: {
            J: "Get them done well ahead of time",
            P: "Get focused when the deadline approaches"
        }
    },
    {
        dimension: 'JP',
        question: "In daily life, you prefer...",
        options: {
            J: "Living according to set routines and plans",
            P: "Adapting flexibly to situations"
        }
    }
];

// 16 MBTI type information
const mbtiTypes = {
    "INTJ": {
        name: "Architect",
        emoji: "🧠",
        description: "You are a strategic thinker with original ideas and strong drive. You enjoy solving complex problems and set high standards, working systematically to achieve them. You are independent, decisive, and have a strong thirst for knowledge.",
        strengths: "Strategic thinking, Independence, Decisiveness, Intellectual ability",
        famous: "Elon Musk, Mark Zuckerberg, Christopher Nolan",
        compatibility: "Works well with ENFP, ENTP"
    },
    "INTP": {
        name: "Logician",
        emoji: "🔬",
        description: "You are an explorer who enjoys logical and analytical thinking. You love exploring complex theories and ideas and excel at finding creative solutions. You are curious and enjoy intellectual debates.",
        strengths: "Analytical skills, Creativity, Objectivity, Open-mindedness",
        famous: "Einstein, Bill Gates, Larry Page",
        compatibility: "Works well with ENTJ, ESTJ"
    },
    "ENTJ": {
        name: "Commander",
        emoji: "👑",
        description: "You are a charismatic leader with natural leadership abilities. You value efficiency and move toward goals without hesitation. You are confident, decisive, and excel at leading organizations.",
        strengths: "Leadership, Confidence, Efficiency, Decisiveness",
        famous: "Steve Jobs, Margaret Thatcher, Gordon Ramsay",
        compatibility: "Works well with INTP, ISTP"
    },
    "ENTP": {
        name: "Debater",
        emoji: "💡",
        description: "You are an innovator with witty and challenging thinking. You enjoy exploring new ideas and possibilities and love intellectual debates. You are highly adaptable and interested in diverse fields.",
        strengths: "Creativity, Wit, Adaptability, Intellectual curiosity",
        famous: "Thomas Edison, Mark Twain, Sarah Silverman",
        compatibility: "Works well with INFJ, INTJ"
    },
    "INFJ": {
        name: "Advocate",
        emoji: "🌟",
        description: "You are an idealistic and insightful counselor. You have deep empathy and intuition, wanting to help others and do meaningful work. You are quiet but hold strong convictions.",
        strengths: "Insight, Empathy, Idealism, Creativity",
        famous: "Martin Luther King Jr., Nelson Mandela, Taylor Swift",
        compatibility: "Works well with ENTP, ENFP"
    },
    "INFP": {
        name: "Mediator",
        emoji: "🦋",
        description: "You are an idealistic and emotionally sensitive dreamer. You stay true to your inner values and emotions, enjoying creative and original expression. You seek harmony and authenticity, valuing deep relationships.",
        strengths: "Creativity, Empathy, Authenticity, Idealism",
        famous: "Shakespeare, Tolkien, Audrey Hepburn",
        compatibility: "Works well with ENFJ, ENTJ"
    },
    "ENFJ": {
        name: "Protagonist",
        emoji: "🌈",
        description: "You are a warm and influential leader. You find joy in helping others grow and excel at bringing people together. You have excellent empathy and are a persuasive communicator.",
        strengths: "Leadership, Empathy, Communication, Passion",
        famous: "Obama, Oprah Winfrey, Maya Angelou",
        compatibility: "Works well with INFP, ISFP"
    },
    "ENFP": {
        name: "Campaigner",
        emoji: "🎭",
        description: "You are a passionate and creative free spirit. You are drawn to new possibilities and ideas, valuing connections with people. You are energetic, curious, and know how to enjoy life.",
        strengths: "Enthusiasm, Creativity, Sociability, Optimism",
        famous: "Robin Williams, Walt Disney, Robert Downey Jr.",
        compatibility: "Works well with INTJ, INFJ"
    },
    "ISTJ": {
        name: "Logistician",
        emoji: "📋",
        description: "You are a reliable and responsible pragmatist. You value tradition and order, completing tasks to the end. You are meticulous, systematic, and perform best in stable environments.",
        strengths: "Reliability, Responsibility, Organization, Patience",
        famous: "Warren Buffett, Angela Merkel, Natalie Portman",
        compatibility: "Works well with ESFP, ESTP"
    },
    "ISFJ": {
        name: "Defender",
        emoji: "🛡️",
        description: "You are a warm and dedicated protector. You enjoy caring for and helping others, quietly supporting from behind. You are attentive, observant, and treasure traditional values.",
        strengths: "Dedication, Caring, Reliability, Attentiveness",
        famous: "Beyoncé, Kate Middleton, Vin Diesel",
        compatibility: "Works well with ESTP, ESFP"
    },
    "ESTJ": {
        name: "Executive",
        emoji: "💼",
        description: "You are a manager who values order and efficiency. You respect rules and traditions and excel at running organizations systematically. You are highly responsible, decisive, and focused on achieving goals.",
        strengths: "Organization, Responsibility, Practicality, Leadership",
        famous: "Henry Ford, Michelle Obama, Judge Judy",
        compatibility: "Works well with ISTP, INTP"
    },
    "ESFJ": {
        name: "Consul",
        emoji: "🤝",
        description: "You are a sociable and caring collaborator. You value creating harmonious environments and respond attentively to others' needs. You are warm, friendly, and have a strong sense of community.",
        strengths: "Sociability, Caring, Cooperation, Practicality",
        famous: "Taylor Swift, Jennifer Lopez, Hugh Jackman",
        compatibility: "Works well with ISFP, ISTP"
    },
    "ISTP": {
        name: "Virtuoso",
        emoji: "🔧",
        description: "You are a practical problem-solver with skilled hands. You like understanding how things work and handle crises calmly. You are independent, flexible, and value practical skills.",
        strengths: "Problem-solving, Adaptability, Practicality, Composure",
        famous: "Clint Eastwood, Michael Jordan, Tom Cruise",
        compatibility: "Works well with ESTJ, ENTJ"
    },
    "ISFP": {
        name: "Adventurer",
        emoji: "🎨",
        description: "You are an emotional and artistic explorer. You enjoy the present moment and experience the world in your own way. You are quiet but passionate, treasuring authenticity and freedom.",
        strengths: "Artistic sense, Sensitivity, Flexibility, Kindness",
        famous: "Michael Jackson, Lady Gaga, Britney Spears",
        compatibility: "Works well with ENFJ, ESFJ"
    },
    "ESTP": {
        name: "Entrepreneur",
        emoji: "🚀",
        description: "You are an energetic and action-oriented adventurer. You enjoy the present moment and make quick, spontaneous decisions. You are sociable, witty, and know how to take calculated risks.",
        strengths: "Action-oriented, Adaptability, Sociability, Realistic",
        famous: "Donald Trump, Madonna, Eddie Murphy",
        compatibility: "Works well with ISFJ, ISTJ"
    },
    "ESFP": {
        name: "Entertainer",
        emoji: "🌺",
        description: "You are a spontaneous and energetic entertainer. You enjoy life and love sharing joy with those around you. You are sociable, fun, and live in the present moment.",
        strengths: "Sociability, Humor, Adaptability, Optimism",
        famous: "Elton John, Jamie Foxx, Marilyn Monroe",
        compatibility: "Works well with ISFJ, ISTJ"
    }
};

let userAnswers = [];
let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function renderQuiz() {
    quizContainer.innerHTML = '';

    // Progress display
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress-container');
    progressDiv.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
        </div>
        <p class="progress-text">${currentQuestion + 1} / ${questions.length} questions</p>
    `;
    quizContainer.appendChild(progressDiv);

    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question', 'fade-in');
        questionDiv.innerHTML = `<p>Q${currentQuestion + 1}. ${q.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        const optionKeys = Object.keys(q.options);

        for (const key of optionKeys) {
            const option = document.createElement('div');
            option.classList.add('option');
            option.dataset.key = key;
            option.textContent = q.options[key];
            option.addEventListener('click', selectAnswer);
            optionsDiv.appendChild(option);
        }

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    }
}

function selectAnswer(event) {
    const selectedOption = event.target;
    const answerKey = selectedOption.dataset.key;
    const dimension = questions[currentQuestion].dimension;

    scores[answerKey]++;
    userAnswers.push(answerKey);

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        renderQuiz();
    }
}

function calculateMBTI() {
    let mbtiType = '';

    mbtiType += scores.E >= scores.I ? 'E' : 'I';
    mbtiType += scores.S >= scores.N ? 'S' : 'N';
    mbtiType += scores.T >= scores.F ? 'T' : 'F';
    mbtiType += scores.J >= scores.P ? 'J' : 'P';

    return mbtiType;
}

function showResult() {
    const mbtiType = calculateMBTI();
    const result = mbtiTypes[mbtiType];

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.classList.add('fade-in');

    const dimensionLabels = {
        E: 'Extraversion', I: 'Introversion',
        S: 'Sensing', N: 'Intuition',
        T: 'Thinking', F: 'Feeling',
        J: 'Judging', P: 'Perceiving'
    };

    resultContainer.innerHTML = `
        <div class="result-emoji">${result.emoji}</div>
        <div class="result-type">${mbtiType}</div>
        <div class="result-name">${result.name}</div>

        <div class="dimension-result">
            <div class="dimension-item">
                <div class="letter">${mbtiType[0]}</div>
                <div class="label">${dimensionLabels[mbtiType[0]]}</div>
            </div>
            <div class="dimension-item">
                <div class="letter">${mbtiType[1]}</div>
                <div class="label">${dimensionLabels[mbtiType[1]]}</div>
            </div>
            <div class="dimension-item">
                <div class="letter">${mbtiType[2]}</div>
                <div class="label">${dimensionLabels[mbtiType[2]]}</div>
            </div>
            <div class="dimension-item">
                <div class="letter">${mbtiType[3]}</div>
                <div class="label">${dimensionLabels[mbtiType[3]]}</div>
            </div>
        </div>

        <div class="result-description">${result.description}</div>

        <div class="result-details">
            <div class="detail-box">
                <h4>Your Strengths</h4>
                <p>${result.strengths}</p>
            </div>
            <div class="detail-box">
                <h4>Famous People</h4>
                <p>${result.famous}</p>
            </div>
            <div class="detail-box">
                <h4>Compatible Types</h4>
                <p>${result.compatibility}</p>
            </div>
            <div class="detail-box">
                <h4>Score Breakdown</h4>
                <p>E${scores.E} vs I${scores.I} | S${scores.S} vs N${scores.N}<br>T${scores.T} vs F${scores.F} | J${scores.J} vs P${scores.P}</p>
            </div>
        </div>

        <button id="retry-btn" class="retry-button">Take Test Again</button>

        <div class="share-result">
            <p>Share your results with friends!</p>
            <div class="share-buttons">
                <button onclick="shareToTwitter('${mbtiType}')" class="share-btn twitter">Twitter</button>
                <button onclick="copyLink()" class="share-btn copy">Copy Link</button>
            </div>
        </div>
    `;

    document.getElementById('retry-btn').addEventListener('click', resetQuiz);
}

function resetQuiz() {
    userAnswers = [];
    currentQuestion = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    introSection.style.display = 'block';
    previewSection.style.display = 'block';
    quizContainer.style.display = 'none';
}

function shareToTwitter(mbtiType) {
    const text = `My MBTI is ${mbtiType}! What's yours?`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied!');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = window.location.href;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Link copied!');
    });
}

// Initialize
function init() {
    const startButton = document.getElementById('start-test-btn');

    if (startButton) {
        startButton.addEventListener('click', function() {
            introSection.style.display = 'none';
            previewSection.style.display = 'none';
            quizContainer.style.display = 'block';
            renderQuiz();
        });
    }
}

init();

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const introSection = document.getElementById('intro-section');
const previewSection = document.getElementById('preview-section');

// Enneagram questions - 2 per type, 18 total
const questions = [
    // Type 1 - Reformer
    { type: 1, question: "I always try to do things the 'right' way", options: { yes: "Very true", no: "Not really" } },
    { type: 1, question: "When I make a mistake, I criticize myself harshly", options: { yes: "True", no: "Not really" } },
    // Type 2 - Helper
    { type: 2, question: "I find great joy in helping others", options: { yes: "Very true", no: "Not really" } },
    { type: 2, question: "It's hard for me to say no to someone who needs my help", options: { yes: "True", no: "Not really" } },
    // Type 3 - Achiever
    { type: 3, question: "Success and being recognized are very important to me", options: { yes: "Very true", no: "Not really" } },
    { type: 3, question: "I work hard to achieve goals and am efficient", options: { yes: "True", no: "Not really" } },
    // Type 4 - Individualist
    { type: 4, question: "I tend to experience and express deep emotions", options: { yes: "Very true", no: "Not really" } },
    { type: 4, question: "I prefer unique and special things over ordinary ones", options: { yes: "True", no: "Not really" } },
    // Type 5 - Investigator
    { type: 5, question: "I enjoy analyzing and understanding complex problems", options: { yes: "Very true", no: "Not really" } },
    { type: 5, question: "I absolutely need alone time and personal space", options: { yes: "True", no: "Not really" } },
    // Type 6 - Loyalist
    { type: 6, question: "I tend to prepare for potential future risks", options: { yes: "Very true", no: "Not really" } },
    { type: 6, question: "I am loyal to people or organizations I can trust", options: { yes: "True", no: "Not really" } },
    // Type 7 - Enthusiast
    { type: 7, question: "I enjoy new experiences and adventures", options: { yes: "Very true", no: "Not really" } },
    { type: 7, question: "I avoid boredom and always look for fun activities", options: { yes: "True", no: "Not really" } },
    // Type 8 - Challenger
    { type: 8, question: "I tend to assert my opinions strongly", options: { yes: "Very true", no: "Not really" } },
    { type: 8, question: "I fight against injustice and try to protect the weak", options: { yes: "True", no: "Not really" } },
    // Type 9 - Peacemaker
    { type: 9, question: "I try to avoid conflict and maintain harmony", options: { yes: "Very true", no: "Not really" } },
    { type: 9, question: "I easily understand and accept others' perspectives", options: { yes: "True", no: "Not really" } }
];

// 9 Enneagram type information
const enneagramTypes = {
    1: {
        name: "The Reformer",
        subtitle: "The Perfectionist - Rational, Idealistic Type",
        emoji: "✨",
        description: "You are principled and purpose-driven. You set high standards and work to achieve them. You have a strong sense of justice and want to make the world a better place. You have excellent self-control and a strong sense of responsibility.",
        core_fear: "Fear of being corrupt or defective",
        core_desire: "To be good, right, and perfect",
        strengths: "Honesty, Responsibility, High morality, Self-discipline",
        growth: "Accept imperfection and be more tolerant with yourself and others",
        wings: ["9w1 (Idealist)", "1w2 (Advocate)"],
        stress: "Under stress, takes on negative traits of Type 4 (Individualist)",
        growth_direction: "In growth, takes on positive traits of Type 7 (Enthusiast)"
    },
    2: {
        name: "The Helper",
        subtitle: "The Caregiver - Interpersonal, Generous Type",
        emoji: "💝",
        description: "You are warm and caring. You are sensitive to others' needs and find joy in helping them. You value relationships and have a strong desire to be loved.",
        core_fear: "Fear of being unwanted or unloved",
        core_desire: "To be loved and needed",
        strengths: "Empathy, Warmth, Generosity, Kindness",
        growth: "Value your own needs too and learn to say 'no'",
        wings: ["1w2 (Advocate)", "2w3 (Host/Hostess)"],
        stress: "Under stress, takes on negative traits of Type 8 (Challenger)",
        growth_direction: "In growth, takes on positive traits of Type 4 (Individualist)"
    },
    3: {
        name: "The Achiever",
        subtitle: "The Success-Oriented - Adaptable, Ambitious Type",
        emoji: "🏆",
        description: "You are goal-oriented and efficient. You pursue success and want to prove your worth through achievements. You are confident, charming, and skilled at making good impressions.",
        core_fear: "Fear of being worthless",
        core_desire: "To be valuable and successful",
        strengths: "Drive, Adaptability, Confidence, Efficiency",
        growth: "Explore your true feelings and values beyond achievements",
        wings: ["2w3 (Host/Hostess)", "3w4 (Professional)"],
        stress: "Under stress, takes on negative traits of Type 9 (Peacemaker)",
        growth_direction: "In growth, takes on positive traits of Type 6 (Loyalist)"
    },
    4: {
        name: "The Individualist",
        subtitle: "The Artist - Sensitive, Creative Type",
        emoji: "🎨",
        description: "You have deep sensitivity and originality. You value authenticity and self-expression, preferring the special over the ordinary. You have great artistic sense and emotional depth.",
        core_fear: "Fear of having no identity or being ordinary",
        core_desire: "To be unique and significant",
        strengths: "Creativity, Deep sensitivity, Authenticity, Empathy",
        growth: "Focus on the positive aspects of the present and don't get swept away by emotions",
        wings: ["3w4 (Professional)", "4w5 (Bohemian)"],
        stress: "Under stress, takes on negative traits of Type 2 (Helper)",
        growth_direction: "In growth, takes on positive traits of Type 1 (Reformer)"
    },
    5: {
        name: "The Investigator",
        subtitle: "The Observer - Intellectual, Insightful Type",
        emoji: "🔍",
        description: "You are curious and analytical. You enjoy accumulating knowledge and understanding the world. You are independent, value alone time, and have deep insights in your areas of expertise.",
        core_fear: "Fear of being useless or incompetent",
        core_desire: "To be competent and knowledgeable",
        strengths: "Intellectual curiosity, Objectivity, Insight, Independence",
        growth: "Get out of your head and connect with the world through emotions and actions",
        wings: ["4w5 (Bohemian)", "5w6 (Problem Solver)"],
        stress: "Under stress, takes on negative traits of Type 7 (Enthusiast)",
        growth_direction: "In growth, takes on positive traits of Type 8 (Challenger)"
    },
    6: {
        name: "The Loyalist",
        subtitle: "The Security-Seeker - Committed, Responsible Type",
        emoji: "🛡️",
        description: "You are responsible and reliable. You value safety and security and are loyal to trusted relationships and organizations. You excel at anticipating and preparing for potential risks.",
        core_fear: "Fear of being left alone without support or guidance",
        core_desire: "To feel safe and supported",
        strengths: "Loyalty, Responsibility, Problem-solving, Cooperation",
        growth: "Trust your inner wisdom and let go of excessive worry",
        wings: ["5w6 (Problem Solver)", "6w7 (Buddy)"],
        stress: "Under stress, takes on negative traits of Type 3 (Achiever)",
        growth_direction: "In growth, takes on positive traits of Type 9 (Peacemaker)"
    },
    7: {
        name: "The Enthusiast",
        subtitle: "The Adventurer - Versatile, Spontaneous Type",
        emoji: "🌈",
        description: "You are optimistic and energetic. You pursue new experiences and possibilities and know how to enjoy life. You are versatile, adaptable, and have the ability to brighten those around you.",
        core_fear: "Fear of experiencing pain and deprivation",
        core_desire: "To be satisfied and fulfilled",
        strengths: "Optimism, Versatility, Creativity, Adaptability",
        growth: "Stay in the present moment and don't avoid difficult emotions",
        wings: ["6w7 (Buddy)", "7w8 (Realist)"],
        stress: "Under stress, takes on negative traits of Type 1 (Reformer)",
        growth_direction: "In growth, takes on positive traits of Type 5 (Investigator)"
    },
    8: {
        name: "The Challenger",
        subtitle: "The Leader - Strong, Assertive Type",
        emoji: "🦁",
        description: "You are confident and decisive. You move toward goals with strong will and drive, protecting the weak and pursuing justice. You are direct, honest, and have excellent leadership.",
        core_fear: "Fear of being controlled or hurt by others",
        core_desire: "To control your own destiny",
        strengths: "Leadership, Decisiveness, Protective instinct, Confidence",
        growth: "Learn that it's okay to show vulnerability and express softness",
        wings: ["7w8 (Realist)", "8w9 (Bear)"],
        stress: "Under stress, takes on negative traits of Type 5 (Investigator)",
        growth_direction: "In growth, takes on positive traits of Type 2 (Helper)"
    },
    9: {
        name: "The Peacemaker",
        subtitle: "The Mediator - Accepting, Stable Type",
        emoji: "☮️",
        description: "You are harmonious and comfortable. You avoid conflict and seek peace, understanding and accepting diverse perspectives. You have strong patience and stability, and the ability to bring people together.",
        core_fear: "Fear of separation, loss, and conflict",
        core_desire: "To maintain inner peace and harmony",
        strengths: "Peacefulness, Acceptance, Patience, Mediation",
        growth: "Express your own needs and opinions and don't avoid conflict",
        wings: ["8w9 (Bear)", "9w1 (Idealist)"],
        stress: "Under stress, takes on negative traits of Type 6 (Loyalist)",
        growth_direction: "In growth, takes on positive traits of Type 3 (Achiever)"
    }
};

let currentQuestion = 0;
let scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

function renderQuiz() {
    quizContainer.innerHTML = '';

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
        questionDiv.innerHTML = `<p>Q${currentQuestion + 1}. "${q.question}"</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        const yesOption = document.createElement('div');
        yesOption.classList.add('option');
        yesOption.dataset.answer = 'yes';
        yesOption.textContent = q.options.yes;
        yesOption.addEventListener('click', selectAnswer);

        const noOption = document.createElement('div');
        noOption.classList.add('option');
        noOption.dataset.answer = 'no';
        noOption.textContent = q.options.no;
        noOption.addEventListener('click', selectAnswer);

        optionsDiv.appendChild(yesOption);
        optionsDiv.appendChild(noOption);

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    }
}

function selectAnswer(event) {
    const answer = event.target.dataset.answer;
    const type = questions[currentQuestion].type;

    if (answer === 'yes') {
        scores[type] += 1;
    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        renderQuiz();
    }
}

function calculateType() {
    let maxScore = 0;
    let resultType = 1;

    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = parseInt(type);
        }
    }

    // Wing calculation (higher score between adjacent types)
    const prev = resultType === 1 ? 9 : resultType - 1;
    const next = resultType === 9 ? 1 : resultType + 1;
    const wing = scores[prev] >= scores[next] ? prev : next;

    return { type: resultType, wing: wing };
}

function showResult() {
    const { type, wing } = calculateType();
    const result = enneagramTypes[type];

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.classList.add('fade-in');

    resultContainer.innerHTML = `
        <div class="result-number">${type}</div>
        <div class="result-name">${result.name}</div>
        <div class="result-subtitle">${result.subtitle}</div>

        <div class="wing-info">
            <h4>Your Wing: ${type}w${wing}</h4>
            <p>You are primarily Type ${type} with Type ${wing} characteristics added.</p>
        </div>

        <div class="result-description">${result.description}</div>

        <div class="result-details">
            <div class="detail-box">
                <h4>Core Fear</h4>
                <p>${result.core_fear}</p>
            </div>
            <div class="detail-box">
                <h4>Core Desire</h4>
                <p>${result.core_desire}</p>
            </div>
            <div class="detail-box">
                <h4>Strengths</h4>
                <p>${result.strengths}</p>
            </div>
            <div class="detail-box">
                <h4>Growth Tip</h4>
                <p>${result.growth}</p>
            </div>
            <div class="detail-box">
                <h4>Stress Direction</h4>
                <p>${result.stress}</p>
            </div>
            <div class="detail-box">
                <h4>Growth Direction</h4>
                <p>${result.growth_direction}</p>
            </div>
        </div>

        <button id="retry-btn" class="retry-button">Take Test Again</button>

        <div class="share-result">
            <p>Share your results with friends!</p>
            <div class="share-buttons">
                <button onclick="shareToTwitter(${type})" class="share-btn twitter">Twitter</button>
                <button onclick="copyLink()" class="share-btn copy">Copy Link</button>
            </div>
        </div>
    `;

    document.getElementById('retry-btn').addEventListener('click', resetQuiz);
}

function resetQuiz() {
    currentQuestion = 0;
    scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

    resultContainer.style.display = 'none';
    introSection.style.display = 'block';
    previewSection.style.display = 'block';
    quizContainer.style.display = 'none';
}

function shareToTwitter(type) {
    const text = `My Enneagram type is Type ${type}! What's yours?`;
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

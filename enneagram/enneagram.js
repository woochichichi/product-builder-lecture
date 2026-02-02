const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const introSection = document.getElementById('intro-section');
const previewSection = document.getElementById('preview-section');

// 애니어그램 질문 - 각 유형당 2개씩, 총 18개
const questions = [
    // Type 1 - 개혁가
    { type: 1, question: "나는 항상 일을 '올바르게' 하려고 노력한다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 1, question: "실수를 하면 스스로를 심하게 비판하는 편이다", options: { yes: "그렇다", no: "아니다" } },
    // Type 2 - 조력자
    { type: 2, question: "다른 사람을 돕는 것에서 큰 기쁨을 느낀다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 2, question: "내 도움이 필요한 사람을 거절하기 어렵다", options: { yes: "그렇다", no: "아니다" } },
    // Type 3 - 성취자
    { type: 3, question: "성공과 인정받는 것이 나에게 매우 중요하다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 3, question: "목표를 달성하기 위해 열심히 일하며 효율적이다", options: { yes: "그렇다", no: "아니다" } },
    // Type 4 - 예술가
    { type: 4, question: "나는 깊은 감정을 경험하고 표현하는 편이다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 4, question: "평범한 것보다 독특하고 특별한 것을 추구한다", options: { yes: "그렇다", no: "아니다" } },
    // Type 5 - 탐구자
    { type: 5, question: "복잡한 문제를 분석하고 이해하는 것을 좋아한다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 5, question: "혼자만의 시간과 공간이 꼭 필요하다", options: { yes: "그렇다", no: "아니다" } },
    // Type 6 - 충성가
    { type: 6, question: "미래에 일어날 수 있는 위험에 대비하는 편이다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 6, question: "신뢰할 수 있는 사람이나 조직에 충성하는 편이다", options: { yes: "그렇다", no: "아니다" } },
    // Type 7 - 낙천가
    { type: 7, question: "새로운 경험과 모험을 즐긴다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 7, question: "지루함을 피하고 항상 즐거운 활동을 찾는다", options: { yes: "그렇다", no: "아니다" } },
    // Type 8 - 도전자
    { type: 8, question: "자신의 의견을 강하게 주장하는 편이다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 8, question: "불의에 맞서 싸우고 약자를 보호하려 한다", options: { yes: "그렇다", no: "아니다" } },
    // Type 9 - 평화주의자
    { type: 9, question: "갈등을 피하고 조화를 유지하려 한다", options: { yes: "매우 그렇다", no: "아니다" } },
    { type: 9, question: "다른 사람의 관점을 쉽게 이해하고 수용한다", options: { yes: "그렇다", no: "아니다" } }
];

// 9가지 애니어그램 유형 정보
const enneagramTypes = {
    1: {
        name: "개혁가",
        subtitle: "완벽주의자, 합리적이고 이상주의적인 유형",
        emoji: "✨",
        description: "당신은 원칙적이고 목적의식이 강한 사람입니다. 높은 기준을 세우고 그것을 달성하기 위해 노력합니다. 정의감이 강하고 세상을 더 나은 곳으로 만들고 싶어합니다. 자기 통제력이 뛰어나며 책임감이 강합니다.",
        core_fear: "부패하고 결함이 있는 것에 대한 두려움",
        core_desire: "선하고, 올바르고, 완전해지고 싶음",
        strengths: "정직함, 책임감, 높은 도덕성, 자기 절제",
        growth: "불완전함을 받아들이고, 자신과 타인에게 더 관대해지세요",
        wings: ["9w1 (이상주의자)", "1w2 (옹호자)"],
        stress: "스트레스 시 4번(예술가)의 부정적 특성이 나타남",
        growth_direction: "성장 시 7번(낙천가)의 긍정적 특성이 나타남"
    },
    2: {
        name: "조력자",
        subtitle: "돌보는 사람, 대인관계적이고 너그러운 유형",
        emoji: "💝",
        description: "당신은 따뜻하고 배려심 깊은 사람입니다. 다른 사람의 필요에 민감하게 반응하며, 도움을 주는 것에서 기쁨을 느낍니다. 관계를 소중히 여기며 사랑받고 싶은 욕구가 강합니다.",
        core_fear: "사랑받지 못하고 원치 않는 존재가 되는 것",
        core_desire: "사랑받고 필요한 존재가 되고 싶음",
        strengths: "공감능력, 따뜻함, 관대함, 친절함",
        growth: "자신의 필요도 중요하게 여기고, '아니오'라고 말하는 법을 배우세요",
        wings: ["1w2 (옹호자)", "2w3 (주인공)"],
        stress: "스트레스 시 8번(도전자)의 부정적 특성이 나타남",
        growth_direction: "성장 시 4번(예술가)의 긍정적 특성이 나타남"
    },
    3: {
        name: "성취자",
        subtitle: "성공 지향자, 적응력 있고 야심찬 유형",
        emoji: "🏆",
        description: "당신은 목표 지향적이고 효율적인 사람입니다. 성공을 추구하며 자신의 가치를 성취로 증명하려 합니다. 자신감 넘치고 매력적이며, 다른 사람에게 좋은 인상을 주는 데 능숙합니다.",
        core_fear: "가치 없는 존재가 되는 것",
        core_desire: "가치 있고 성공한 사람이 되고 싶음",
        strengths: "추진력, 적응력, 자신감, 효율성",
        growth: "성취 외에 자신의 진정한 감정과 가치를 탐구하세요",
        wings: ["2w3 (주인공)", "3w4 (전문가)"],
        stress: "스트레스 시 9번(평화주의자)의 부정적 특성이 나타남",
        growth_direction: "성장 시 6번(충성가)의 긍정적 특성이 나타남"
    },
    4: {
        name: "예술가",
        subtitle: "개인주의자, 감성적이고 창의적인 유형",
        emoji: "🎨",
        description: "당신은 깊은 감수성과 독창성을 가진 사람입니다. 진정성과 자기 표현을 중요시하며, 평범한 것보다 특별한 것을 추구합니다. 예술적 감각이 뛰어나고 감정의 깊이가 있습니다.",
        core_fear: "정체성이 없고 평범한 존재가 되는 것",
        core_desire: "독특하고 의미 있는 존재가 되고 싶음",
        strengths: "창의성, 깊은 감수성, 진정성, 공감능력",
        growth: "현재 순간의 긍정적인 면에 집중하고, 감정에 휩쓸리지 마세요",
        wings: ["3w4 (전문가)", "4w5 (보헤미안)"],
        stress: "스트레스 시 2번(조력자)의 부정적 특성이 나타남",
        growth_direction: "성장 시 1번(개혁가)의 긍정적 특성이 나타남"
    },
    5: {
        name: "탐구자",
        subtitle: "관찰자, 지적이고 통찰력 있는 유형",
        emoji: "🔍",
        description: "당신은 호기심이 많고 분석적인 사람입니다. 지식을 쌓고 세상을 이해하는 것을 즐깁니다. 독립적이고 혼자만의 시간을 소중히 여기며, 전문 분야에서 깊은 통찰력을 가집니다.",
        core_fear: "무능하고 쓸모없는 존재가 되는 것",
        core_desire: "유능하고 지식이 풍부한 존재가 되고 싶음",
        strengths: "지적 호기심, 객관성, 통찰력, 독립성",
        growth: "머리에서 벗어나 감정과 행동을 통해 세상과 연결하세요",
        wings: ["4w5 (보헤미안)", "5w6 (문제해결사)"],
        stress: "스트레스 시 7번(낙천가)의 부정적 특성이 나타남",
        growth_direction: "성장 시 8번(도전자)의 긍정적 특성이 나타남"
    },
    6: {
        name: "충성가",
        subtitle: "안전 추구자, 헌신적이고 책임감 있는 유형",
        emoji: "🛡️",
        description: "당신은 책임감 있고 신뢰할 수 있는 사람입니다. 안전과 안정을 중시하며, 신뢰할 수 있는 관계와 조직에 충성합니다. 잠재적 위험을 예측하고 대비하는 능력이 뛰어납니다.",
        core_fear: "지원과 안내 없이 혼자 남겨지는 것",
        core_desire: "안전하고 지지받는 존재가 되고 싶음",
        strengths: "충성심, 책임감, 문제해결력, 협동심",
        growth: "자신의 내면의 지혜를 믿고, 과도한 걱정을 내려놓으세요",
        wings: ["5w6 (문제해결사)", "6w7 (친구)"],
        stress: "스트레스 시 3번(성취자)의 부정적 특성이 나타남",
        growth_direction: "성장 시 9번(평화주의자)의 긍정적 특성이 나타남"
    },
    7: {
        name: "낙천가",
        subtitle: "열정가, 다재다능하고 자발적인 유형",
        emoji: "🌈",
        description: "당신은 낙관적이고 에너지가 넘치는 사람입니다. 새로운 경험과 가능성을 추구하며, 삶을 즐기는 법을 압니다. 다재다능하고 적응력이 뛰어나며, 주변을 밝게 만드는 능력이 있습니다.",
        core_fear: "고통과 박탈을 경험하는 것",
        core_desire: "만족하고 충족된 존재가 되고 싶음",
        strengths: "낙관주의, 다재다능, 창의성, 적응력",
        growth: "현재 순간에 머물고, 어려운 감정도 피하지 말고 경험하세요",
        wings: ["6w7 (친구)", "7w8 (현실주의자)"],
        stress: "스트레스 시 1번(개혁가)의 부정적 특성이 나타남",
        growth_direction: "성장 시 5번(탐구자)의 긍정적 특성이 나타남"
    },
    8: {
        name: "도전자",
        subtitle: "지도자, 강인하고 자기 주장적인 유형",
        emoji: "🦁",
        description: "당신은 자신감 있고 결단력 있는 사람입니다. 강한 의지와 추진력으로 목표를 향해 나아가며, 약자를 보호하고 정의를 추구합니다. 직접적이고 솔직하며, 리더십이 뛰어납니다.",
        core_fear: "타인에게 통제당하거나 상처받는 것",
        core_desire: "자신의 운명을 스스로 통제하고 싶음",
        strengths: "리더십, 결단력, 보호본능, 자신감",
        growth: "취약함을 보여도 괜찮다는 것을 배우고, 부드러움을 표현하세요",
        wings: ["7w8 (현실주의자)", "8w9 (곰)"],
        stress: "스트레스 시 5번(탐구자)의 부정적 특성이 나타남",
        growth_direction: "성장 시 2번(조력자)의 긍정적 특성이 나타남"
    },
    9: {
        name: "평화주의자",
        subtitle: "조정자, 수용적이고 안정적인 유형",
        emoji: "☮️",
        description: "당신은 조화롭고 편안한 사람입니다. 갈등을 피하고 평화를 추구하며, 다양한 관점을 이해하고 수용합니다. 인내심이 강하고 안정적이며, 사람들을 하나로 모으는 능력이 있습니다.",
        core_fear: "분리와 상실, 갈등을 경험하는 것",
        core_desire: "내적 평화와 조화를 유지하고 싶음",
        strengths: "평화로움, 수용력, 인내심, 조정능력",
        growth: "자신의 욕구와 의견을 표현하고, 갈등을 피하지 마세요",
        wings: ["8w9 (곰)", "9w1 (이상주의자)"],
        stress: "스트레스 시 6번(충성가)의 부정적 특성이 나타남",
        growth_direction: "성장 시 3번(성취자)의 긍정적 특성이 나타남"
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
        <p class="progress-text">${currentQuestion + 1} / ${questions.length} 질문</p>
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

    // 날개 계산 (인접 유형 중 점수가 높은 쪽)
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
            <h4>당신의 날개: ${type}w${wing}</h4>
            <p>주 유형 ${type}번에 ${wing}번의 특성이 더해진 유형입니다.</p>
        </div>

        <div class="result-description">${result.description}</div>

        <div class="result-details">
            <div class="detail-box">
                <h4>핵심 두려움</h4>
                <p>${result.core_fear}</p>
            </div>
            <div class="detail-box">
                <h4>핵심 욕구</h4>
                <p>${result.core_desire}</p>
            </div>
            <div class="detail-box">
                <h4>강점</h4>
                <p>${result.strengths}</p>
            </div>
            <div class="detail-box">
                <h4>성장 방향</h4>
                <p>${result.growth}</p>
            </div>
            <div class="detail-box">
                <h4>스트레스 방향</h4>
                <p>${result.stress}</p>
            </div>
            <div class="detail-box">
                <h4>성장 방향</h4>
                <p>${result.growth_direction}</p>
            </div>
        </div>

        <button id="retry-btn" class="retry-button">다시 테스트하기</button>

        <div class="share-result">
            <p>결과를 친구들과 공유해보세요!</p>
            <div class="share-buttons">
                <button onclick="shareToKakao()" class="share-btn kakao">카카오톡</button>
                <button onclick="copyLink()" class="share-btn copy">링크 복사</button>
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

function shareToKakao() {
    copyLink();
    alert('링크가 복사되었습니다! 카카오톡에 붙여넣기 해주세요.');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 복사되었습니다!');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = window.location.href;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('링크가 복사되었습니다!');
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

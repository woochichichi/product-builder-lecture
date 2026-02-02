const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const introSection = document.getElementById('intro-section');
const previewSection = document.getElementById('preview-section');

// MBTI 질문 - 각 차원당 3개씩, 총 12개
const questions = [
    // E/I 질문들
    {
        dimension: 'EI',
        question: "친구들과 시간을 보낸 후 당신은...",
        options: {
            E: "에너지가 충전되고 더 활기차진다",
            I: "혼자만의 시간이 필요하다고 느낀다"
        }
    },
    {
        dimension: 'EI',
        question: "새로운 모임에 갔을 때 당신은...",
        options: {
            E: "먼저 다가가서 여러 사람과 대화를 나눈다",
            I: "조용히 관찰하다가 관심 가는 사람과 깊은 대화를 한다"
        }
    },
    {
        dimension: 'EI',
        question: "생각을 정리할 때 당신은...",
        options: {
            E: "다른 사람과 이야기하면서 정리한다",
            I: "혼자 조용히 생각하면서 정리한다"
        }
    },
    // S/N 질문들
    {
        dimension: 'SN',
        question: "새로운 것을 배울 때 당신은...",
        options: {
            S: "구체적인 사실과 세부사항부터 파악한다",
            N: "전체적인 그림과 개념부터 이해하려 한다"
        }
    },
    {
        dimension: 'SN',
        question: "일을 할 때 당신이 더 중요하게 여기는 것은...",
        options: {
            S: "검증된 방법과 실질적인 결과",
            N: "새로운 가능성과 창의적인 아이디어"
        }
    },
    {
        dimension: 'SN',
        question: "대화할 때 당신은...",
        options: {
            S: "구체적이고 현실적인 주제를 선호한다",
            N: "추상적이고 이론적인 주제도 즐긴다"
        }
    },
    // T/F 질문들
    {
        dimension: 'TF',
        question: "중요한 결정을 내릴 때 당신은...",
        options: {
            T: "논리적 분석과 객관적 기준을 따른다",
            F: "관련된 사람들의 감정과 가치를 고려한다"
        }
    },
    {
        dimension: 'TF',
        question: "친구가 실수했을 때 당신은...",
        options: {
            T: "솔직하게 문제점을 지적해준다",
            F: "먼저 감정을 위로하고 공감해준다"
        }
    },
    {
        dimension: 'TF',
        question: "갈등 상황에서 당신이 더 중요하게 여기는 것은...",
        options: {
            T: "공정함과 원칙",
            F: "조화와 관계 유지"
        }
    },
    // J/P 질문들
    {
        dimension: 'JP',
        question: "여행을 갈 때 당신의 스타일은...",
        options: {
            J: "미리 세부 일정을 계획하고 준비한다",
            P: "대략적인 방향만 정하고 즉흥적으로 움직인다"
        }
    },
    {
        dimension: 'JP',
        question: "마감이 있는 과제를 할 때 당신은...",
        options: {
            J: "여유 있게 미리미리 해둔다",
            P: "마감이 다가와야 집중력이 생긴다"
        }
    },
    {
        dimension: 'JP',
        question: "일상에서 당신이 선호하는 방식은...",
        options: {
            J: "정해진 루틴과 계획대로 생활하는 것",
            P: "상황에 따라 유연하게 대처하는 것"
        }
    }
];

// 16가지 MBTI 유형 정보
const mbtiTypes = {
    "INTJ": {
        name: "전략가",
        emoji: "🧠",
        description: "독창적인 사고와 강한 추진력을 가진 전략가입니다. 복잡한 문제를 해결하는 것을 즐기며, 높은 기준을 세우고 이를 달성하기 위해 체계적으로 노력합니다. 독립적이고 결단력 있으며, 지식에 대한 갈증이 강합니다.",
        strengths: "전략적 사고, 독립성, 결단력, 지적 능력",
        famous: "일론 머스크, 마크 저커버그, 크리스토퍼 놀란",
        compatibility: "ENFP, ENTP와 잘 맞음"
    },
    "INTP": {
        name: "논리술사",
        emoji: "🔬",
        description: "논리적이고 분석적인 사고를 즐기는 탐구자입니다. 복잡한 이론과 아이디어를 탐구하는 것을 좋아하며, 창의적인 해결책을 찾는 데 뛰어납니다. 호기심이 많고 지적 토론을 즐깁니다.",
        strengths: "분석력, 창의성, 객관성, 개방적 사고",
        famous: "아인슈타인, 빌 게이츠, 래리 페이지",
        compatibility: "ENTJ, ESTJ와 잘 맞음"
    },
    "ENTJ": {
        name: "통솔자",
        emoji: "👑",
        description: "타고난 리더십을 가진 카리스마 있는 지휘관입니다. 효율성을 중시하고 목표를 향해 거침없이 나아갑니다. 자신감 넘치고 결단력 있으며, 조직을 이끄는 능력이 탁월합니다.",
        strengths: "리더십, 자신감, 효율성, 결단력",
        famous: "스티브 잡스, 마가렛 대처, 고든 램지",
        compatibility: "INTP, ISTP와 잘 맞음"
    },
    "ENTP": {
        name: "변론가",
        emoji: "💡",
        description: "재치 있고 도전적인 사고를 가진 혁신가입니다. 새로운 아이디어와 가능성을 탐구하는 것을 즐기며, 지적 토론을 좋아합니다. 적응력이 뛰어나고 다양한 분야에 관심을 가집니다.",
        strengths: "창의성, 재치, 적응력, 지적 호기심",
        famous: "토마스 에디슨, 마크 트웨인, 세라 실버만",
        compatibility: "INFJ, INTJ와 잘 맞음"
    },
    "INFJ": {
        name: "옹호자",
        emoji: "🌟",
        description: "이상주의적이고 통찰력 있는 조언자입니다. 깊은 공감 능력과 직관력을 가지고 있으며, 다른 사람을 돕고 의미 있는 일을 하고자 합니다. 조용하지만 강한 신념을 가지고 있습니다.",
        strengths: "통찰력, 공감능력, 이상주의, 창의성",
        famous: "마틴 루터 킹, 넬슨 만델라, 테일러 스위프트",
        compatibility: "ENTP, ENFP와 잘 맞음"
    },
    "INFP": {
        name: "중재자",
        emoji: "🦋",
        description: "이상적이고 감수성 풍부한 몽상가입니다. 내면의 가치와 감정에 충실하며, 창의적이고 독창적인 표현을 즐깁니다. 조화와 진정성을 추구하며, 깊은 관계를 소중히 여깁니다.",
        strengths: "창의성, 공감능력, 진정성, 이상주의",
        famous: "셰익스피어, 톨킨, 오드리 헵번",
        compatibility: "ENFJ, ENTJ와 잘 맞음"
    },
    "ENFJ": {
        name: "선도자",
        emoji: "🌈",
        description: "따뜻하고 영향력 있는 리더입니다. 다른 사람의 성장을 돕는 것에서 기쁨을 느끼며, 사람들을 하나로 모으는 능력이 탁월합니다. 공감 능력이 뛰어나고 설득력 있는 커뮤니케이터입니다.",
        strengths: "리더십, 공감능력, 의사소통, 열정",
        famous: "오바마, 오프라 윈프리, 마야 안젤루",
        compatibility: "INFP, ISFP와 잘 맞음"
    },
    "ENFP": {
        name: "활동가",
        emoji: "🎭",
        description: "열정적이고 창의적인 자유로운 영혼입니다. 새로운 가능성과 아이디어에 끌리며, 사람들과의 연결을 소중히 여깁니다. 에너지가 넘치고 호기심이 많으며, 삶을 즐기는 법을 압니다.",
        strengths: "열정, 창의성, 사교성, 낙관주의",
        famous: "로빈 윌리엄스, 월트 디즈니, 로버트 다우니 주니어",
        compatibility: "INTJ, INFJ와 잘 맞음"
    },
    "ISTJ": {
        name: "현실주의자",
        emoji: "📋",
        description: "신뢰할 수 있고 책임감 있는 실용주의자입니다. 전통과 질서를 중시하며, 맡은 일을 끝까지 완수합니다. 꼼꼼하고 체계적이며, 안정적인 환경에서 최고의 능력을 발휘합니다.",
        strengths: "신뢰성, 책임감, 체계성, 인내심",
        famous: "워렌 버핏, 앤젤라 메르켈, 나탈리 포트만",
        compatibility: "ESFP, ESTP와 잘 맞음"
    },
    "ISFJ": {
        name: "수호자",
        emoji: "🛡️",
        description: "따뜻하고 헌신적인 보호자입니다. 다른 사람을 돌보고 돕는 것을 즐기며, 조용히 뒤에서 지원하는 역할을 합니다. 세심하고 관찰력이 뛰어나며, 전통적 가치를 소중히 여깁니다.",
        strengths: "헌신, 배려, 신뢰성, 세심함",
        famous: "비욘세, 케이트 미들턴, 빈 디젤",
        compatibility: "ESTP, ESFP와 잘 맞음"
    },
    "ESTJ": {
        name: "경영자",
        emoji: "💼",
        description: "질서와 효율을 중시하는 관리자입니다. 규칙과 전통을 존중하며, 조직을 체계적으로 운영하는 능력이 뛰어납니다. 책임감이 강하고 결단력 있으며, 목표 달성에 집중합니다.",
        strengths: "조직력, 책임감, 실용성, 리더십",
        famous: "헨리 포드, 미셸 오바마, 판사 주디",
        compatibility: "ISTP, INTP와 잘 맞음"
    },
    "ESFJ": {
        name: "집정관",
        emoji: "🤝",
        description: "사교적이고 배려 깊은 협력자입니다. 조화로운 환경을 만드는 것을 중요시하며, 다른 사람의 필요에 세심하게 반응합니다. 따뜻하고 친절하며, 공동체 의식이 강합니다.",
        strengths: "사교성, 배려심, 협동심, 실용성",
        famous: "테일러 스위프트, 제니퍼 로페즈, 휴 잭맨",
        compatibility: "ISFP, ISTP와 잘 맞음"
    },
    "ISTP": {
        name: "장인",
        emoji: "🔧",
        description: "실용적이고 손재주가 뛰어난 문제 해결사입니다. 사물이 어떻게 작동하는지 이해하는 것을 좋아하며, 위기 상황에서 침착하게 대처합니다. 독립적이고 유연하며, 실제적인 기술을 중시합니다.",
        strengths: "문제해결력, 적응력, 실용성, 침착함",
        famous: "클린트 이스트우드, 마이클 조던, 톰 크루즈",
        compatibility: "ESTJ, ENTJ와 잘 맞음"
    },
    "ISFP": {
        name: "모험가",
        emoji: "🎨",
        description: "감성적이고 예술적인 탐험가입니다. 현재 순간을 즐기며, 자신만의 방식으로 세상을 경험합니다. 조용하지만 열정적이며, 진정성과 자유를 소중히 여깁니다.",
        strengths: "예술적 감각, 감수성, 유연성, 친절함",
        famous: "마이클 잭슨, 레이디 가가, 브리트니 스피어스",
        compatibility: "ENFJ, ESFJ와 잘 맞음"
    },
    "ESTP": {
        name: "사업가",
        emoji: "🚀",
        description: "에너지 넘치고 행동 지향적인 모험가입니다. 현재 순간을 즐기며 즉흥적인 결정을 잘 내립니다. 사교적이고 재치 있으며, 도전을 즐기고 위험을 감수할 줄 압니다.",
        strengths: "행동력, 적응력, 사교성, 현실감각",
        famous: "도널드 트럼프, 마돈나, 에디 머피",
        compatibility: "ISFJ, ISTJ와 잘 맞음"
    },
    "ESFP": {
        name: "연예인",
        emoji: "🌺",
        description: "즉흥적이고 에너지 넘치는 엔터테이너입니다. 삶을 즐기고 주변 사람들과 기쁨을 나누는 것을 좋아합니다. 사교적이고 재미있으며, 현재의 순간에 충실합니다.",
        strengths: "사교성, 유머감각, 적응력, 낙관주의",
        famous: "엘튼 존, 제이미 폭스, 마릴린 먼로",
        compatibility: "ISFJ, ISTJ와 잘 맞음"
    }
};

let userAnswers = [];
let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function renderQuiz() {
    quizContainer.innerHTML = '';

    // 진행률 표시
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
        questionDiv.innerHTML = `<p>Q${currentQuestion + 1}. ${q.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        // 옵션 순서를 랜덤하게 (편향 방지)
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

    // 점수 계산
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
        E: '외향', I: '내향',
        S: '감각', N: '직관',
        T: '사고', F: '감정',
        J: '판단', P: '인식'
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
                <h4>당신의 강점</h4>
                <p>${result.strengths}</p>
            </div>
            <div class="detail-box">
                <h4>유명인</h4>
                <p>${result.famous}</p>
            </div>
            <div class="detail-box">
                <h4>궁합이 좋은 유형</h4>
                <p>${result.compatibility}</p>
            </div>
            <div class="detail-box">
                <h4>성향 점수</h4>
                <p>E${scores.E} vs I${scores.I} | S${scores.S} vs N${scores.N}<br>T${scores.T} vs F${scores.F} | J${scores.J} vs P${scores.P}</p>
            </div>
        </div>

        <button id="retry-btn" class="retry-button">다시 테스트하기</button>

        <div class="share-result">
            <p>결과를 친구들과 공유해보세요!</p>
            <div class="share-buttons">
                <button onclick="shareToKakao()" class="share-btn kakao">카카오톡</button>
                <button onclick="shareToTwitter('${mbtiType}')" class="share-btn twitter">트위터</button>
                <button onclick="copyLink()" class="share-btn copy">링크 복사</button>
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

function shareToKakao() {
    copyLink();
    alert('링크가 복사되었습니다! 카카오톡에 붙여넣기 해주세요.');
}

function shareToTwitter(mbtiType) {
    const text = `나의 MBTI는 ${mbtiType}! 당신의 MBTI는?`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
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

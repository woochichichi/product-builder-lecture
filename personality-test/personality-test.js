
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const resultType = document.getElementById('result-type');
const resultDescription = document.getElementById('result-description');

const questions = [
    {
        question: "주말에 당신은 주로...",
        options: {
            a: "친구들과 밖에서 활기차게 시간을 보낸다",
            b: "집에서 조용히 나만의 시간을 즐긴다"
        }
    },
    {
        question: "새로운 것을 배울 때 당신은...",
        options: {
            a: "직접 부딪히며 경험으로 배운다",
            b: "책이나 강의를 통해 이론부터 탄탄히 쌓는다"
        }
    },
    {
        question: "결정을 내릴 때 가장 중요하게 생각하는 것은...",
        options: {
            a: "객관적인 사실과 데이터",
            b: "나와 관련된 사람들의 감정"
        }
    },
    {
        question: "친구가 고민을 털어놓을 때 당신은...",
        options: {
            a: "해결책을 제시하며 조언한다",
            b: "먼저 공감하고 들어준다"
        }
    },
    {
        question: "여행을 갈 때 당신의 스타일은...",
        options: {
            a: "즉흥적으로, 그때그때 정한다",
            b: "미리 계획을 세우고 체계적으로 움직인다"
        }
    },
    {
        question: "모임에서 당신은 보통...",
        options: {
            a: "새로운 사람들과 대화를 즐긴다",
            b: "이미 아는 사람들과 깊은 대화를 나눈다"
        }
    },
    {
        question: "스트레스를 받을 때 당신은...",
        options: {
            a: "운동이나 활동으로 해소한다",
            b: "혼자만의 시간으로 충전한다"
        }
    },
    {
        question: "업무나 과제를 할 때 당신은...",
        options: {
            a: "마감 직전에 집중력이 높아진다",
            b: "여유 있게 미리미리 처리한다"
        }
    },
    {
        question: "팀 프로젝트에서 당신의 역할은...",
        options: {
            a: "아이디어를 내고 분위기를 이끈다",
            b: "꼼꼼하게 정리하고 실행한다"
        }
    },
    {
        question: "갈등 상황에서 당신은...",
        options: {
            a: "직접적으로 문제를 해결하려 한다",
            b: "분위기를 살피며 조화를 추구한다"
        }
    },
    {
        question: "새로운 사람을 만났을 때...",
        options: {
            a: "먼저 말을 건네고 친해지려 한다",
            b: "상대가 먼저 다가올 때까지 기다린다"
        }
    },
    {
        question: "인생에서 더 중요한 것은...",
        options: {
            a: "성공과 성취",
            b: "행복과 만족"
        }
    }
];

const results = {
    // 외향(E) + 경험(S) + 사고(T) + 판단(J) 조합
    "aaaaaaaaaaaa": {
        type: "카리스마 넘치는 지휘관",
        emoji: "👑",
        description: "당신은 타고난 리더입니다! 강한 의지와 결단력으로 목표를 향해 거침없이 나아가며, 주변 사람들을 이끄는 능력이 탁월합니다. 논리적인 사고와 체계적인 계획으로 어떤 상황에서도 최선의 결과를 만들어냅니다.",
        strengths: "리더십, 결단력, 논리적 사고, 목표 지향적",
        advice: "때로는 다른 사람의 감정에도 귀 기울여 보세요. 당신의 결단력에 따뜻함이 더해지면 더욱 훌륭한 리더가 될 수 있습니다."
    },
    "bbbbbbbbbbbb": {
        type: "깊은 통찰의 몽상가",
        emoji: "🌙",
        description: "당신은 내면의 세계가 풍요로운 사람입니다. 깊은 사색과 풍부한 감수성으로 세상을 바라보며, 독창적인 아이디어와 예술적 감각이 뛰어납니다. 진정한 가치를 추구하며 의미 있는 삶을 살아갑니다.",
        strengths: "창의성, 공감 능력, 깊은 통찰력, 예술적 감각",
        advice: "때로는 생각을 행동으로 옮기는 것도 중요합니다. 당신의 훌륭한 아이디어를 세상과 나누어 보세요."
    },
    "aabbbbbbbbbb": {
        type: "따뜻한 조력자",
        emoji: "🤗",
        description: "당신은 다른 사람을 돕는 것에서 기쁨을 찾는 사람입니다. 뛰어난 공감 능력과 따뜻한 마음으로 주변 사람들에게 힘이 되어주며, 조화로운 관계를 만들어가는 능력이 탁월합니다.",
        strengths: "공감 능력, 배려심, 조화로운 관계 구축, 신뢰감",
        advice: "다른 사람을 돌보는 것도 좋지만, 자신을 위한 시간도 꼭 가져보세요."
    },
    "bbaaaaaaaabb": {
        type: "논리적인 분석가",
        emoji: "🔬",
        description: "당신은 복잡한 문제를 논리적으로 분석하는 능력이 뛰어납니다. 객관적인 시각으로 상황을 파악하고, 효율적인 해결책을 찾아내는 데 탁월합니다. 지식에 대한 끊임없는 갈증이 있습니다.",
        strengths: "분석력, 논리적 사고, 문제 해결 능력, 객관성",
        advice: "논리도 중요하지만, 가끔은 직감을 믿어보는 것도 좋습니다."
    },
    "ababababab": {
        type: "열정적인 탐험가",
        emoji: "🌟",
        description: "당신은 새로운 경험과 도전을 즐기는 모험가입니다! 호기심이 많고 에너지가 넘치며, 다양한 분야에 관심을 가지고 있습니다. 유연한 사고로 변화에 잘 적응합니다.",
        strengths: "호기심, 적응력, 열정, 다재다능함",
        advice: "시작한 일을 끝까지 마무리하는 습관을 들여보세요. 당신의 열정이 더 큰 결과를 만들어낼 거예요."
    },
    "bababababab": {
        type: "신중한 계획가",
        emoji: "📋",
        description: "당신은 꼼꼼하고 체계적인 사람입니다. 계획을 세우고 차근차근 실행하는 것을 좋아하며, 신뢰할 수 있는 사람으로 인정받습니다. 안정적인 환경에서 최고의 능력을 발휘합니다.",
        strengths: "계획성, 신뢰성, 꼼꼼함, 인내심",
        advice: "가끔은 계획에 없는 즉흥적인 모험도 즐겨보세요. 새로운 발견이 있을 거예요."
    },
    "aabbaabbaa": {
        type: "사교적인 활동가",
        emoji: "🎉",
        description: "당신은 사람들과 어울리는 것을 좋아하는 에너지 넘치는 사람입니다! 긍정적인 에너지로 주변을 밝게 만들며, 다양한 활동에 적극적으로 참여합니다.",
        strengths: "사교성, 긍정적 에너지, 활발함, 친화력",
        advice: "혼자만의 시간도 중요해요. 때로는 내면을 돌아보는 시간을 가져보세요."
    },
    "bbaabbaabb": {
        type: "섬세한 예술가",
        emoji: "🎨",
        description: "당신은 풍부한 감수성과 창의력을 가진 사람입니다. 아름다움을 추구하고 독창적인 표현을 즐기며, 예술적인 감각이 뛰어납니다. 깊은 내면의 세계를 가지고 있습니다.",
        strengths: "창의성, 예술적 감각, 감수성, 독창성",
        advice: "당신의 재능을 세상과 더 많이 나눠보세요. 많은 사람들이 감동받을 거예요."
    }
};

// 결과 키 생성 함수 (답변 패턴에 따라 가장 적합한 결과 찾기)
function getResultKey(answers) {
    const answerString = answers.join('');

    // 정확히 일치하는 결과가 있으면 반환
    if (results[answerString]) {
        return answerString;
    }

    // 패턴 분석으로 적합한 결과 찾기
    const aCount = answers.filter(a => a === 'a').length;
    const bCount = answers.filter(a => a === 'b').length;

    // 외향/내향 관련 질문 (1, 6, 7, 11번 - 인덱스 0, 5, 6, 10)
    const extrovertScore = [0, 5, 6, 10].reduce((sum, i) => sum + (answers[i] === 'a' ? 1 : 0), 0);
    // 사고/감정 관련 질문 (3, 4, 10번 - 인덱스 2, 3, 9)
    const thinkingScore = [2, 3, 9].reduce((sum, i) => sum + (answers[i] === 'a' ? 1 : 0), 0);
    // 계획/즉흥 관련 질문 (5, 8번 - 인덱스 4, 7)
    const judgingScore = [4, 7].reduce((sum, i) => sum + (answers[i] === 'b' ? 1 : 0), 0);

    // 성향 조합에 따른 결과 매칭
    if (extrovertScore >= 3 && thinkingScore >= 2 && judgingScore >= 1) {
        return "aaaaaaaaaaaa"; // 지휘관
    } else if (extrovertScore <= 1 && thinkingScore <= 1) {
        return "bbbbbbbbbbbb"; // 몽상가
    } else if (extrovertScore >= 2 && thinkingScore <= 1) {
        return "aabbbbbbbbbb"; // 조력자
    } else if (extrovertScore <= 1 && thinkingScore >= 2) {
        return "bbaaaaaaaabb"; // 분석가
    } else if (aCount >= 8) {
        return "ababababab"; // 탐험가
    } else if (bCount >= 8) {
        return "bababababab"; // 계획가
    } else if (extrovertScore >= 3) {
        return "aabbaabbaa"; // 활동가
    } else {
        return "bbaabbaabb"; // 예술가
    }
}

let userAnswers = [];
let currentQuestion = 0;

function renderQuiz() {
    quizContainer.innerHTML = '';

    // 진행률 표시
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress-container');
    progressDiv.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
        </div>
        <p class="progress-text">${currentQuestion} / ${questions.length} 질문</p>
    `;
    quizContainer.appendChild(progressDiv);

    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question', 'fade-in');
        questionDiv.innerHTML = `<p>Q${currentQuestion + 1}. ${q.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        for (const key in q.options) {
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

    userAnswers[currentQuestion] = answerKey;
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        renderQuiz();
    }
}

function showResult() {
    const resultKey = getResultKey(userAnswers);
    const result = results[resultKey];

    if (result) {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.classList.add('fade-in');

        resultContainer.innerHTML = `
            <h2>당신의 성향 분석 결과</h2>
            <div class="result-emoji">${result.emoji}</div>
            <h3 id="result-type">${result.type}</h3>
            <p id="result-description">${result.description}</p>
            <div class="result-details">
                <div class="detail-box">
                    <h4>당신의 강점</h4>
                    <p>${result.strengths}</p>
                </div>
                <div class="detail-box">
                    <h4>성장을 위한 조언</h4>
                    <p>${result.advice}</p>
                </div>
            </div>
            <button id="retry-btn" class="retry-button">다시 테스트하기</button>
            <div class="share-result">
                <p>결과를 친구들과 공유해보세요!</p>
                <div class="share-buttons">
                    <button onclick="shareToTwitter()" class="share-btn twitter">Twitter</button>
                    <button onclick="shareToFacebook()" class="share-btn facebook">Facebook</button>
                    <button onclick="copyLink()" class="share-btn copy">링크 복사</button>
                </div>
            </div>
        `;

        document.getElementById('retry-btn').addEventListener('click', resetQuiz);
    }
}

function resetQuiz() {
    userAnswers = [];
    currentQuestion = 0;
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    renderQuiz();
}

function shareToTwitter() {
    const text = `나의 성격 테스트 결과를 확인해보세요! 🎯`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareToFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 복사되었습니다!');
    });
}

renderQuiz();

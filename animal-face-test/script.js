
const URL = "https://teachablemachine.withgoogle.com/models/tv_f0xvlL/";

let model, labelContainer, maxPredictions;

const imageUpload = document.getElementById("image-upload");
const imagePreview = document.getElementById("image-preview");
const analyzeBtn = document.getElementById("analyze-btn");

imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
            analyzeBtn.style.display = "inline-block";
        };
        reader.readAsDataURL(file);
    }
});

analyzeBtn.addEventListener("click", () => predict());

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ''; // Clear previous results
    for (let i = 0; i < maxPredictions; i++) {
        const resultBar = document.createElement("div");
        resultBar.classList.add("result-bar");

        const resultLabel = document.createElement("div");
        resultLabel.classList.add("result-label");
        
        const progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-bar-container");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        progressBarContainer.appendChild(progressBar);
        resultBar.appendChild(resultLabel);
        resultBar.appendChild(progressBarContainer);
        labelContainer.appendChild(resultBar);
    }
}

async function predict() {
    const prediction = await model.predict(imagePreview);
    for (let i = 0; i < maxPredictions; i++) {
        const probability = prediction[i].probability;
        const className = prediction[i].className;
        const progressBar = labelContainer.childNodes[i].querySelector('.progress-bar');
        const resultLabel = labelContainer.childNodes[i].querySelector('.result-label');
        
        let translatedName = className;
        if (className === "Dog") {
            translatedName = "강아지상";
        } else if (className === "Cat") {
            translatedName = "고양이상";
        }

        resultLabel.innerHTML = translatedName;
        progressBar.style.width = Math.round(probability * 100) + "%";
        progressBar.innerHTML = Math.round(probability * 100) + "%";
    }
}

init();

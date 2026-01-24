
const URL = "https://teachablemachine.withgoogle.com/models/tv_f0xvlL/";

let model, webcam, labelContainer, maxPredictions;

const startBtn = document.getElementById("start-btn");
const predictBtn = document.getElementById("predict-btn");

startBtn.addEventListener("click", init);
predictBtn.addEventListener("click", predict);

async function init() {
    startBtn.style.display = "none";
    predictBtn.style.display = "inline-block";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true; 
    webcam = new tmImage.Webcam(300, 300, flip); 
    await webcam.setup(); 
    await webcam.play();
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

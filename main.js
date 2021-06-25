var prediction1, prediction2 ;
Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+ data_uri + '">';
    })
}

console.log("ml5 version ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sw37HO6/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
   synth = window.speechSynthesis;
   speak_data1 = "The first prediction is " + prediction1;
   speak_data2 = "The second prediction is " + prediction2;
   utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
   synth.speak(utter_this);
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion").innerHTML = results[0].label;
        document.getElementById("result_emotion2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
    
}}
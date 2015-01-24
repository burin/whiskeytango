(function(){
  var recognition = new webkitSpeechRecognition();
  var recognizing = false;

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function() {
    recognizing = true;
  };

  recognizing.onend = function() {
    recognizing = false;
  };
  recognition.onresult = function(event) {
    console.log(event);
    var whatEl = document.getElementById('what');
    whatEl.innerHTML = event.results[0][0].transcript;
  };

  var toggleRecognition = function() {
    if (recognizing === false) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  var toggleRecognitionButton = document.getElementById('toggle-recognition');

  toggleRecognitionButton.addEventListener('click', toggleRecognition);

})();

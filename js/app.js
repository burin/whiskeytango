(function(){
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = function(event) {
    console.log(event);
    var whatEl = document.getElementById('what');
    whatEl.innerHTML = event.results[0][0].transcript;
  };
  recognition.start();
})();

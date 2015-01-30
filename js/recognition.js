var Recognition = function() {
  this.recognition = new webkitSpeechRecognition();
  this.recognition.continuous = true;
  this.recognition.interimResults = true;

  return this.recognition;
};

module.exports = Recognition;

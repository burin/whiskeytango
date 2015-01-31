var EventEmitter = require('../node_modules/eventemitter/index.js').EventEmitter;

var WhiskeyTango = function(options) {
  this.recognition = options.recognition;
  this.letterMap = options.letterMap;
};

WhiskeyTango.prototype = Object.create( EventEmitter.prototype );

WhiskeyTango.prototype.constructor = WhiskeyTango;

WhiskeyTango.prototype._outputSpeechResult = function(result) {
  this.emit('result', result);
};

WhiskeyTango.prototype._getRandomLetter = function() {
  var keys = Object.keys(this.letterMap);
  return keys[ keys.length * Math.random() << 0];
};

WhiskeyTango.prototype._displayLetter = function(letter) {
  this.emit('letter', letter);
};

WhiskeyTango.prototype._win = function(letter, letterString) {
  if (this.onWin) {
    this.onWin.apply(this, [letter, letterString]);
  }
};

WhiskeyTango.prototype.guessLetter = function(letterString, guess) {
  return !!guess.toLowerCase().match(letterString);
};

WhiskeyTango.prototype.startSpeechRecognitionFor = function(options) {
  var self = this;
  var _won = false;

  this.recognition.onresult = function(event) {
    console.log(event);
    var transcript;
    for (var i = event.resultIndex; i < event.results.length; i++) {
      transcript = event.results[i][0].transcript;
      self._outputSpeechResult(transcript);
      if (!_won && self.guessLetter(options.letterString, transcript)) {
        self._win(options.letter, options.letterString);
        _won = true;
        break;
      }
    }
  };
};

WhiskeyTango.prototype.startSingleGame = function() {
  var letter = this._getRandomLetter();
  var letterString = this.letterMap[letter];
  this._displayLetter(letter);
  this.startSpeechRecognitionFor({
    letterString: letterString,
    letter: letter
  });
};

WhiskeyTango.prototype.startGame = function() {
  var self = this;
  this.recognition.start();
  this.startSingleGame();
  this.onWin = function(letter, letterString) {
    self._displayLetter(letterString.toUpperCase());
    setTimeout(function() {
      self.startSingleGame();
    }, 1000);
  };
};

WhiskeyTango.prototype.stopGame = function() {
  this.recognition.stop();
};

module.exports = WhiskeyTango;

var WhiskeyTango = function(options) {
  this.recognition = options.recognition;
  this.letterMap = options.letterMap;
};

WhiskeyTango.prototype = {
  constructor: WhiskeyTango,

  _outputSpeechResult: function(result) {
    var whatEl = document.getElementById('what');
    whatEl.innerHTML = result;
  },

  _getRandomLetter: function() {
    var keys = Object.keys(this.letterMap);
    return keys[ keys.length * Math.random() << 0];
  },

  _displayLetter: function(letter) {
    var letterEl = document.getElementById('letter');
    letterEl.innerHTML = letter;
  },

  _win: function(letter, letterString) {
    if (this.onWin) {
      this.onWin.apply(this, [letter, letterString]);
    }
  },

  guessLetter: function(letterString, guess) {
    return !!guess.toLowerCase().match(letterString);
  },

  startSpeechRecognitionFor: function(options) {
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
  },

  startSingleGame: function() {
    var letter = this._getRandomLetter();
    var letterString = this.letterMap[letter];

    this._displayLetter(letter);
    this.startSpeechRecognitionFor({
      letterString: letterString,
      letter: letter
    });
  },

  startGame: function() {
    var self = this;
    this.recognition.start();
    this.startSingleGame();
    this.onWin = function(letter, letterString) {
      self._displayLetter(letterString.toUpperCase());
      setTimeout(function() {
        self.startSingleGame();
      }, 1000);
    };
  },

  endGame: function() {
    this.recognition.stop();
  }
};

module.exports = WhiskeyTango;

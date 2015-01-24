(function(){

  var Recognition = function() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    return this.recognition;
  };

  var WhiskeyTango = function(options) {
    this.recognition = options.recognition;
    this.letterMap = options.letterMap;
    this.currentLetterString = null;
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

    guessLetter: function(guess) {
      return !!guess.toLowerCase().match(this.currentLetterString);
    },

    startSpeechRecognitionFor: function(letterString) {
      // start speech recognition and set the onresult function to
      // call `guessLetter` with the result.
      var self = this;

      this.recognition.onresult = function(event) {
        console.log(event);
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            // self.outputSpeechResult(event.results[i][0].transcript);
          } else {
            self._outputSpeechResult(event.results[i][0].transcript);
            if (self.guessLetter(event.results[i][0].transcript)) {
              self._win(self.winCallback);
              break;
            }
          }
        }
      };
    },

    startSingleGame: function() {
      this._won = false;
      this._displayLetter(this.currentLetter);
      this.currentLetter = this._getRandomLetter();
      this.currentLetterString = this.letterMap[this.currentLetter];

      this.startSpeechRecognitionFor(this.currentLetterString);
    },

    _win: function(winCallback) {
      if (!this._won) {
        this._won = true;
        if (winCallback) {
          winCallback.apply(this);
        }
      }
    },

    startGame: function() {
      this.recognition.start();
      this.startSingleGame();
      this.winCallback = this.startSingleGame;
    },

    endGame: function() {
      this.recognition.stop();
    }
  };

  window.WhiskeyTango = WhiskeyTango;

  var Game = new WhiskeyTango({
    recognition: new Recognition(),
    letterMap: {
      'A': 'alpha',
      'B': 'bravo',
      'C': 'charlie',
      'D': 'delta',
      'E': 'echo',
      'F': 'foxtrot',
      'G': 'golf',
      'H': 'hotel',
      'I': 'india',
      'J': 'juliet',
      'K': 'kilo',
      'L': 'lima',
      'M': 'mike',
      'N': 'november',
      'O': 'oscar',
      'P': 'papa',
      'Q': 'quebec',
      'R': 'romeo',
      'S': 'sierra',
      'T': 'tango',
      'U': 'uniform',
      'V': 'victor',
      'W': 'whiskey',
      'X': 'x ray',
      'Y': 'yankee',
      'Z': 'zulu'
    }
  });

  var startButton = document.getElementById('start');
  var stopButton = document.getElementById('stop');

  startButton.addEventListener('click', function() {
    Game.startGame();
  });

  stopButton.addEventListener('click', function() {
    Game.endGame();
  });

})();

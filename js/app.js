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

    _win: function() {
      if (this.onWin) {
        this.onWin.apply(this);
      }
    },

    guessLetter: function(letterString, guess) {
      return !!guess.toLowerCase().match(letterString);
    },

    startSpeechRecognitionFor: function(options) {
      var self = this;

      this.recognition.onresult = function(event) {
        console.log(event);
        for (var i = event.resultIndex; i < event.results.length; i++) {
          var transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // self.outputSpeechResult(transcript);
          } else {
            self._outputSpeechResult(transcript);
            if (self.guessLetter(options.letterString, transcript)) {
              self._win();
              break;
            }
          }
        }
      };
    },

    startSingleGame: function() {
      var letter = this._getRandomLetter();
      var letterString = this.letterMap[letter];

      this._displayLetter(letter);
      this.startSpeechRecognitionFor({
        letterString: letterString
      });
    },

    startGame: function() {
      this.recognition.start();
      this.startSingleGame();
      this.onWin = this.startSingleGame;
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

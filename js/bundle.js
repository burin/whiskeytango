/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ }
/******/ ])
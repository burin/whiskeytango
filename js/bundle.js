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

	  var components = __webpack_require__(4);






	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Recognition = function() {
	  this.recognition = new webkitSpeechRecognition();
	  this.recognition.continuous = true;
	  this.recognition.interimResults = true;

	  return this.recognition;
	};

	module.exports = Recognition;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
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
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(5).EventEmitter;

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
	  this.emit('match', {
	    letter: letter,
	    letterString: letterString
	  });
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
	  this.started = true;
	  this.onWin = function(letter, letterString) {
	    self._displayLetter(letterString.toUpperCase());
	    setTimeout(function() {
	      self.startSingleGame();
	    }, 1000);
	  };
	};

	WhiskeyTango.prototype.stopGame = function() {
	  this.started = false;
	  this.recognition.stop();
	};

	module.exports = WhiskeyTango;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Recognition = __webpack_require__(1);
	var LetterMap = __webpack_require__(2);
	var WhiskeyTango = __webpack_require__(3);

	var ToggleButton = React.createClass({displayName: "ToggleButton",
	  render: function() {
	    return (
	      React.createElement("button", {onClick: this.props.onClick, className: "btn-large"}, this.props.buttonText)
	    );
	  }
	});

	var SpeechOutput = React.createClass({displayName: "SpeechOutput",
	  render: function() {
	    return (
	      React.createElement("p", {className: "what", id: "what"}, this.props.output)
	    );
	  }
	});

	var Letter = React.createClass({displayName: "Letter",
	  render: function() {
	    return (
	      React.createElement("h2", {id: "letter"}, this.props.letter)
	    );
	  }
	});

	var App = React.createClass({displayName: "App",
	  getInitialState: function() {
	    return {
	      buttonText: 'Start'
	    };
	  },
	  componentDidMount: function() {
	    this.game = new WhiskeyTango({
	      recognition: new Recognition(),
	      letterMap: LetterMap
	    });
	    this.game.on('result', this.recognitionHandler);
	    this.game.on('letter', this.letterHandler);
	    this.game.on('match', this.matchHandler);
	  },
	  toggleButton: function() {
	    if(this.game.started) {
	      this.stopGame();
	    } else {
	      this.startGame();
	    }
	  },
	  startGame: function() {
	    var newState = this.state;
	    this.game.startGame();
	    newState.buttonText = 'Stop';
	    this.setState(newState);
	  },
	  stopGame: function() {
	    var newState = this.state;
	    this.game.stopGame();
	    newState.buttonText = 'Start';
	    newState.letter = '';
	    newState.output = '';
	    this.setState(newState);
	  },
	  matchHandler: function(match) {
	    console.log('matched ' + match.letter + match.letterString);
	  },
	  recognitionHandler: function(recognition) {
	    var newState = this.state;
	    newState.output = recognition;
	    this.setState(newState);
	  },
	  letterHandler: function(letter) {
	    var newState = this.state;
	    newState.letter = letter;
	    this.setState(newState);
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "app center"}, 
	        React.createElement("p", null, "Whiskey Tango Speech Reco"), 
	        React.createElement(ToggleButton, {onClick: this.toggleButton, buttonText: this.state.buttonText}), 
	        React.createElement("p", null, "What’s the word for:"), 
	        React.createElement(Letter, {letter: this.state.letter}), 
	        React.createElement("p", null, "What are you saying?"), 
	        React.createElement(SpeechOutput, {output: this.state.output})
	      )
	    );
	  }
	});

	React.render(
	  React.createElement(App, null),
	  document.getElementById('content')
	);

	module.exports = {};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function(exports) {
	  var process = { EventEmitter: function() {} };
	  
	  if (typeof Array.isArray !== "function"){
	    Array.isArray = function(obj){ return Object.prototype.toString.call(obj) === "[object Array]" };
	  }
	  
	  if (!Array.prototype.indexOf){
	    Array.prototype.indexOf = function(item){
	        for ( var i = 0, length = this.length; i < length; i++ ) {
	            if ( this[ i ] === item ) {
	                return i;
	            }
	        }

	        return -1;
	    };
	  }
	  
	  // Begin wrap of nodejs implementation of EventEmitter

	  var EventEmitter = exports.EventEmitter = process.EventEmitter;

	  var isArray = Array.isArray;

	  EventEmitter.prototype.emit = function(type) {
	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {
	      if (!this._events || !this._events.error ||
	          (isArray(this._events.error) && !this._events.error.length))
	      {
	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	          throw new Error("Uncaught, unspecified 'error' event.");
	        }
	        return false;
	      }
	    }

	    if (!this._events) return false;
	    var handler = this._events[type];
	    if (!handler) return false;

	    if (typeof handler == 'function') {
	      switch (arguments.length) {
	        // fast cases
	        case 1:
	          handler.call(this);
	          break;
	        case 2:
	          handler.call(this, arguments[1]);
	          break;
	        case 3:
	          handler.call(this, arguments[1], arguments[2]);
	          break;
	        // slower
	        default:
	          var args = Array.prototype.slice.call(arguments, 1);
	          handler.apply(this, args);
	      }
	      return true;

	    } else if (isArray(handler)) {
	      var args = Array.prototype.slice.call(arguments, 1);

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        listeners[i].apply(this, args);
	      }
	      return true;

	    } else {
	      return false;
	    }
	  };

	  // EventEmitter is defined in src/node_events.cc
	  // EventEmitter.prototype.emit() is also defined there.
	  EventEmitter.prototype.addListener = function(type, listener) {
	    if ('function' !== typeof listener) {
	      throw new Error('addListener only takes instances of Function');
	    }

	    if (!this._events) this._events = {};

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    this.emit('newListener', type, listener);

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    } else if (isArray(this._events[type])) {
	      // If we've already got an array, just append.
	      this._events[type].push(listener);
	    } else {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    }

	    return this;
	  };

	  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	  EventEmitter.prototype.once = function(type, listener) {
	    var self = this;
	    self.on(type, function g() {
	      self.removeListener(type, g);
	      listener.apply(this, arguments);
	    });
	  };

	  EventEmitter.prototype.removeListener = function(type, listener) {
	    if ('function' !== typeof listener) {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    // does not use listeners(), so no side effect of creating _events[type]
	    if (!this._events || !this._events[type]) return this;

	    var list = this._events[type];

	    if (isArray(list)) {
	      var i = list.indexOf(listener);
	      if (i < 0) return this;
	      list.splice(i, 1);
	      if (list.length == 0)
	        delete this._events[type];
	    } else if (this._events[type] === listener) {
	      delete this._events[type];
	    }

	    return this;
	  };

	  EventEmitter.prototype.removeAllListeners = function(type) {
	    // does not use listeners(), so no side effect of creating _events[type]
	    if (type && this._events && this._events[type]) this._events[type] = null;
	    return this;
	  };

	  EventEmitter.prototype.listeners = function(type) {
	    if (!this._events) this._events = {};
	    if (!this._events[type]) this._events[type] = [];
	    if (!isArray(this._events[type])) {
	      this._events[type] = [this._events[type]];
	    }
	    return this._events[type];
	  };

	  // End nodejs implementation
	}((false) ? window : exports));

/***/ }
/******/ ])
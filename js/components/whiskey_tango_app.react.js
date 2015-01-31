var React = require('react');
var Recognition = require('../recognition.js');
var LetterMap = require('../letter_map.js');
var WhiskeyTango = require('../whiskey_tango.js');

var ToggleButton = require('./toggle_button.react');
var Letter = require('./letter.react');
var Countdown = require('./countdown.react');
var Progress = require('./progress.react');
var LastProgress = require('./last_progress.react');
var SpeechOutput = require('./speech_output.react');

var WhiskeyTangoApp = React.createClass({
  getInitialState: function() {
    return {
      buttonText: 'Start',
      letter: '',
      output: '',
      progress: 0,
      countdown: 0,
      lastProgress: 0
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
    this.game.on('countdown', this.countdownHandler);
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
    this.game.stopGame();
    var newState = this.getInitialState();
    newState.lastProgress = this.state.progress;
    this.setState(newState);
  },
  matchHandler: function(match) {
    var newState = this.state;
    newState.output = '';
    newState.progress = this.state.progress += 1;
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
  countdownHandler: function(countdown) {
    if (countdown === 0) {
      this.stopGame();
    } else{
      var newState = this.state;
      newState.countdown = countdown;
      this.setState(newState);
    }
  },
  render: function() {
    return (
      <div className="app center">
        <p>Whiskey Tango Speech Reco</p>
        <ToggleButton onClick={this.toggleButton} buttonText={this.state.buttonText} />
        <Letter letter={this.state.letter} />
        <Countdown countdown={this.state.countdown} />
        <Progress progress={this.state.progress} />
        <LastProgress progress={this.state.lastProgress} />
        <SpeechOutput output={this.state.output} />
      </div>
    );
  }
});


module.exports = WhiskeyTangoApp;

var Recognition = require('./recognition.js');
var LetterMap = require('./letter_map.js');
var WhiskeyTango = require('./whiskey_tango.js');

var ToggleButton = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.onClick} className="btn-large">{this.props.buttonText}</button>
    );
  }
});

var SpeechOutput = React.createClass({
  render: function() {
    return (
      <p className="what" id="what">{this.props.output}</p>
    );
  }
});

var Letter = React.createClass({
  render: function() {
    var output;
    if (this.props.letter) {
      output = (
        <div>
          <p>What’s the word for:</p>
          <h2 id="letter">{this.props.letter}</h2>
        </div>
      );
    } else {
      output = <div />;
    }
    return output;
  }
});

var Progress = React.createClass({
  render: function() {
    var output;
    if (this.props.progress) {
      output = (
        <p>Matches: {this.props.progress}</p>
      );
    } else {
      output = <p />;
    }
    return output;
  }
});

var LastProgress = React.createClass({
  render: function() {
    var output;
    if (this.props.progress) {
      output = (
        <p>Last Game # of Matches: {this.props.progress}</p>
      );
    } else {
      output = <p />;
    }
    return output;
  }
});

var Countdown = React.createClass({
  render: function() {
    var output;
    if (this.props.countdown) {
      output = (
        <p>{this.props.countdown}</p>
      );
    } else {
      output = <p />;
    }
    return output;
  }
});

var App = React.createClass({
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

React.render(
  <App />,
  document.getElementById('content')
);

module.exports = {};

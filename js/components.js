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
    if (this.props.letter) {
      output = (
        <p>Matches: {this.props.progress}</p>
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
      progress: 0
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
    this.game.stopGame();
    this.setState(this.getInitialState());
  },
  matchHandler: function(match) {
    var newState = this.state;
    newState.output = '';
    newState.progress = this.state.progress += 1;
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
      <div className="app center">
        <p>Whiskey Tango Speech Reco</p>
        <ToggleButton onClick={this.toggleButton} buttonText={this.state.buttonText} />
        <Letter letter={this.state.letter} />
        <Progress progress={this.state.progress} />
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

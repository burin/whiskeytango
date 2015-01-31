var Recognition = require('./recognition.js');
var LetterMap = require('./letter_map.js');
var WhiskeyTango = require('./whiskey_tango.js');

var StartButton = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.onClick} className="btn-large waves-effect waves-light teal lighten-1">Start</button>
    );
  }
});

var StopButton = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.onClick} className="btn-large">Stop</button>
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
    return (
      <h2 id="letter">{this.props.letter}</h2>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {

    };
  },
  componentDidMount: function() {
    this.game = new WhiskeyTango({
      recognition: new Recognition(),
      letterMap: LetterMap
    });
    this.game.on('result', this.recognitionHandler);
    this.game.on('letter', this.letterHandler);
  },
  startHandler: function() {
    this.game.startGame();
  },
  stopHandler: function() {
    this.game.stopGame();
  },
  recognitionHandler: function(recognition) {
    var state = this.state;
    state.output = recognition;
    this.setState(state);
  },
  letterHandler: function(letter) {
    var state = this.state;
    state.letter = letter;
    this.setState(state);
  },
  render: function() {
    return (
      <div className="app">
        <p>Whiskey Tango SpesasdasechReco</p>
        <StartButton onClick={this.startHandler} />
        <StopButton onClick={this.stopHandler} />
        <p>What’s the word for:</p>
        <Letter letter={this.state.letter} />
        <p>What are you saying?</p>
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

var React = require('react');
var SpeechOutput = React.createClass({
  render: function() {
    return (
      <p className="what" id="what">{this.props.output}</p>
    );
  }
});

module.exports = SpeechOutput;

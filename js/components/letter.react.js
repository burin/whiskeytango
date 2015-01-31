var React = require('react');
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

module.exports = Letter;

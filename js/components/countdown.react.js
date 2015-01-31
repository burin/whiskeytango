var React = require('react');
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

module.exports = Countdown;

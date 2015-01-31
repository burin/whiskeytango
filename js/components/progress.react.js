var React = require('react');
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

module.exports = Progress;

var React = require('react');
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

module.exports = LastProgress;

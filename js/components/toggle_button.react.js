var React = require('react');
var ToggleButton = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.onClick} className="btn-large">{this.props.buttonText}</button>
    );
  }
});

module.exports = ToggleButton;

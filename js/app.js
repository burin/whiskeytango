(function(){
  var WhiskeyTangoApp = require('./components/whiskey_tango_app.react');
  var React = require('react');

  React.render(
    <WhiskeyTangoApp />,
    document.getElementById('content')
  );
})();

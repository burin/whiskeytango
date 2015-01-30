(function(){
  var Recognition = require('./recognition.js');
  var LetterMap = require('./letter_map.js');
  var WhiskeyTango = require('./whiskey_tango.js');


  window.WhiskeyTango = WhiskeyTango;

  var Game = new WhiskeyTango({
    recognition: new Recognition(),
    letterMap: LetterMap
  });

  var startButton = document.getElementById('start');
  var stopButton = document.getElementById('stop');

  startButton.addEventListener('click', function() {
    Game.startGame();
  });

  stopButton.addEventListener('click', function() {
    Game.endGame();
  });

})();

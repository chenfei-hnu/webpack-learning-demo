const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
$('#root').append('<button>jquery123</button>');
$('button').off('click').on('click', function () {
  alert(12);
});
if (module.hot) {
  module.hot.accept();
}
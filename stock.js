var SYMBOL_API_URL = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='
var FIREBASE_URL = 'https://stockpick.firebaseio.com/stock.json'

$.get(FIREBASE_URL, function (data) {
  Object.keys(data).forEach(function (id) {
    addStockDetail(data[id]);
  });
});

var $button = $('.stockContainer');
$button.on("click",".btn",function() {
  $($button).children().each(function() {
    this.remove();
  });

})

var stockSymbol = document.querySelector('.stock');

stockSymbol.onclick = function () {
  var input = document.querySelector("#stockSymbol");
  var symbol = input.value;
  var url = SYMBOL_API_URL + symbol;

  $.get(url, function (data) {
    $.post(FIREBASE_URL, JSON.stringify(data));
    addStockDetail(data);
  }, 'jsonp');
};

function addStockDetail(data) {

  var detail = createStockNode(data);
  var target = $('.stockContainer');

  target.empty();
  target.append(detail);
}

// CREATES DOM ELEMENT

function createStockNode(stock){
  var docFragment = document.createDocumentFragment(); // contains all gathered nodes

  var div = document.createElement('div');
  div.setAttribute('class', 'stock2');
  docFragment.appendChild(div);

  var h1 = document.createElement('H1');
  div.appendChild(h1);
  var text = document.createTextNode(stock.Name);
  h1.appendChild(text);

  var h2 = document.createElement('H2');
  div.appendChild(h2);
  var text_0 = document.createTextNode(stock.LastPrice);
  h2.appendChild(text_0);

  var btn = document.createElement('button');
  btn.setAttribute('class', 'btn btn-danger');
  var btn_text = document.createTextNode('X');

  btn.appendChild(btn_text);
  div.appendChild(btn);

  return docFragment;
}

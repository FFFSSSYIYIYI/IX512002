if(localStorage.getItem('cart')) {
	var cartStr = localStorage.getItem('cart') || '';
	var cart = cartStr ? JSON.parse(cartStr) : [];
	var moneys = 0;
	for(var i = 0; i < cart.length; i++) {
		moneys += cart[i].price * cart[i].count;
	}
	document.getElementById('cartMoneys').innerHTML = "$" + moneys.toFixed(2);
}
document.getElementById('cart').onclick = function() {
	window.location.href = "cart.html";
};
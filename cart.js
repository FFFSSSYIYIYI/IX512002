//get all goods
var goods = [];
var nameNodes = document.getElementsByClassName('name');
var priceNodes = document.getElementsByClassName('price');
var countNodes = document.getElementsByClassName('count');
var addNode = document.getElementsByClassName('add');
var subNode = document.getElementsByClassName('sub');
var addCartNode = document.getElementsByClassName('add-cart');
var totalPriceNode = document.getElementsByClassName('total-price');
//util
var utilNode = document.getElementsByClassName('util');

//get attr
function attr(obj,name){
	return obj.getAttribute('data-'+name) || '';
}
//add cart method
for(var i = 0;i<addCartNode.length;i++){
	addCartNode[i].onclick = function(){
		if(!localStorage.getItem('user')){
			alert('Please Login First');
			window.location.href = "index.html";
			return;
		}
		var cartStr = localStorage.getItem('cart') || '';
		var cart = cartStr ? JSON.parse(cartStr) : [];
		var index = attr(this,'index') || -1;
		if(index >= 0){
			var name = nameNodes[index].innerText;
			var price = 0;
			var count = parseInt(countNodes[index].innerText);
			var util = "";
			if(utilNode.length > index){
				util = utilNode[index].options[utilNode[index].selectedIndex].text;
				price = parseFloat(utilNode[index].options[utilNode[index].selectedIndex].value);
			}else if(priceNodes.length > index){
				price = parseFloat(priceNodes[index].innerText.substr(1));
			}
			console.log(util);
			//check cart
			var canadd = true;
			for(var i = 0;i<cart.length;i++){
				if(cart[i].name == name){
					canadd = false;
					if(count == 0){
						cart.splice(i,1);
					}else{
						cart[i].count = count;
					}
					break;
				}
			}
			console.log(name)
			if(canadd){
				cart.push({
					name:name,
					price:price,
					count:count,
					util:util
				});
			}
			console.log(cart);
			localStorage.setItem('cart',JSON.stringify(cart));
			//update moneys
			if(document.getElementById('cartMoneys')){
				var moneys = 0;
				for(var i = 0;i<cart.length;i++){
					moneys += cart[i].price * cart[i].count;
				}
				document.getElementById('cartMoneys').innerHTML = "$" + moneys.toFixed(2);
			}
			alert('Add Success');
		}
	};
}


for(var i = 0;i<addNode.length;i++){
	addNode[i].onclick = function(){
		var index = attr(this,'index') || -1;
		var count = parseInt(countNodes[index].innerText);
		if(index >= 0){
			count = count + 1;
			countNodes[index].innerHTML = count;
		}
		var price = 0;
		if(utilNode.length > index){
			price = parseFloat(utilNode[index].options[utilNode[index].selectedIndex].value);
		}else if(priceNodes.length > index){
			price = parseFloat(priceNodes[index].innerText.substr(1));
		}
		if(totalPriceNode.length > index){
			//total price
			totalPriceNode[index].innerHTML = "$"+(price * count).toFixed(2);
		}
	}
}

for(var i = 0;i<subNode.length;i++){
	subNode[i].onclick = function(){
		var index = attr(this,'index') || -1;
		var count = parseInt(countNodes[index].innerText);
		if(index >= 0 && count > 0){
			count = count - 1;
			countNodes[index].innerHTML = count;
		}
		var price = 0;
		if(utilNode.length > index){
			price = parseFloat(utilNode[index].options[utilNode[index].selectedIndex].value);
		}else if(priceNodes.length > index){
			price = parseFloat(priceNodes[index].innerText.substr(1));
		}
		if(totalPriceNode.length > index){
			//total price
			totalPriceNode[index].innerHTML = "$"+(price * count).toFixed(2);
		}
	}
}
let a = new XMLHttpRequest();
a.addEventListener("load", dataCategoriesComplete);
a.addEventListener("error", dataCategoriesFailed);
a.open("GET", "categories.json");
a.send();

let b = new XMLHttpRequest();
b.addEventListener("load", dataProductsComplete);
b.addEventListener("error", dataProductsFailed);
b.open("GET", "products.json");
b.send();

var categorynames=[];
var categoryid=[];
var categoryseason=[];
var categorydiscount=[];
var productnames=[];
var productprice=[];
var productid=[];

function dataCategoriesComplete() {
	console.log("Categories loaded");
	data = JSON.parse(this.responseText);
	console.log("Categories", data);
	showcategories(data);
	dom();
	
}

function dataProductsComplete() {
	console.log("Products loaded");
	data = JSON.parse(this.responseText);
	console.log("Categories", data);
	showproducts(data);
	dom();
}

function dataCategoriesFailed(e) {
	console.log("dataFailed", e);	
}

function dataProductsFailed(e) {
	console.log("dataFailed", e);	
}

function showcategories(data) {
	for (item in data) {
		let obj = data[item];
		for (var i =0; i < obj.length; i++) {
			categorynames.push( obj[i].name);
			categoryid.push(obj[i].id);
			categoryseason.push(obj[i].season_discount);
			categorydiscount.push(obj[i].discount);
		}
	}
}

function showproducts(data) {
	for (item in data) {
		let obj = data[item];
		for (var i =0; i < obj.length; i++) {
			productnames.push( obj[i].name);
			productprice.push(obj[i].price);
			productid.push(obj[i].category_id);
		}
	}
}


function dom() {
	let content ='';
	for (var i = 0; i<productnames.length;i++) {
		for (var j=0;j<categorynames.length;j++) {
			if (productid[i]===categoryid[j]) {
				content += `<div id="${i}" class="col-md-6">`
				content += `<h2>Department Name: ${categorynames[j]}</h2>`;
				content += `<p>Product: ${productnames[i]}</p>`;
				content += `<p>Price: $${productprice[i]}</p></div>`;

					
			}
			
				
		}

	}
	document.getElementById("body").innerHTML+=content;
}	

function changeprice() {
	let select = document.getElementById("select").value;
	if (select == 0) {
		alert("Select a Seasonal Discount");
		for (var i=0; i<10;i++) {
			document.getElementById(`${[i]}`).firstChild.nextSibling.nextSibling.innerHTML = `$${productprice[i]}`;
		}	
	}
	else if (select ==1) {
		for (var i=0; i<10;i++) {
				let p=(productprice[i]*(1-categorydiscount[0])).toFixed(2);
				document.getElementById(`${[i]}`).firstChild.nextSibling.nextSibling.innerHTML = `$${p}`;

		}
	}	
	else if (select ==2) {
		for (var i=0; i<10;i++) {
				let p=(productprice[i]*(1-categorydiscount[1])).toFixed(2);
				document.getElementById(`${[i]}`).firstChild.nextSibling.nextSibling.innerHTML = `$${p}`;
		}
	}	
	else {
		for (var i=0; i<10;i++) {
				let p=(productprice[i]*(1-categorydiscount[2])).toFixed(2);
				document.getElementById(`${[i]}`).firstChild.nextSibling.nextSibling.innerHTML = `$${p}`;
		}	
	}
}
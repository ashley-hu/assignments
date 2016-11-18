function total(){
	var qOne = parseInt(document.getElementById("quantityOne").value);
	var pOne = document.getElementById("priceOne").value;
	var sumOne = (qOne*pOne).toFixed(2);
	document.getElementById("subTotalOne").value = sumOne;

	var qTwo = parseInt(document.getElementById("quantityTwo").value);
	var pTwo = document.getElementById("priceTwo").value;
	var sumTwo = (qTwo*pTwo).toFixed(2);
	document.getElementById("subTotalTwo").value = sumTwo;
}
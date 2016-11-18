function total(){
	//Calculate the subtotals for each product
	var qOne = parseFloat(document.getElementById("quantityOne").value);
	var pOne = document.getElementById("priceOne").value;
	var sumOne = parseFloat((qOne*pOne)).toFixed(2);
	document.getElementById("subTotalOne").value = sumOne;

	var qTwo = parseFloat(document.getElementById("quantityTwo").value);
	var pTwo = document.getElementById("priceTwo").value;
	var sumTwo = parseFloat((qTwo*pTwo)).toFixed(2);
	document.getElementById("subTotalTwo").value = sumTwo;

	//Shipping is 1.99 per first item, 0.99 for second item
	//Checks to see which shipping method is checked
	var radio = document.getElementById("notCall").checked;

	//If the shipping is selected, the ship cost will be calculated
	var shipCost = parseFloat(parseFloat(qOne*1.99) + parseFloat(qTwo*0.99)).toFixed(2);
	document.getElementById("shipping").value = shipCost;
	var tapped = false;

	//Grand Total
	//Calculates the total that user has to pay
	if(radio){ //If shipping is selected, the grand total will include the shipping cost
		var grandTotal = parseFloat(parseFloat(sumOne) + parseFloat(sumTwo) + parseFloat(shipCost)).toFixed(2);
		document.getElementById("grandTotal").value = grandTotal;
		tapped = true;
	}
	else{ //Otherwise there is no shipping cost to be included
		if(tapped){ //The shipping cost will be subtracted from grandtotal
			var grandTotal = parseFloat(parseFloat(sumOne) + parseFloat(sumTwo) - parseFloat(shipCost)).toFixed(2);
			document.getElementById("grandTotal").value = grandTotal;
		}
		else{
			var grandTotal = parseFloat(parseFloat(sumOne) + parseFloat(sumTwo)).toFixed(2);
			document.getElementById("grandTotal").value = grandTotal;
		}
	}	
}


//Ensures that the form has been entered correctly 
//Prints the receipt in a new document
function receipt(){
	var valid = true;
	var theForm = document.forms[0];
	var length = document.forms[0].elements.length;
	var first = true;
	var text = "";

	//Checks if the form is all filled out without the use of "required" in the html
	if(first){
	for(var i = 1 ; i < length -2; i++){
		var element = theForm.elements[i];
		console.log(element.name + " " + i);
		if((i!=4 && i!=8 && i!=13 && i!=21)  && (element.value == "" || element.value==null)){
			alert("Please fill out:  " + element.name);
			element.focus();
			element.select();
			valid = false;
			first = false;
			break;
		}
	}
	}	

	//Checks if zip code is 5 digits with regex
	var regex = /^\d{5}$/;
	if(first && ((!regex.test(theForm.elements[20].value)) || (theForm.elements[20].value.length!=5))){
		alert("Please enter a 5 digit Zip Code. Ex: 12345");
		theForm.elements[20].focus();
		theForm.elements[20].select();
		valid = false;
	}

	//Checks if email has @ and . with regex
	var regex = /\S+@\S+\.\S+/;
	if(first && (!regex.test(theForm.elements[15].value))){
		alert("Please enter valid email address. Ex: email@address.com");
		theForm.elements[15].focus();
		theForm.elements[15].select();
		valid = false;
	}


	//If the form is correctly and completely filled, then write the user's filled out information
	//In a new document 
	if(valid){
		document.open();
		document.write("<div align=center>");
		document.write("<h1> Receipt </h1> ");
		document.write("<p> Date: " + Date() + "</p>");

		text += "<h3> Thank you, <em>" + theForm.elements[14].value + "</em> for your purchase! </h3>";
		text += "<h4> You spent $" + theForm.elements[12].value + " total </h4>";
		//Gets the user information and stores it into cookies
		for(var i=14; i < 21; i++){
			text +=  theForm.elements[i].name + ": " + theForm.elements[i].value + "<br>";
			setCookie(theForm.elements[i].name, theForm.elements[i].value);
		}
		
		//Get Price, Quantity, and Subtotal of first product
		text += "<br> " + " Alpaca Plushie "+" <br>";
		for(var i = 1; i < 4; i++){
			text += theForm.elements[i].name + ": " +theForm.elements[i].value + " <br>";
		}
		//Get Price, Quantity, and Subtotal of second product
		text += "<br> " + "Penguin Plushie " + "<br>";
		for(var i = 5; i < 8;  i++){
			text += theForm.elements[i].name + ": " +theForm.elements[i].value + " <br>";
		}

		//Prints out the correct shipping method used
		if(theForm.elements[9].checked){
				text += "<br> Shipping Method: Pick Up" + " <br>";
		}
		else if(theForm.elements[10].checked){
				text += "<br> Shipping Method: Shipping" + " <br>";
		}

		//Get the card information
		text += "<br> Card Information " + "<br>";
		var mask = "";
		for(var i = 22; i < 26; i++){
			if(i == 23){
				//Masks the number except for last 4 digits 
				var clength = theForm.elements[i].value.length - 4;
				for(var k = 0 ; k < clength; k ++){
					mask += '#';
				}
				text += theForm.elements[i].name + ": " + mask + theForm.elements[i].value.slice(-4) + " <br>";
			}
			else{
				text += theForm.elements[i].name + ": " +theForm.elements[i].value + "  <br>";
			}
		}
		document.write("<p> "  + text + "</p>");
		document.write("</div>");
		document.close();
	}

}

//Extra that is not part of original assignment

//Set the cookie for user's information
//Information includes full name, phone, email and complete address
function setCookie(name, value){	
	var expire = new Date();
	expire.setTime(expire.getTime() + 30 * 24 * 3600 * 1000); //Expires after 30 days
	
	document.cookie = name + "=" + escape(value) + "; expires=" + expire.toUTCString();
}

//Get the cookie with the user information
function getCookie(name){
	var cookName = name + "=";
	var clength = document.cookie.split(';');
	for(var i = 0 ; i < clength.length; i++){
		var x = clength[i];
		while(x.charAt(0) == ' '){
			x = x.substring(1);
		}
		if(x.indexOf(name) == 0){
			return x.substring(cookName.length, x.length);
		}
	}
	return "";
}

//Asks the user if they want to use the information they have entered previously
//If yes, fill out the information with the stored cookies, it not let user enter 
//new information
onload = function checkCookie(){
	if(document.cookie.substring(0, 4) == "Name"){
		var user = getCookie("Name");
		if(confirm("Welcome " + decodeURIComponent(user) + " Are you " + decodeURIComponent(user) + "? If not, click cancel")){
			var result = getCookie("Name");
			result = decodeURI(result);
			document.forms[0].elements[14].value = result;
			document.forms[0].elements[15].value = getCookie("Email");
			document.forms[0].elements[16].value = getCookie("Telephone");
			var result1 = getCookie("Street Address");
			result1 = decodeURI(result1);
			document.forms[0].elements[17].value = result1;
			document.forms[0].elements[18].value = getCookie("City");
			document.forms[0].elements[19].value = getCookie("State");
			document.forms[0].elements[20].value = getCookie("Zip Code");
		}
		else{
			document.form1.reset();
		}
	}
}





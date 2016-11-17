var ruokalista = "";
var urlArray = [];
for(var i = 0; i < 5; i++) {
	var aimo = "menus/aimo/amica_" + i + ".json";
	var bitti = "menus/bitti/bitti_" + i + ".json";
	var poliisi = "menus/poliisi/poliisi_" + i + ".json";
	urlArray.push(aimo);
	urlArray.push(bitti);
	urlArray.push(poliisi);
}

function start() {
	setViikonPaivat();
	for(var value of urlArray){
		if(checkArray(value, 0)) {
			loadJSON(value);
		}
	}
}

function checkArray(str, nmbr) {
	
	if(str.search(nmbr) != -1) {
		return true;
	}
	else {
		return false;
	}
}

function navigate(index) {
	for(var i  = 1;i <6;i++) {
		var inactive = document.getElementById(i);
		inactive.setAttribute("class","vkp");
	}
	var active = document.getElementById(index);
	active.setAttribute("class","vkp active");
	
	var paikat= ["aimo", "bitti", "poliisi"];
	var element = "";
	
	for (var value of paikat) {
		element = document.getElementById(value);
		element.innerHTML = null;
	}
	
	for(var value of urlArray){
		if(checkArray(value, (index-1))) {
			loadJSON(value);
		}
	}
}

function setViikonPaivat() {
	
	var viikonpaiva = ["maanantai" , "tiistai", "keskiviikko", "torstai", "perjantai"];
	
	var date = new Date();
	
	var active = document.getElementById(date.getDay()); //hakee navbarin tämänhetkisen viikonpäivän
	active.setAttribute("class" , "vkp active"); // asettaa lista elementin aktiiviseksi
	
	var temp_date = date.getDate()-date.getDay()+1; //hakee kyseisen viikon maanantain
	
	date.setDate(temp_date); // asettaa oikean päivämäärän maanantaille
	temp_date = date.getDate();
	
	for(var i = 0;i<5;i++) { //asetetaan viikonpäivien päivämäärät
		
		var weekday = document.getElementById(viikonpaiva[i])
		date.setDate(temp_date+i);
		
		if(date.getDate() < (temp_date+i)) temp_date = 0; //tsekkaa onko kuukausi vaihtunut välissä
		weekday.innerHTML = date.getDate() + "." + (date.getMonth() + 1); //asettaa span elementin sisälle viikonpäivän pvm:n
	}
}

function loadJSON(url) {
	ajax(url, function(response) {
		//console.log("response = " + response);
		// create a json object
		var data = JSON.parse(response);
		try {
			//console.log("error");
			if(data.meta.ref_title == "JAMK Ravintola Bittipannu \/ Dynamo") {
				ruokalista = data.courses;
				console.log("Bittipannu");
				for(var i = 0; i<ruokalista.length;i++) {
					naytaBitti(i);
				}
			}
			else {
				console.log("pollarit");
				ruokalista = data.courses;
				for(var i = 0; i<ruokalista.length;i++) {
					naytaPoliisi(i);
				}
			}
			}
			catch(err) {
				if(data.MenusForDays) {
					ruokalista = data.MenusForDays;
					for (var i=0;i<ruokalista.length;i++) {
						for(var j=0;i<ruokalista[i].SetMenus.length;j++) {
							naytaAimo(i, j);
						}
					}
				}
			}
	});
}
function ajax(url, fn) {
	var req;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else {
		req = new ActiveXObject('Microsoft.XMLHTTP');
	}
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			fn(req.responseText);
		}
	}
	req.open('GET', url, true);
	req.send();
}

function naytaAimo(index, jndex){
	// uusi div	
	console.log(ruokalista[index]);
	//console.log(ruokalista[index].LunchTime);
	if(ruokalista[index].LunchTime != null)
	{
		var ruokaDiv = document.createElement("tr");
		ruokaDiv.setAttribute("class","ruokaRow");
		
		var tr = document.createElement("tr");
		tr.setAttribute("class", "infoRow");
	
		var td1 = document.createElement("td");
		td1.setAttribute("class","otsikko");
		var text = document.createTextNode(ruokalista[index].SetMenus[jndex].Name);	
		td1.appendChild(text);
		
		var td2 = document.createElement("td");
		td2.setAttribute("class","hinta");
		text = document.createTextNode(ruokalista[index].SetMenus[jndex].Price);	
		td2.appendChild(text);
		
		var td3 = document.createElement("td");
		td3.setAttribute("class","ruoka");
		
		var t_text = "";
		var array = ruokalista[index].SetMenus[jndex].Components;
		if(Object.prototype.toString.call(array) === '[object Array]') //tarkistaa onko muuttuja lista
		{
			//console.log("true");
			array.forEach(function(item){ //tulostaa komponentit yhteen table data elementtiin
				t_text =t_text + item + "\n";
			});
		}
		else{
			t_text = array;
		}
		text = document.createTextNode(t_text);
		td3.appendChild(text);

		ruokaDiv.appendChild(td1);
		ruokaDiv.appendChild(td2);
		tr.appendChild(td3);
	
		var aimoDiv = document.getElementById("aimo");
	
		aimoDiv.appendChild(ruokaDiv);
		aimoDiv.appendChild(tr);
	}
	else
	{
		console.log("else");
	}
}
function naytaBitti(index) {
	
	var ruokaDiv = document.createElement("tr");
	ruokaDiv.setAttribute("class","ruokaRow");
	
	var tr = document.createElement("tr");
	tr.setAttribute("class", "infoRow");
	
	var td1 = document.createElement("td");
	td1.setAttribute("class", "otsikko");
	td1.setAttribute("style","text-transform: uppercase;")
	
	var text = document.createTextNode(ruokalista[index].category);
	td1.appendChild(text);
	
	var td2 = document.createElement("td");
	td2.setAttribute("class", "hinta");
	
	text = document.createTextNode(ruokalista[index].price);
	td2.appendChild(text);
	
	var td3 = document.createElement("td");
	td3.setAttribute("class", "ruoka");
	
	var t_text = ruokalista[index].title_fi;
	t_text = t_text + "\n" + ruokalista[index].desc_fi;
	text = document.createTextNode(t_text);
	td3.appendChild(text);
	
	ruokaDiv.appendChild(td1);
	ruokaDiv.appendChild(td2);
	tr.appendChild(td3);
	
	var bittiDiv = document.getElementById("bitti");
	bittiDiv.appendChild(ruokaDiv);
	bittiDiv.appendChild(tr);
	
	
}
function naytaPoliisi(index) {
	
	var ruokaDiv = document.createElement("tr");
	ruokaDiv.setAttribute("class","ruokaRow");
	
	var tr = document.createElement("tr");
	tr.setAttribute("class", "infoRow");
	
	var td1 = document.createElement("td");
	td1.setAttribute("class", "otsikko");
	td1.setAttribute("style","text-transform: uppercase;")
	
	var text = document.createTextNode(ruokalista[index].category);
	td1.appendChild(text);
	
	var td2 = document.createElement("td");
	td2.setAttribute("class", "hinta");
	
	text = document.createTextNode(ruokalista[index].price);
	td2.appendChild(text);
	
	var td3 = document.createElement("td");
	td3.setAttribute("class", "ruoka");
	
	text = document.createTextNode(ruokalista[index].title_fi);
	td3.appendChild(text);
	
	ruokaDiv.appendChild(td1);
	ruokaDiv.appendChild(td2);
	tr.appendChild(td3);
	
	var poliisiDiv = document.getElementById("poliisi");
	poliisiDiv.appendChild(ruokaDiv);
	poliisiDiv.appendChild(tr);
}
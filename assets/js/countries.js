fetch("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
		"x-rapidapi-key": "2dc07981d5msh1ab539654241e58p1d1353jsn5a40b2b2ce60"
	}
})
.then((response) => response.json())
.then((data) => {
    var country_val = "";
    for (const contr in data) {
        country_val = country_val + `<option value=${data[contr]["alpha3Code"]}>${data[contr]["name"]}</option>`;
    }
    document.getElementById("country").innerHTML = country_val;
})
.catch(err => {console.log(err);
});

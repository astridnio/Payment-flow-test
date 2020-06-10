/**
* General Description
*
* author: Astrid Niño
* email: astrid.nio@gmail.com
* param: PaymentsOS Integration
* return: Creates a refund request
* Version:1.0
*
*/

/* returns the query portion of a URL including the Question mark (?). 
*This return a string and then we do substring operation on that string. 
*substring(1) means return the string skipping the first character.
*/
var aPageURL = window.location.search.substring(1);
//parse the aPageURL to array  type
var aURLVariables = aPageURL.split('&');
// var definition
var id, country, line1, phone, email, name
// for loop to asing the vars
for (var i = 0; i < aURLVariables.length; i++) {
    var aParameterName = aURLVariables[i].split('=');
    if (aParameterName[0] == 'id') {
        id = aParameterName[1]
    }
    if (aParameterName[0] == 'country') {
        country = aParameterName[1]
    }
    if (aParameterName[0] == 'email') {
        email = aParameterName[1]
    }
}
// manipulates the DOM to insert the var value
document.getElementById("email").innerHTML = `<p>Email:  ${email}</p>`;
document.getElementById("country").innerHTML = `<p>Country:  ${country}</p>`;
document.getElementById("order").innerHTML = `Order Number: <h2>${Math.round(Math.random() * 15 * 10000)}-d`;
//listener  event
document.getElementById('refund').addEventListener('click', function (event) {
    event.preventDefault();

    /**
    * Create Refound
    * since v.1.0
    */
   // Header creation
    fetch(`https://api.paymentsos.com/payments/${id}/refunds`, {
        method: 'POST',
        headers: {
            "app_id": "com.github.integrationapi",
            "private_key": "ba433b0b-3e53-4614-8a95-27cc3252de53",
            "Content-Type": "application/json",
            "api-version": "1.3.0",
            "x-payments-os-env": "test",
            "idempotency_key": `${Math.round(Math.random() * 15 * 10000)}-d`,
        },
    })
        .then((response) => response.json())
        .then((refund_r) => {
            //Refund Creation Response Object
            console.log("Refund Response:");
            console.log(refund_r);
            //Refund validation
            if (refund_r["result"]) {
                //Refund Succedd
                swal({
                    title: "Success!",
                    text: "Order Refounded",
                    type: "success",
                    confirmButtonText: "Ok"
                });
            } else {
                //Refund Error
                swal({
                    icon: "error",
                    title: refund_r["description"],
                    text: refund_r["more_info"],
                });
            }
        })
        .catch((err) => console.log(err));
});
/**
* General Description
*
* author: Astrid Niño
* email: astrid.nio@gmail.com
* param: PaymentsOS Integration
* return: Creates the payment flow
* Version:1.0
*
*/
// Set your environment. Values are either "test" or "live".
POS.setEnvironment("test");
// Initialize the form's fields
POS.initSecureFields('card-secure-fields');
/*Attach a click event to the form that is invoked when the
 form is submitted. On submit, pass the card information to
 PaymentsOS and receive the token representing the card
 information in your site.*/
document
    .getElementById('payment-form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        // vars declaration
        var name = document.getElementById("cardholder-name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var country = document.getElementById("country").value;
        var line1 = document.getElementById("addr1").value;
        var product = {
            amount: 45000,
            currency: "USD",
            statement_soft_descriptor: "HUAWEI P30 LTE",
        }
        //objet creation
        const additionalData = {
            holder_name: name, // This field is mandatory
            billing_address: { //This field is optional and have object (address) structure
                email: email,
                phone: phone,
                country: country,
                line1: line1
            }
        }
        //Processing alert
        swal({
            title:"",
            text: "Wait for server confirmation",
            timer: 4000,
            showConfirmButton: false
          });
        /**
         * Token Creation
         * since v.1.0
         */
        POS.createToken(additionalData, function (result) {
            console.log("Token Result:");
            if (result["token"] == null) {
                result = JSON.parse(result);
                console.log(result);
            }
            if (!result["token"]) {
                swal({
                    icon: 'error',
                    title: `${result["description"]}`,
                    text: `${result["more_info"]}`,
                });
            } else {
                /**
                 * Create Payment
                 * since v.1.1
                 */
                fetch("https://api.paymentsos.com/payments", {
                    //header creation
                    method: "POST",
                    headers: {
                        "app_id": "com.github.integrationapi",
                        "private_key": "ba433b0b-3e53-4614-8a95-27cc3252de53",
                        "Content-Type": "application/json",
                        "api-version": "1.3.0",
                        "x-payments-os-env": "test",
                        "idempotency_key": `${Math.round(Math.random()*15*10000)}-a`,
                    },
                    // body json parse
                    body: JSON.stringify(product),
                })
                    .then((response) => response.json())
                    .then((payment) => {
                        //Payment Creation Response Object
                        console.log("payment creation result:");
                        console.log(payment);
                        if (payment["status"] == "Initialized") {
                            /**
                             * Create Authorization
                             * since v.1.2
                             */
                            // Body object creation
                            var data_authorize = {
                                payment_method: {
                                    type: "tokenized",
                                    token: `${result["token"]}`,
                                    credit_card_cvv: `${result["encrypted_cvv"]}`,
                                },
                                reconciliation_id: `${Math.round(Math.random()*15*10000)}-a`,
                            };
                            // Header creation
                            fetch(
                                `https://api.paymentsos.com/payments/${payment["id"]}/authorizations`, {
                                method: "POST",
                                headers: {
                                    "app_id": "com.github.integrationapi",
                                    "private_key": "ba433b0b-3e53-4614-8a95-27cc3252de53",
                                    "Content-Type": "application/json",
                                    "api-version": "1.3.0",
                                    "x-payments-os-env": "test",
                                    "idempotency_key": `${Math.round(Math.random()*15*10000)}-a`,
                                },
                                // body json parse
                                body: JSON.stringify(data_authorize),
                            }
                            )
                                .then((response) => response.json())
                                .then((auth) => {
                                    //Authorization Creation Response Object
                                    console.log("authorization result:");
                                    console.log(auth);
                                    if (auth["result"]["status"] == "Succeed") {
                                        /**
                                        * Create Capture
                                        * since v.1.3
                                        */
                                        fetch(
                                            `https://api.paymentsos.com/payments/${payment["id"]}/captures`, {
                                            method: "POST", // or 'PUT'
                                            headers: {
                                                "app_id": "com.github.integrationapi",
                                                "private_key": "ba433b0b-3e53-4614-8a95-27cc3252de53",
                                                "Content-Type": "application/json",
                                                "api-version": "1.3.0",
                                                "x-payments-os-env": "test",
                                                "idempotency_key": `${Math.round(Math.random()*15*10000)}-a`,
                                            },
                                            body: "",
                                        }
                                        )
                                            .then((response) => response.json())
                                            .then((capture) => {
                                                //Capture Response Object
                                                console.log("capture result:");
                                                console.log(capture);
                                                //Capture validation
                                                if (capture["result"]["status"] == "Succeed") {
                                                    //Capture Succedd
                                                    setTimeout(function () { 
                                                        swal({
                                                          title: "Congratulations!",
                                                          text: "Purchase made successfully!",
                                                          type: "success",
                                                          confirmButtonText: "Details"
                                                        },
                                                        function(isConfirm){
                                                          if (isConfirm) {
                                                            window.location.href = `../html/confirm_page.html?id=${payment["id"]}&email=${email}&name=${name}&country=${country}&phone=${phone}&line1=${line1}`;
                                                          }
                                                        }); }, 500);;
                                                } else {
                                                    //Capture error
                                                    swal({
                                                        icon: "error",
                                                        title: capture["result"][
                                                            "description"
                                                        ],
                                                        text: capture["result"][
                                                            "more_info"
                                                        ],
                                                    });
                                                }
                                            })
                                            .catch((err) => console.log(err));
                                    } else {
                                        //Authentication error
                                        swal({
                                            icon: "error",
                                            title: auth["result"][
                                                "description"
                                            ],
                                            text: auth["result"][
                                                "more_info"
                                            ],
                                        });
                                    }
                                })
                                .catch((err) => console.log(err));
                        } else {
                            //Payment creation error
                            swal({
                                icon: "error",
                                title: payment["result"][
                                    "description"
                                ],
                                text: payment["result"][
                                    "more_info"
                                ],
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            }
        });
    });
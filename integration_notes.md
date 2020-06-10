<b>Sales Engineer Test</b>
<b>Astrid Niño.</b>

<b>Integration Notes:</b>

<b>How do I add a payment provider?</b>

<b>Providers:</b> These are the providers you will transact against. A provider configuration is a set of provider API credentials that represents your payment-processing facility with that provider.
Steps:
1.	Login to my PaymentsOS account.
2.	Navigate to Account --> Services --> Create a new Provider configuration. All of the payment providers we integrate with will be listed here. 
3.	Click on the provider you would like to use.
4.	Add the name and description.
5.	Enter the credentials of the provider which you can find on each provider's own dashboard.  Please note each provider has different mandatory credentials. By hovering over each text box, a pop up will appear with a more detailed explanation of each credential.
6.	To consider. If you want to make tests through PayU, since the test environment does not replicate data from your account in production, it is important that you use the following credentials in the request, depending on the country of your account. URL: http://developers.payulatam.com/en/api/sandbox.html
 
![Image of logo](https://github.com/astridnio/Payment-flow-test/blob/master/documentation%20resourses/mnom8NK59l.gif)

<b>How do I add a Business unit?</b>

<b>Business Unit:</b> These are logical business entities within PaymentsOS. Payments received from your customers are associated with a business unit. You can set up multiple business units, to match your business structure. When you create a business unit, we will provide you with an app-id, public-key and private-key. You'll need these business unit credentials when sending any payment related API requests.
1.	Login to my PaymentsOS account.
2.	Navigate to Account --> Business units --> Create a Business unit.
3.	Add the name and description.
4.	Choose a default Provider for this Business Unit

![Image of logo](https://github.com/astridnio/Payment-flow-test/blob/master/documentation%20resourses/JOSYTOe6ay.gif)
 
<b>How do I perform testing?</b>

Testing your integration using the mock provider is a walk in the park with the Postman Collection for Testing Purposes. It includes all the requests you can invoke to simulate common responses statuses and error messages when testing your integration in a development environment.
Postman Collection URL: https://developers.paymentsos.com/docs/testing/postman-collection-for-testing.html

Also PaymentsOS provides a single API for transacting against multiple providers. When constructing a request body, you must thus ensure that you include all fields required by the providers to which a payment may be routed. This may seem like a daunting task, but do not despair! You're about to shake hands with the Bodybuilder, the only heavyweight champion in the world capable of lifting JSON!
Sample Request Creator: https://developers.paymentsos.com/docs/bodybuilder.html

If is needed there exist the mock provider that allows you to simulate a payment flow. A mock provider is not linked to any live payment providers or third-party processors, enabling you to test your integration without registering accounts with any external processors or third-party providers.
Mock Provider URL: https://developers.paymentsos.com/docs/testing/using-mock-provider.html

<b>Troubleshooting </b>

To understand the code errors if you are using PayU Latam provider, you can check: http://developers.payulatam.com/en/api/variables_table.html

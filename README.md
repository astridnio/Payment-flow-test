## Payment-flow-test

# Sales Engineer Test

AN TESTE Account ID:
5abdfdd3-6ee6-4941-90d8-95373f7d1b26

<b>What is a token?</b>

Tokenization is used as an additional security measure against online fraud and refers to a process whereby sensitive data is protected by replacing it with a randomly generated value, called a token.

In online payments, the token replaces the customer’s credit card number (also known as a  primary account number or PAN) with a randomly generated value that is non-sensitive so, in itself, would have no value to potential attackers.
The token value cannot be reversed engineered and is not the same as encryption so it cannot be “broken” by hackers to reveal sensitive information.

<b>What is Authorize in online payments</b>

The Authorize transaction "freezes" the funds in the cardholder's account for a limited period of time. This period of time lasts between 2-30 days, depending on the cardholder's issuing institution.

Successful authorization does not mean a transfer of funds will take place.

<b>What is Capture in online payments</b>

when a payment it's been realized for a transfer of funds to take place, the transaction also has to be "committed" or "captured". This will finalize the transfer of funds and ensure the merchant will receive the funds and it's the final step of the payment. 

<b>What is Charge in online payments</b>

The Sale (or Charge) transaction, is when "Authorize" and "Commit" (or "Capture") transactions performed together. This allows the merchant to request in a single command that the funds be transferred to the merchant account, with no further action necessary on the merchant's part.

<b>What is Void in online payments</b>

Voiding occurs only after a payment is authorized but before it is captured, that is, while the funds have not yet been deducted from the customer's account. As a result of a 'void' action, funds that were authorized and set aside to be captured will be released and unauthorized.

<b>What is Refund in online payments</b>

Refunding occurs only after a payment is finalized and committed, or captured. In this event, the funds that were previously deducted will be returned to the customer's bank account.

## Recommendations

PaymentsOS uses the [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) standard to define countries; which can be different for payment gateways.

Also not all PayU Latam payment gateway have the same functions this means you have to look the country specifics properties to know that a function is available in your country gateway

To work in a test environment and specifics properties please look your's providers documentation in the flowing URL
https://developers.paymentsos.com/docs/providers.html

## Postman Collection Link
https://app.getpostman.com/join-team?invite_code=420cd77f7532ff67d2d2e814ffb71708

https://github.com/astridnio/Payment-flow-test/blob/master/documentation%20resourses/PaymentsOS-PayU-Latam.postman_collection.json

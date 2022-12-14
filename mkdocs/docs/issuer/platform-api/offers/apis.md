# Claim Offers

Once an Issuer has been set up and created schemas, they can start offering Claims to their users. A Claim Offer is a Schema filled with data of actual users delivered to users' Wallets.

## Create Offer

**Function**: Endpoint to create a new Claim Offer based on an existing Claim Schema.

**How it works**: It requires passing the Issuer `id`, namely the identifier of the Issuer previously created, and the schema `id`, namely the identifier of the Schema of the Claim intended to offer, as Path Parameters. 

Furthermore, It requires passing the following as Request Body parameters:

- `attributes` (required) an array of *maximum two objects* that describe the attributes of the Claim Offer. It's important that the number of objects matches the number of attributes defined inside the Schema Creation.
Each object contains: attribute key` (required), name of the attribute as defined in the Schema
    - `attributeValue` (required), value to be assigned to that attribute; its type must match the type defined inside the Schema Creation;

- `expirationDate`, a string that defines the expirationDate of the claim. It is a required value if you specified mandatoryExpiration as true in the Schema Creation.
- `limitedClaims`, a number that can be optionally set to define a limit to the amount of claim, based on this offer, that can be redeemed.
- `claimLinkExpiration`, expiration date in ISO 8601 format for the Claim Offer Link. After that Date a Claim Offer will not be redeemable anymore using that Link.

It also requires passing a valid `Bearer Token` inside the Authorization Request Header.

The Response Body contains a set of information related to your newly created Claim Offer such as its `id`.

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/CreateOffer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#7-create-claim-offer)

## Get Offers By Schema 

**Function**: Endpoint to fetch all the Claim Offers created for an existing Schema.

**How it works**: It requires passing the Issuer `id`, namely the identifier of the Issuer previously created, and the schema `id`, namely the identifier of the existing Schema you are querying, as Path Parameters. 

It also requires passing a valid `Bearer Token` inside the Authorization Request Header.

The Response Body contains an array of Objects where each object contains the details of a Claim Offer generated by a specific Issuer using the queried Schema.

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/GetOffers)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Get Offers By Issuer 

**Function**: Endpoint to fetch all the Claim Offers created by an Issuer.

**How it works**: It requires passing the Issuer `id`, namely the identifier of the Issuer previously created, as Path Parameter. Optionally, it accepts a `query` as Query Parameter which is a search keyword. 

It also requires passing a valid `Bearer Token` inside the Authorization Request Header.

The Response Body contains an array of Objects where each object contains the details of a Claim Offer generated by the queried Issuer.

> Compared to the `Get Offers By Schema` endpoint, this endpoint doesn't require to specify the `id` of a specific schema therefore the Response can contain offers based on different Schemas. 

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/GetOffersByIssuer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Get Offer

**Function**: Endpoint to fetch a specific Claim Offer.

**How it works**: It requires passing the Issuer `id`, namely the identifier of the Issuer previously created, and the schema `id`, namely the identifier of the Schema used to create the Claim Offer, and the claim offer `id`, namely the identifier of the specific Claim Offer you are querying, as Path Parameters.

It also requires passing a valid `Bearer Token` inside the Authorization Request Header.

The Response Body contains an Object with the details of that specific Claim Offer.

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/GetOffer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Update Offer

**Function**: Endpoint to update a specific Claim Offer. 

**How it works**: It requires passing the Issuer `id`, namely the identifier of the Issuer previously created, and the schema `id`, namely the identifier of the Schema used to create the Claim Offer, and the claim offer `id`, namely the identifier of the specific Claim Offer you want to delete, as Path Parameters.

Furthermore, It requires passing a boolean for `active` as Request Body parameter: setting active to true will activate an Offer, setting active to false will deactivate an Offer.

It also requires passing a valid `Bearer Token` inside the Authorization Request Header. As a result of this Request, the Claim Offer, identifier by its `id`, gets deactivated. It means that you will no longer be able to `Create QRCode of Offer` based on that offer.

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/UpdateOffer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Create QRCode of Offer

**Function**: Endpoint to generate a QR Code based on a specific Claim Offer for User Authentication.

**How it works**: It requires passing the claim offer `id`, namely the identifier of the specific Claim Offer you want to generate the QR Code for, as Path Parameter.

The Response Body contains a set of details about the Claim Offer including the `qrCode`. The JSON file included in the `qrCode` can be parsed into a QR Code and presented to the user in order to authenticate. This endpoint will also create a specific `sessionID` for the user that is going to scan that QR Code.

In order to execute this endpoint correctly it is necessary that: 

- The Claim Offer is active (namely, it hasn't been deactivated using [Delete Offer](#delete-offer))
- The Claim Offer hasn't expired (namely, the `expirationDate` set in [Offer Creation](#create-offer) hasn't passed)
- The Claim Offer hasn't exceeded the limit (namely, the `limitedClaims` set in [Offer Creation](#create-offer) hasn't been exceeded)

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/CreateOfferQrCode)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#8-create-qr-code-of-claim-offer)

## Download QRCode of Offer

**Function**: Endpoint to download the QR Code based on a Claim Offer.

**How it works**: The Endpoint requires passing the claim offer `id`, namely the identifier of the specific Claim Offer you want to generate the QR Code for, as Path Parameter and the `sessionID` of the specific user that has been previously authenticated, as Query Parameter.

On successful Request, the Response contains the actual QR Code to be displayed to the user in order to fetch a claim inside their Wallet.

> This endpoint downloads the same `qrCode` returned from the previous Endpoint as PNG Format.

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/DownloadOfferQrCode)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#9-download-qrcode-of-offer)

## Get QRCode of Offer

**Function**: Returns the status of the scan of the QR Code. 

**How it works**: The Endpoint requires passing the claim offer `id`, namely the identifier of the specific Claim Offer you used to generate the QR Code, as Path Parameter and the `sessionID` generated on QR Code Creation, as Query Parameter.

The Response Body contains the status of the scan of the first QR Code:
- `pending` if it hasn't been scanned the status is pending
- `error` if there's been an error in the process
- `success` if the authorization was successful. In this case, it will also return a JSON file inside the `qrCode` field. 

The JSON File can be parsed into a QR Code and presented to the user in order to fetch a claim inside their Wallet.

**[API Reference](https://api-staging.polygonid.com/#tag/Offers/operation/GetOfferQrCode)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)



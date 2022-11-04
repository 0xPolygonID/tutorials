# Tutorial - Issuer Integration Full Flow

This tutorial will walk you through a Full Flow Issuer Integration using Polygon ID APIs.

The tutorial is made of 9 steps: 

1. Onboard your Organization to Polygon ID
2. Set up an Issuer 
3. Create a Schema 
4. Generate a Claim Offer (and a QR Code) so that user can fetch it inside their Wallet 

## Initial Set Up

// Modify it, we don't need the Postman Collection necessarily

We already created a Postman Collection to make your life easier. To start access the [Polygon ID Postman Collection](https://www.postman.com/dark-star-200015/workspace/public/overview). From the left-end side menu click on "Collections" and then "Create a Fork". This will fork the Collection inside your private workspace. The Collection contains all the Endpoints included in the Platform ID APIs divided by category. 

<div align="center">
<img src="../../../imgs/postman-fork2" width="500" align="center" />
</div>
<br> 

Now go back to the Public Polygon ID [Polygon ID Postman Collection](https://www.postman.com/dark-star-200015/workspace/public/overview). From the left-end side menu click on "Environments" and then "Create a Fork" starting from the "env" enviornment available. This will fork the set of env variables necessary to run the API Endpoints.

<div align="center">
<img src="../../../imgs/postman-fork2" width="500" align="center" />
</div>
<br> 

## 1. Create An Organization Account

The first mandatory thing is to create an account for your Organization passing in an `email` and `password`. This action is performed via the [Create Organization](../onboarding-orgs/apis.md#create-org) Endpoint. The password and the email must be passed inside the Body Request. This action has to be executed **only once**. 

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "myPersonalEmail2@gmail.com",
    "password": "Some123456789123123Pwd!"
}'
```

> Remember to modify the `email` otherwise you'll get an error message as this email is already associated to an Organization Account

The response contains the detail of the newly created Organization Account. The `verified` key is equal to `false`. It means that the account still require to be activated. This action will be performed at step 3 of this tutorial.

```
{   
    "id":"348db616-ef29-42d3-9d93-8833f621132a",
    "email":"myPersonalEmail2@gmail.com",
    "type":"OWNER",
    "verified":false,
    "createdAt":"2022-11-04T14:26:32.599158Z",
    "modifiedAt":"2022-11-04T14:26:32.599158Z"
}
```

## 2. Sign-in to an Organization Account

The credential used to create your Organization Account are then used to Sign-in into your Organization Account. This action is performed via the [Sign-in](../onboarding-orgs/apis.md#sign-in) Endpoint. The `email` and `password` used previosly to create the Organization Account need to be now passed inside the Body Request.  This action needs to be executed in order to perform every further action within Polygon ID APIs.


```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "myPersonalEmail2@gmail.com",
    "password": "Some123456789123123Pwd!"
}'
```

The Response Body contains a JWT `Bearer Token`. This token will be used in order to authenticate yourself as a Signed-in Organization Account.

```json
{   
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTg3NzgsImp0aSI6ImYzYjk2ZGFmLWZiNjMtNDk4NS1iMTkxLTZjYmIzNjliZWU3MSIsImlhdCI6MTY2NzU3MjM3OCwibmJmIjoxNjY3NTcyMzc4LCJzdWIiOiIzNDhkYjYxNi1lZjI5LTQyZDMtOWQ5My04ODMzZjYyMTEzMmEiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjpmYWxzZSwib3JnYW5pemF0aW9uIjpudWxsLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDJAZ21haWwuY29tIn19.8T-Es9rxtYFq5kvMqTFdn0O5pGB-k--DQpubY6x1tzU"
}
```

## 3. Activate your Organization Account

Now it is mandatory to Activate your Organization Account. This action is performed via the [Activate](../onboarding-orgs/apis.md#activate-account) Endpoint. The `Bearer Token` generated from the last request needs to be passed inside the Authorization Request Header. This action has to be executed **only once**

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management/activate' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTg3NzgsImp0aSI6ImYzYjk2ZGFmLWZiNjMtNDk4NS1iMTkxLTZjYmIzNjliZWU3MSIsImlhdCI6MTY2NzU3MjM3OCwibmJmIjoxNjY3NTcyMzc4LCJzdWIiOiIzNDhkYjYxNi1lZjI5LTQyZDMtOWQ5My04ODMzZjYyMTEzMmEiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjpmYWxzZSwib3JnYW5pemF0aW9uIjpudWxsLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDJAZ21haWwuY29tIn19.8T-Es9rxtYFq5kvMqTFdn0O5pGB-k--DQpubY6x1tzU' \
--data-raw ''
```

The Response Body contains an updated JWT `Bearer Token` that attests that the Organization Account has been activated.

```json
{   
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTkxMTIsImp0aSI6ImFmYTQ4NGVlLTkxNTktNDczYi04YjdjLTk2OTQyOTk5NTEyYiIsImlhdCI6MTY2NzU3MjcxMiwibmJmIjoxNjY3NTcyNzEyLCJzdWIiOiIzNDhkYjYxNi1lZjI5LTQyZDMtOWQ5My04ODMzZjYyMTEzMmEiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlQZXJzb25hbEVtYWlsMkBnbWFpbC5jb20ifX0.hByQuyuardIV7YZA7FqwQSbicD6JM2XjXx_IOOXFSIU"
}
```
## 4. Create an Issuer

Before start Issuing Claims, it is necessary to setup an Issuer. To setup an issuer it is required to have an Organization Account activated and signed-in. Each Organization Account can only manage a single Issuer. This action is performed via the [Create Issuer](../issuer/apis.md#create-issuer) Endpoint. This Endpoint requires to pass various details about the Issuer such as its `displayName` (required) and other optional parameters such as `legalName`, `logo` and `region`. The displayName and the logo are public values that will be visible to the user, while legalName and region will not be shown to the outside. 

=> Add reference to the token 
=> Add reference to the logo in the right format! 

> Today an Organization can only set up one Issuer. Soon more actions will be enabled for an Organization such as setting up multiple Issuers or a Verifier.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTkxMTIsImp0aSI6ImFmYTQ4NGVlLTkxNTktNDczYi04YjdjLTk2OTQyOTk5NTEyYiIsImlhdCI6MTY2NzU3MjcxMiwibmJmIjoxNjY3NTcyNzEyLCJzdWIiOiIzNDhkYjYxNi1lZjI5LTQyZDMtOWQ5My04ODMzZjYyMTEzMmEiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlQZXJzb25hbEVtYWlsMkBnbWFpbC5jb20ifX0.hByQuyuardIV7YZA7FqwQSbicD6JM2XjXx_IOOXFSIU' \
--header 'Content-Type: application/json' \
--data-raw '{
"displayName": "YourOrganizationName",
"logo": "data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAArwAAA...",
"legalName": "Organization123",
"region": "USA"
}'
```

The Response Body contains an updated JWT `Bearer Token` that attests that the Organization Account has been activated.

```json
{   
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2NTkxMTIsImp0aSI6ImFmYTQ4NGVlLTkxNTktNDczYi04YjdjLTk2OTQyOTk5NTEyYiIsImlhdCI6MTY2NzU3MjcxMiwibmJmIjoxNjY3NTcyNzEyLCJzdWIiOiIzNDhkYjYxNi1lZjI5LTQyZDMtOWQ5My04ODMzZjYyMTEzMmEiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlQZXJzb25hbEVtYWlsMkBnbWFpbC5jb20ifX0.hByQuyuardIV7YZA7FqwQSbicD6JM2XjXx_IOOXFSIU"
}
```

## 5. Refresh the Token

Before performign any further action, it is needed to refresh the `Bearer Token` (WHY?) by calling the [Refresh Token](../onboarding-orgs/apis.md#refresh-token) Endpoint. 

> The actions performed across Step 1 and Step 2 ideally should be performed only once. The next time you will only need to Sign-up with your organization account and be able to Create Schemas or Issue Claims.

## 3. Create a Schema

Before issuing the actual Claim, it is necessary to define an Schema, that is, the structure of a particular claim that defines the usage and the vocabulary of its Attributes. In order to create a Schema, it is necessary to have an Issuer setup. An issuer can create as many Schemas he/she wants!

Let's consider the example of a company that wants to issue Claims to its employees attesting the starting data and their monthly salary. In this case, the company will create a schema defined `EmployeeData` with two attributes:
- `EmployedSince` that accepts a `date` format 
- `MonthlySalary` that accepts a `number` format


- Ideally this action should be performed only as many times as many claim schemas you want to provide to your users


<div align="center">
<img src="../../../imgs/platform-api-4.png" alt="Polygon ID app as a reference implementation" width="500" align="center" />
</div>
<br>

=> Schema/Create  

In order to start offering Claims to your users is necessary to have an existing Claim Schema to fill. Once a new Claim Schema is created it can be referred to use by its `id`. 

## 4. Generate a Claim Offer

The only thing missing to fill up the Claim Schema with actual user data and present it to users: this is what the Claim Offer does!. A Claim Offer must be based on an existing Claim Schema. The Claim Offer consists in a QR Code that gets scanned by the user in order to fetch that specific Claim to their wallet. Each Claim Offer corresponds to an interaction with a single user (explain that in the example).

- Example of integration: You make some sort of check inside your platform and then start issuing claim based on that
=> Specify the strategy needed to extract the QR and display the offer to your user! 

<div align="center">
<img src="../../../imgs/platform-api-5.png" alt="Polygon ID app as a reference implementation" width="500" align="center" />
</div>
<br>

=> Offers/Create
=> Offers/Create QR Code

The generated QR Code is mandatory for an Issuer to initiate a communication with the users. When scanning the QR Code with their Wallet, a user will be asked to authenticate. In order to fetch the actual claim associated with the Claim Offer, the user needs to scan a second QR Code generated as response to the [Get QRCode of Offer](#get-qrcode-of-offer) Endpoint. As each QR Code contains a specific session ID, it is necessary to create a QRCode for each user that you are offering a Claim to. 

=> Offers/Get QR Code of Offer

The generated QR Code is mandatory for an Issuer in order to let users fetch claims inside their Wallet. When scanning the QR Code with their Wallet, a user will be asked if he/she wants to accept the Claim Offer. On acceptance, they will see a new claim added inside their Wallet. Since the generated QR Code is associated with the sessionID of the user that got previously authenticated, it is necessary that the user scanning the second QR is the same that performed the authentication in the first place, otherwise he/she won't be able to fetch the claim inside their wallet.

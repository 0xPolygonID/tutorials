# Getting Started - Full Flow Tutorial

This tutorial will walk you through a Full Flow Issuer Integration using Polygon ID APIs. 

The main role of the issuer is to Issue Claims. In this tutorial, you'll impersonate a DAO that wants to issue claims for its contributors. In particular, the Claim itself will contain two type of information: the "Season" in which the contributor joined the DAO and its role inside the DAO. By the end of the tutorial, every contributor will be able to use their Polygon ID App to scan a QR code and receive a claim inside their wallet attesting their information as DAO contributor.

The tutorial is made of 9 steps: 

1. [Create an Organization Account](#1-create-an-organization-account)
2. [Sign-in to an Organization Account](#2-sign-in-to-an-organization-account)
3. [Activate your Organization Account](#3-activate-your-organization-account)
4. [Create an Issuer](#4-create-an-issuer)
5. [Refresh the Token](#5-refresh-the-token)
6. [Create a Schema](#6-create-a-schema)
7. [Create Claim Offer](#7-create-claim-offer)
8. [Create QR Code of Claim Offer](#8-create-qr-code-of-claim-offer)
9. [Get a QR Code of Offer](#9-get-a-qr-code-of-offer)


## Initial Set Up

We already created a Postman Collection to make your life easier. To start, access the [Polygon ID Postman Collection](https://www.postman.com/dark-star-200015/workspace/public/overview). From the left-hand side menu click on "Collections" and then "Create a Fork". This will fork the Collection inside your private workspace. Once you moved into your private workspace there are different ways in which you can start testing the endpoints:

- Using the built-in Postman Platform allows you to make API calls directly from your browser.

<div align="center">
<img src="../../../../imgs/postman-1.png" width="500" align="center" />
</div>
<br> 

- Using auto-generated code snippets from Postman in Axios, cURL, Python, HTTP and many more.

<div align="center">
<img src="../../../../imgs/postman-2.png" width="500" align="center" />
</div>
<br> 

In this tutorial we are using cURL code snippet to make API calls. Nevertheless any method will generate the same output.

## 1. Create An Organization Account

The first mandatory thing is to create an account for your Organization passing in an `email` and `password`. This action is performed via the [Create Organization](../onboarding-orgs/apis.md#create-org) Endpoint. The password and the email must be passed inside the Body Request. This action has to be executed **only once**. 

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "myPersonalEmail20@gmail.com",
    "password": "Some123456789123123Pwd!"
}'
```

> Remember to modify the `email` otherwise you'll get an error message as this email is already associated to an Organization Account

The response contains the details of the newly created Organization Account. The `verified` key is equal to `false`. It means that the account still require to be activated. This action will be performed at [step 3](#3-activate-your-organization-account) of this tutorial.

```
{   
    "id":"6ef0a956-45a7-472a-9f94-918fa495b043",
    "email":"myPersonalEmail20@gmail.com",
    "type":"OWNER",
    "verified":false,
    "createdAt":"2022-11-07T07:54:12.506473Z",
    "modifiedAt":"2022-11-07T07:54:12.506473Z"
}
```

## 2. Sign-in to an Organization Account

The credential used to create your Organization Account are then used to Sign-in into your Organization Account. This action is performed via the [Sign-in](../onboarding-orgs/apis.md#sign-in) Endpoint. The `email` and `password` used previosly to create the Organization Account need to be passed inside the Body Request.  This action needs to be executed in order to perform every further action within Polygon ID APIs.


```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "myPersonalEmail20@gmail.com",
    "password": "Some123456789123123Pwd!"
}'
```

The Response Body contains a JWT `Bearer Token`. This token will be used in order to authenticate yourself as a Signed-in Organization Account and get the authorization to use the API Endpoints.

```json
{   
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQwOTYsImp0aSI6ImNlOTUxYTQxLTg4YjctNDVlOC05M2I2LTZlZWJlNDNiN2ZkNSIsImlhdCI6MTY2NzgwNzY5NiwibmJmIjoxNjY3ODA3Njk2LCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjpmYWxzZSwib3JnYW5pemF0aW9uIjpudWxsLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDIwQGdtYWlsLmNvbSJ9fQ.HOrfyUvRB2CixN4epmarrzsjLmrdYkFFgcoxbo73aQY"
}
```

## 3. Activate your Organization Account

Now it is mandatory to Activate your Organization Account. This action is performed via the [Activate](../onboarding-orgs/apis.md#activate-account) Endpoint. The `Bearer Token` generated from the last request needs to be passed inside the Authorization Request Header. This action has to be executed **only once**.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management/activate' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQwOTYsImp0aSI6ImNlOTUxYTQxLTg4YjctNDVlOC05M2I2LTZlZWJlNDNiN2ZkNSIsImlhdCI6MTY2NzgwNzY5NiwibmJmIjoxNjY3ODA3Njk2LCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjpmYWxzZSwib3JnYW5pemF0aW9uIjpudWxsLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDIwQGdtYWlsLmNvbSJ9fQ.HOrfyUvRB2CixN4epmarrzsjLmrdYkFFgcoxbo73aQY' \
--data-raw ''
```

The Response Body contains an updated JWT `Bearer Token` that attests that the Organization Account has been activated.

```json
{   
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQxMjAsImp0aSI6IjJkMmQ5NTExLTI5YjYtNDM3MC1iZmJkLTFmODUzYTcyODZhNCIsImlhdCI6MTY2NzgwNzcyMCwibmJmIjoxNjY3ODA3NzIwLCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlQZXJzb25hbEVtYWlsMjBAZ21haWwuY29tIn19.1uKvY4kx6Ikz9hEG3E4zYVi91GSK0T-jQUB1BZwohNk"
}
```

## 4. Create an Issuer

Before start Issuing Claims, it is necessary to setup an Issuer. To setup an issuer it is required to have an Organization Account activated and signed-in. Each Organization Account can only manage a single Issuer. This action is performed via the [Create Issuer](../issuer/apis.md#create-issuer) Endpoint. 

This Endpoint requires to pass various details about the Issuer such as its `displayName` (required) and other optional parameters such as `legalName`, `logo` and `region`. The displayName and the logo are public values that will be visible to the user, while legalName and region will not be shown to the outside. The logo data file needs to be filled with an image encoded in base64 format. Lastly, the `Bearer Token` generated from the last request needs to be passed inside the Authorization Request Header. This action has to be executed **only once**.

> Today an Organization can only set up one Issuer. Soon more actions will be enabled for an Organization such as setting up multiple Issuers or a Verifier.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQxMjAsImp0aSI6IjJkMmQ5NTExLTI5YjYtNDM3MC1iZmJkLTFmODUzYTcyODZhNCIsImlhdCI6MTY2NzgwNzcyMCwibmJmIjoxNjY3ODA3NzIwLCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlQZXJzb25hbEVtYWlsMjBAZ21haWwuY29tIn19.1uKvY4kx6Ikz9hEG3E4zYVi91GSK0T-jQUB1BZwohNk' \
--header 'Content-Type: application/json' \
--data-raw '{
    "displayName" : "IssuerTest123",
    "legalName" : "IssuerLegalOrg",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    "region": "USA"
}'
```

The Response Body contains the details of the newly created Issuer. Later on, you'll be referring to this Issuer by its `id`.


```json
{
    "createdAt": "2022-11-07T07:59:00.54742Z",
    "did": "118AYbL3b8QNa9GETrYBTm3Xsk4FNF3RgkNBtCZHuf",
    "displayName": "IssuerTest123",
    "id": "21b5758e-457f-4dd9-9b16-47679028502f",
    "legalName": "IssuerLegalOrg",
    "logo": "https://s3.eu-west-1.amazonaws.com/polygonid-assets/logo/30653f45-735b-4fcd-9683-d3f490a515af",
    "modifiedAt": "2022-11-07T07:59:00.54742Z",
    "ownerEmail": "myPersonalEmail20@gmail.com",
    "region": "USA",
    "slug": "issuertest123"
}
```

## 5. Refresh the Token

The next step is to Refresh the Bearer Token in order to add to it the updated information regarding the newly created Issuer such as its `id`. This action is performed via the [Refresh Token](../onboarding-orgs/apis.md#refresh-token) Endpoint. The last valid `Bearer Token` (the one generated in step 3) needs to be passed inside the Authorization Request Header. 

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management/refresh-token' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQxMjAsImp0aSI6IjJkMmQ5NTExLTI5YjYtNDM3MC1iZmJkLTFmODUzYTcyODZhNCIsImlhdCI6MTY2NzgwNzcyMCwibmJmIjoxNjY3ODA3NzIwLCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlQZXJzb25hbEVtYWlsMjBAZ21haWwuY29tIn19.1uKvY4kx6Ikz9hEG3E4zYVi91GSK0T-jQUB1BZwohNk'
```

The Response Body contains a refreshed JWT `Bearer Token` with the udpated details regarding the Issuer added to the Organization Account.

```json
{   
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQ3MTEsImp0aSI6IjNhMTY2ODBmLTIzOGQtNGIxZi1iMzBkLTkwZWEzZjg2ZjM1YiIsImlhdCI6MTY2NzgwODMxMSwibmJmIjoxNjY3ODA4MzExLCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOiIyMWI1NzU4ZS00NTdmLTRkZDktOWIxNi00NzY3OTAyODUwMmYiLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDIwQGdtYWlsLmNvbSJ9fQ.I-6hlpJLwZvw7As53K7xA7J3zhayrUIYFIFYd_qCeBc"
}
```

## 6. Create a Schema

Before issuing the actual Claims, it is necessary to define a Schema. In simple terms, a Schema defines the structure of the Claim, while a Claim is generated by starting from the structure defined by a Schema and filling it up with actual data.  

<div align="center">
<img src="../../../../imgs/schema-vs-claim.png" width="700" align="center" />
</div>
<br>

In this case the Schema will define that the Claim must contain two different attributes:

- an attribute defined `Role` that contains the role of a contributor inside a DAO. The Role can be Developer (1), Designer (2), Writer (3) or Education (4). 
- an attributed defined `SinceSeason` that contains the number of the DAO Season in which the contributor Joined. 

This action is performed via the [Create Schema](../schemas/apis.md#create-schema) Endpoint. It requires to pass a set of values inside the Body Request: 

- the name of the `schema`, which in this case is daoContributorSchema
- the `mandatoryExpiration` of the schema, which in this case we set to false
- an array of `attributes`, which contains the details of the attributes defined previously, such as their `name`, `description` and `type`. The attribute Role is of type multichoice so we'll also need to specify the range of possible `values` of this attribute inside an array. The attribule SinceSeason is of type number.

> A Schema can contain a maximum of four attributes. Attributes of type "multichoice" can accept a range of maximum four possible values. 

The refreshed `Bearer Token` from the last step needs to be passed inside the Authorization Request Header. Furthermore, it requires to pass the issuer `id` as Path Parameter. An Issuer can create as many schemas he/she wants!

> you can retreive it from the response obtained in Step 4 or by parsing the latest JWT token [here](https://jwt.io/) and checking the `organization` field.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers/21b5758e-457f-4dd9-9b16-47679028502f/schemas' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQ3MTEsImp0aSI6IjNhMTY2ODBmLTIzOGQtNGIxZi1iMzBkLTkwZWEzZjg2ZjM1YiIsImlhdCI6MTY2NzgwODMxMSwibmJmIjoxNjY3ODA4MzExLCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOiIyMWI1NzU4ZS00NTdmLTRkZDktOWIxNi00NzY3OTAyODUwMmYiLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDIwQGdtYWlsLmNvbSJ9fQ.I-6hlpJLwZvw7As53K7xA7J3zhayrUIYFIFYd_qCeBc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "schema": "daoContributorSchema",
    "mandatoryExpiration": false,
    "attributes": [
        {
            "name": "Role",
            "type": "multichoice",
            "description": "Role as contributor in the DAO",
            "values": [
            "Developer",
            "Designer",
            "Writer",
            "Education"
            ]
        },
        {
            "name": "SinceSeason",
            "type": "number",
            "description": "Number of season in which the contributor joined the DAO"
        }
    ]
}'
```

The response contains the details of the newly created schema. Later on, you'll be referring to this Schema by its `id`

```json
    {
        "id":"a371c302-68e2-426d-a0bd-d265e55f4c7a",
        "schema":"daoContributorSchema",
        "version":"1.1",
        "mandatoryExpiration":false,
        "schemaURL":"https://s3.eu-west-1.amazonaws.com/polygonid-schemas/38776e96-6a65-4ff0-a9e1-6776fe260a52.json-ld",
        "schemaHash":"67520be7b4e7d67bafff6c8d82bcde9e",
        "issuerID":"21b5758e-457f-4dd9-9b16-47679028502f",
        "attributes":[
            {
                "description":"Role as contributor in the DAO",
                "name":"Role",
                "type":"multichoice",
                "values":["Developer","Designer","Writer","Education"]
            },
            {
                "description":"Number of season in which the contributor joined the DAO",
                "name":"SinceSeason",
                "type":"number"
            }
        ],
        "createdAt":"2022-11-07T08:53:19.799362Z"
    }
```

## 7. Create Claim Offer

Now it's time to actually create a Claim. We already have a schema, now we just need to fill it up with data of a user. We do that by assigning values to the attributed defined in the Schema Creation.

Let's consider the case of Issuing a Claim to a user that has been part of a DAO since season 4 with a role of Developer. This action is performed via the [Create Offer](../offers/apis.md#create-offer) Endpoint. It requires to pass an array of `attributes` inside the Body Request. Each attribute object contains the `attributeKey` namely the name of the Schema Attribute it refers to, and the `attributeValue`, namely the value to be assigned to that specific attributeKey. 

> Setting up the logic to verify the role of a Contributor inside the DAO and the Season he/she joined it are responsability of the implementer.

A valid `Bearer Token` needs to be passed inside the Authorization Request Header. Furthermore, it requires to pass the Issuer `id` and the Schema `id` as Path Parameters. You can find the Schema id inside the Response Body in step 6.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers/21b5758e-457f-4dd9-9b16-47679028502f/schemas/a371c302-68e2-426d-a0bd-d265e55f4c7a/offers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc4OTQ3MTEsImp0aSI6IjNhMTY2ODBmLTIzOGQtNGIxZi1iMzBkLTkwZWEzZjg2ZjM1YiIsImlhdCI6MTY2NzgwODMxMSwibmJmIjoxNjY3ODA4MzExLCJzdWIiOiI2ZWYwYTk1Ni00NWE3LTQ3MmEtOWY5NC05MThmYTQ5NWIwNDMiLCJhY2NvdW50Ijp7InZlcmlmaWVkIjp0cnVlLCJvcmdhbml6YXRpb24iOiIyMWI1NzU4ZS00NTdmLTRkZDktOWIxNi00NzY3OTAyODUwMmYiLCJyb2xlIjoiT1dORVIiLCJlbWFpbCI6Im15UGVyc29uYWxFbWFpbDIwQGdtYWlsLmNvbSJ9fQ.I-6hlpJLwZvw7As53K7xA7J3zhayrUIYFIFYd_qCeBc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "attributes": [
        {
            "attributeKey": "Role", 
            "attributeValue": 1
        },
        {
            "attributeKey": "SinceSeason", 
            "attributeValue": 4
        }
    ]
}'
```

> You can only pass numeric values as `attributeValue`. That's why we cannot define the attributeValue for the key Role as "Developer". Instead, we assign 1 as attributeValue as "Developer" is the first value of the array of possible values defined inside the Schema. If the Role was "Writer" the correspondign attributeValue would be 3.

The response contains the details of the newly created Claim. In particular, you can see that the DAO contributor data are defined inside the `attributeValues` field. Later on, you'll be referring to this Claim by its `id`

```json
    {
        "id":"dc781766-d814-4acd-aa9d-bf0474e06a3b",
        "schemaTemplateID":"a371c302-68e2-426d-a0bd-d265e55f4c7a",
        "attributes":[
            {   
                "description":"Role as contributor in the DAO",
                "name":"Role",
                "type":"multichoice",
                "values":["Developer","Designer","Writer","Education"]
            },
            {
                "description":"Number of season in which the contributor joined the DAO",
                "name":"SinceSeason",
                "type":"number"
            }
        ],
        "attributeValues":[{"attributeKey":"Role","attributeValue":1},{"attributeKey":"SinceSeason","attributeValue":4}],
        "createdAt":"2022-11-07T10:25:07.475746Z",
        "expiresAt":null
    }
```

## 8. Create QR Code of Claim Offer

The claim has now been created. Now we need to share it with the designated DAO Contributor. This action is performed via the [Create QRCode of Offer](../offers/apis.md#create-qrcode-of-offer) Endpoint. This Endpoint only requires to pass the Claim `id` as Path Parameter.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/offers-qrcode/dc781766-d814-4acd-aa9d-bf0474e06a3b'
```

The response contains the details of the claim Offer. In particular it generates a `sessionID` and associates it to a `qrcode`. This QR Code has to be displayed to the specific DAO Contributor that is entitled to receive the claim. The sessionID expires in 2 minutes after which the qrcode will no longer be scannable.

```json 
    {
        "issuer":{"logo":"https://s3.eu-west-1.amazonaws.com/polygonid-assets/logo/30653f45-735b-4fcd-9683-d3f490a515af","displayName":"IssuerTest123"},
        "offerDetails":
            {
                "id":"dc781766-d814-4acd-aa9d-bf0474e06a3b",
                "schemaTemplateID":"a371c302-68e2-426d-a0bd-d265e55f4c7a",
                "schemaTemplateName":"daoContributorSchema",
                "attributes":[{"description":"Role as contributor in the DAO","name":"Role","type":"multichoice","values":["Developer","Designer","Writer","Education"]},{"description":"Number of season in which the contributor joined the DAO","name":"SinceSeason","type":"number"}],
                "attributeValues":[{"attributeKey":"Role","attributeValue":1},{"attributeKey":"SinceSeason","attributeValue":4}],
                "createdAt":"2022-11-07T10:25:07.475746Z",
                "expiresAt":null
            },
        "qrcode":{"id":"15386f87-85d7-457d-a940-0e873727ec2c","typ":"application/iden3comm-plain-json","type":"https://iden3-communication.io/authorization/1.0/request","thid":"15386f87-85d7-457d-a940-0e873727ec2c","body":{"callbackUrl":"https://api-staging.polygonid.com/v1/offers-qrcode/dc781766-d814-4acd-aa9d-bf0474e06a3b/callback?sessionID=391fe2d9-4f0f-4810-9c9f-db3137d8b068","reason":"auth login","scope":[]},"from":"118AYbL3b8QNa9GETrYBTm3Xsk4FNF3RgkNBtCZHuf"},
        "sessionID":"391fe2d9-4f0f-4810-9c9f-db3137d8b068"
    }
```

> The JSON file included in the `qrcode` field can be transformed in an actual scannable QR code using any [JSON to QRCode converter](https://codesandbox.io/s/yp1pmpjo4z?file=/index.js).

The user has to scan this QR code with their Polygon ID App. On scanning, the user will be asked to authenticate themselves as owner of an identity. Once the authentication has been performed with success the user will receive a notification requesting to add the claim inside their wallet. By clicking on the notification the claim will be added inside user's wallet.

As each QR Code contains a specific session ID, it is necessary to create a QRCode for each user that you are offering a Claim to. 

The same Claim Offer can also be delivered to users via Deep Linking. In order to do so is necessary to encode the `qrcode` file to Base64 Format. The related deep link would be `iden3comm://?i_m={{base64EncodedRequestHere}}`. For example, in this specific case the deep link would be `iden3comm://?i_m=eyJpZCI6IjE1Mzg2Zjg3LTg1ZDctNDU3ZC1hOTQwLTBlODczNzI3ZWMyYyIsInR5cCI6ImFwcGxpY2F0aW9uL2lkZW4zY29tbS1wbGFpbi1qc29uIiwidHlwZSI6Imh0dHBzOi8vaWRlbjMtY29tbXVuaWNhdGlvbi5pby9hdXRob3JpemF0aW9uLzEuMC9yZXF1ZXN0IiwidGhpZCI6IjE1Mzg2Zjg3LTg1ZDctNDU3ZC1hOTQwLTBlODczNzI3ZWMyYyIsImJvZHkiOnsiY2FsbGJhY2tVcmwiOiJodHRwczovL2FwaS1zdGFnaW5nLnBvbHlnb25pZC5jb20vdjEvb2ZmZXJzLXFyY29kZS9kYzc4MTc2Ni1kODE0LTRhY2QtYWE5ZC1iZjA0NzRlMDZhM2IvY2FsbGJhY2s/c2Vzc2lvbklEPTM5MWZlMmQ5LTRmMGYtNDgxMC05YzlmLWRiMzEzN2Q4YjA2OCIsInJlYXNvbiI6ImF1dGggbG9naW4iLCJzY29wZSI6W119LCJmcm9tIjoiMTE4QVliTDNiOFFOYTlHRVRyWUJUbTNYc2s0Rk5GM1Jna05CdENaSHVmIn0=`

## 9. Download QRCode of Offer

The notification will only show up if the user has turned on the notification for Polygon ID App. If that's not the case, the user will need to scan a second QR Code to fetch the claim inside their wallet. This action is performed via the [Download a QRCode of Offer](../offers/apis.md#download-qrcode-of-offer) Endpoint.

This Endpoint requires to pass the Claim `id` as Path Parameter and the `sessionID` as Query Parameter. The sessionID of that specific user can be retrieved from the Response obtained in the previous step. Since a sessionID is associated with this second QRCode, it is necessary that the user scanning this QRcode is the same that performed the authentication from the previous step, otherwise he/she won't be able to fetch the claim inside their wallet.

```
curl --location --request GET 'https://api-staging.polygonid.com/v1/offers-qrcode/dc781766-d814-4acd-aa9d-bf0474e06a3b/download?sessionID=391fe2d9-4f0f-4810-9c9f-db3137d8b068' --output Desktop/qrCodeFile
```

> the --output flag is necessary to tell where to save the output file

The response contains the actual QRCode to be displayed to the user.

> Congratulations! You have been able to issue a claim to your user. Now he/she can authenticate themselves as Member of your DAO across any [Verifier](../../../verifier/verifier-overview.md)
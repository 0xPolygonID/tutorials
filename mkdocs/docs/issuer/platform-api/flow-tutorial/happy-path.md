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
    "email": "mypersonalemail2@test.com",
    "password": "Some123456789123123Pwd!"
}'
```

> Remember to modify the `email` otherwise you'll get an error message as this email is already associated to an Organization Account

The response contains the details of the newly created Organization Account. The `verified` key is equal to `false`. It means that the account still requires to be activated. This action will be performed in [step 3](#3-activate-your-organization-account)](#3-activate-your-organization-account) of this tutorial.

```
{
    "createdAt": "2022-11-28T10:34:01.825579Z",
    "email": "mypersonalemail2@test.com",
    "id": "d926a8c4-6545-4e00-aa26-53b7055d10cd",
    "modifiedAt": "2022-11-28T10:34:01.825579Z",
    "type": "OWNER",
    "verified": false
}
```

## 2. Sign-in to an Organization Account

The credential used to create your Organization Account are then used to Sign-in into your Organization Account. This action is performed via the [Sign-in](../onboarding-orgs/apis.md#sign-in) Endpoint. The `email` and `password` used previously to create the Organization Account need to be passed inside the Body Request.  This action needs to be executed in order to perform every further action within Polygon ID APIs.


```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "mypersonalemail2@test.com",
    "password": "Some123456789123123Pwd!"
}'
```

The Response Body contains a JWT `Bearer Token`. This token will be used in order to authenticate yourself as a Signed-in Organization Account and get the authorization to use the API Endpoints.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgxMTYsImp0aSI6IjFmYTQ2NDAwLWU5YTgtNGExYS05OTEwLWQ3MjA3MDM2OTA1NCIsImlhdCI6MTY2OTYzMTcxNiwibmJmIjoxNjY5NjMxNzE2LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOmZhbHNlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlwZXJzb25hbGVtYWlsMkB0ZXN0LmNvbSJ9fQ.3h5_EZjCT2vzX3xHodJ6XhZRdKoZRxPH0bobEUHUDIQ"
}
```

## 3. Activate your Organization's Account

Now it is mandatory to Activate your Organization Account. This action is performed via the [Activate](../onboarding-orgs/apis.md#activate-account) Endpoint. The `Bearer Token` generated from the last request needs to be passed inside the Authorization Request Header. This action has to be executed **only once**.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management/activate' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgxMTYsImp0aSI6IjFmYTQ2NDAwLWU5YTgtNGExYS05OTEwLWQ3MjA3MDM2OTA1NCIsImlhdCI6MTY2OTYzMTcxNiwibmJmIjoxNjY5NjMxNzE2LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOmZhbHNlLCJvcmdhbml6YXRpb24iOm51bGwsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlwZXJzb25hbGVtYWlsMkB0ZXN0LmNvbSJ9fQ.3h5_EZjCT2vzX3xHodJ6XhZRdKoZRxPH0bobEUHUDIQ' \
--data-raw ''
```

The Response Body contains an updated JWT `Bearer Token` that attests that the Organization Account has been activated.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgxNzUsImp0aSI6IjJmZTE1NmYzLWM0ZTUtNGZjNi05NDYzLWNlZmIzN2EzMWE2MCIsImlhdCI6MTY2OTYzMTc3NSwibmJmIjoxNjY5NjMxNzc1LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6bnVsbCwicm9sZSI6Ik9XTkVSIiwiZW1haWwiOiJteXBlcnNvbmFsZW1haWwyQHRlc3QuY29tIn19.daxoACgJFW9E5rWc2E2bUCNl6boIsHe-bE6UmUrgC04"
}
```

## 4. Create an Issuer

Before starting Issuing Claims, it is necessary to set up an Issuer. To set up an issuer it is required to have an Organization Account activated and signed-in. Each Organization Account can only manage a single Issuer. This action is performed via the [Create Issuer](../issuer/apis.md#create-issuer) Endpoint. 

This Endpoint requires to pass various details about the Issuer such as its `displayName` (required) and other optional parameters such as `legalName`, `logo` and `region`. The displayName and the logo are public values that will be visible to the user, while legalName and region will not be shown to the outside. The logo data file needs to be filled with an image encoded in base64 format. Lastly, the `Bearer Token` generated from the last request needs to be passed inside the Authorization Request Header. This action has to be executed **only once**.

> Today an Organization can only set up one Issuer. Soon more actions will be enabled for an Organization such as setting up multiple Issuers or a Verifier.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgxNzUsImp0aSI6IjJmZTE1NmYzLWM0ZTUtNGZjNi05NDYzLWNlZmIzN2EzMWE2MCIsImlhdCI6MTY2OTYzMTc3NSwibmJmIjoxNjY5NjMxNzc1LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6bnVsbCwicm9sZSI6Ik9XTkVSIiwiZW1haWwiOiJteXBlcnNvbmFsZW1haWwyQHRlc3QuY29tIn19.daxoACgJFW9E5rWc2E2bUCNl6boIsHe-bE6UmUrgC04' \
--header 'Content-Type: application/json' \
--data-raw '{
    "displayName" : "IssuerTest1234",
    "legalName" : "IssuerLegalOrg1",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    "region" : "USA"
}'
```

The Response Body contains the details of the newly created Issuer. Later on, you'll be referring to this Issuer by its `id`.


```json
{
    "createdAt": "2022-11-28T10:38:10.639675Z",
    "did": "114uHUxT37dnr4JJiAcsE9mNK2PKWm9umrHNuM8S35",
    "displayName": "IssuerTest1234",
    "id": "40b4018f-83f1-4db5-a878-c2d002ef6532",
    "legalName": "IssuerLegalOrg1",
    "logo": "https://s3.eu-west-1.amazonaws.com/polygonid-assets/logo/12fa8d61-0b32-4827-a6ea-9f31acdb3f1b",
    "modifiedAt": "2022-11-28T10:38:10.639675Z",
    "ownerEmail": "mypersonalemail2@test.com",
    "region": "USA",
    "slug": "issuertest1234"
}
```

## 5. Refresh the Token

The next step is to Refresh the Bearer Token in order to add to it the updated information regarding the newly created Issuer such as its `id`. This action is performed via the [Refresh Token](../onboarding-orgs/apis.md#refresh-token) Endpoint. The last valid `Bearer Token` (the one generated in step 3) needs to be passed inside the Authorization Request Header. 

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management/refresh-token' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgxNzUsImp0aSI6IjJmZTE1NmYzLWM0ZTUtNGZjNi05NDYzLWNlZmIzN2EzMWE2MCIsImlhdCI6MTY2OTYzMTc3NSwibmJmIjoxNjY5NjMxNzc1LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6bnVsbCwicm9sZSI6Ik9XTkVSIiwiZW1haWwiOiJteXBlcnNvbmFsZW1haWwyQHRlc3QuY29tIn19.daxoACgJFW9E5rWc2E2bUCNl6boIsHe-bE6UmUrgC04'
```

The Response Body contains a refreshed JWT `Bearer Token` with the updated details regarding the Issuer added to the Organization Account.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgzMzUsImp0aSI6IjcyZDM4NzVhLTI4MTQtNDY0YS04NzIxLWExYmY3NDY2M2ZiYiIsImlhdCI6MTY2OTYzMTkzNSwibmJmIjoxNjY5NjMxOTM1LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6IjQwYjQwMThmLTgzZjEtNGRiNS1hODc4LWMyZDAwMmVmNjUzMiIsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlwZXJzb25hbGVtYWlsMkB0ZXN0LmNvbSJ9fQ.BjwZuIiI1ekSbrlAz_eCFLmWoEiH-PgUDgf-3g5TV8E"
}
```

## 6. Create a Schema

Before issuing the actual Claims, it is necessary to define a Schema. In simple terms, a Schema defines the structure of the Claim, while a Claim is generated by starting from the structure defined by a Schema and filling it up with actual data.  

<div align="center">
<img src="../../../../imgs/schema-vs-claim.png" width="700" align="center" />
</div>
<br>

In this case, the Schema, named `daoContributor2` will define that the Claim must contain two different attributes:

- An attribute defined `CoreContributor` that defines whether the user is a core contributor for the DAO or not.
- An attributed define `SinceSeason` that contains the number of the DAO Season in which the contributor Joined. 

This action is performed via the [Create Schema](../schemas/apis.md#create-schema) Endpoint. It requires passing a set of values inside the Body Request: 

- The name of the `schema`, which in this case is daoContributor2
- The `mandatoryExpiration` of the schema, which in this case we set to false
- An array of `attributes`, which contains the details of the attributes defined previously, such as their `name`, `description` and `type`. The attribute `CoreContributor` is of type boolean while `SinceSeason` is of type number

The refreshed `Bearer Token` from the last step needs to be passed inside the Authorization Request Header. Furthermore, it requires to pass the issuer `id` as Path Parameter. An Issuer can create as many schemas he/she wants!

> you can retreive the Issuer ID from the response obtained in Step 4 or by parsing the latest JWT token [here](https://jwt.io/) and checking the `organization` field.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers/40b4018f-83f1-4db5-a878-c2d002ef6532/schemas' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgzMzUsImp0aSI6IjcyZDM4NzVhLTI4MTQtNDY0YS04NzIxLWExYmY3NDY2M2ZiYiIsImlhdCI6MTY2OTYzMTkzNSwibmJmIjoxNjY5NjMxOTM1LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6IjQwYjQwMThmLTgzZjEtNGRiNS1hODc4LWMyZDAwMmVmNjUzMiIsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlwZXJzb25hbGVtYWlsMkB0ZXN0LmNvbSJ9fQ.BjwZuIiI1ekSbrlAz_eCFLmWoEiH-PgUDgf-3g5TV8E' \
--header 'Content-Type: application/json' \
--data-raw '{
  "schema": "daoContributor2",
  "mandatoryExpiration": false,
  "attributes": [
    {
      "name": "CoreContributor",
      "type": "boolean",
      "description": "Role as contributor in the DAO"
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
    "active": true,
    "attributes": [
        {
            "description": "Role as contributor in the DAO",
            "name": "CoreContributor",
            "type": "boolean"
        },
        {
            "description": "Number of season in which the contributor joined the DAO",
            "name": "SinceSeason",
            "type": "number"
        }
    ],
    "createdAt": "2022-11-28T11:35:17.066679Z",
    "id": "88a9b947-31b9-443e-8473-4344949815b4",
    "issuerID": "40b4018f-83f1-4db5-a878-c2d002ef6532",
    "mandatoryExpiration": false,
    "modifiedAt": "2022-11-28T11:35:17.066679Z",
    "schema": "daoContributor2",
    "schemaHash": "f877157e9a88239180178212736c5e7e",
    "schemaURL": "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/8589aba5-e973-4dab-9cac-0955731f4d27.json-ld",
    "technicalName": "",
    "version": "1.1"
}
```

## 7. Create Claim Offer

Now it's time to actually create a Claim. We already have a schema, now we just need to fill it up with data of a user. We do that by assigning values to the attributes defined in the Schema Creation.

Let's consider the case of Issuing a Claim to a user that has been part of a DAO since season 4 as a Core Contributor. This action is performed via the [Create Offer](../offers/apis.md#create-offer) Endpoint. It requires passing an array of `attributes` inside the Body Request. Each attribute object contains the `attributeKey`, namely the name of the Schema Attribute it refers to, and the `attributeValue`, namely the value to be assigned to that specific attributeKey. 

> Setting up the logic to verify the role of a Contributor inside the DAO and the Season he/she joined it are responsability of the implementer.

A valid `Bearer Token` needs to be passed inside the Authorization Request Header. Furthermore, it requires to pass the Issuer `id` and the Schema `id` as Path Parameters. You can find the Schema id inside the Response Body in step 6.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/issuers/40b4018f-83f1-4db5-a878-c2d002ef6532/schemas/88a9b947-31b9-443e-8473-4344949815b4/offers' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3MTgzMzUsImp0aSI6IjcyZDM4NzVhLTI4MTQtNDY0YS04NzIxLWExYmY3NDY2M2ZiYiIsImlhdCI6MTY2OTYzMTkzNSwibmJmIjoxNjY5NjMxOTM1LCJzdWIiOiJkOTI2YThjNC02NTQ1LTRlMDAtYWEyNi01M2I3MDU1ZDEwY2QiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6IjQwYjQwMThmLTgzZjEtNGRiNS1hODc4LWMyZDAwMmVmNjUzMiIsInJvbGUiOiJPV05FUiIsImVtYWlsIjoibXlwZXJzb25hbGVtYWlsMkB0ZXN0LmNvbSJ9fQ.BjwZuIiI1ekSbrlAz_eCFLmWoEiH-PgUDgf-3g5TV8E' \
--header 'Content-Type: application/json' \
--data-raw '{
    "attributes": [
        {
            "attributeKey": "CoreContributor", 
            "attributeValue": 1
        },
        {
            "attributeKey": "SinceSeason", 
            "attributeValue": 4
        }
    ]
}'
```

> You can only pass numeric values as `attributeValue`. That's why we cannot define the attributeValue for the key CoreContributor as true. Instead, we assign 1 which corresponds to true. If it was false, the corresponsing value would have been 0

The response contains the details of the newly created Claim. In particular, you can see that the DAO contributor data are defined inside the `attributeValues` field. Later on, you'll be referring to this Claim by its `id`

```json
{
    "attributeValues": [
        {
            "attributeKey": "CoreContributor",
            "attributeValue": 1
        },
        {
            "attributeKey": "SinceSeason",
            "attributeValue": 4
        }
    ],
    "attributes": [
        {
            "description": "Role as contributor in the DAO",
            "name": "CoreContributor",
            "type": "boolean"
        },
        {
            "description": "Number of season in which the contributor joined the DAO",
            "name": "SinceSeason",
            "type": "number"
        }
    ],
    "createdAt": "2022-11-28T11:39:03.845512Z",
    "expiresAt": null,
    "id": "cc3570ed-2bae-4b4c-b2f9-11f636a30151",
    "limitedClaims": null,
    "schemaTemplateID": "88a9b947-31b9-443e-8473-4344949815b4"
}
```

## 8. Create QR Code of Claim Offer

The claim has now been created. Now we need to share it with the designated DAO Contributor. This action is performed via the [Create QRCode of Offer](../offers/apis.md#create-qrcode-of-offer) Endpoint. This Endpoint only requires to pass the Claim `id` as Path Parameter.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/offers-qrcode/cc3570ed-2bae-4b4c-b2f9-11f636a30151'
```

The response contains the details of the claim Offer, identified via its `id`. In particular, it generates a `sessionID` for the user to authenticate and fetch the claim inside their wallet. With this endpoint, a `qrcode` gets created and associated with that user. This QR Code has to be displayed to the specific DAO Contributor that is entitled to receive the claim. The sessionID expires in 2 minutes after which the qrcode will no longer be scannable.

```json 
{
    "issuer": {
        "displayName": "IssuerTest1234",
        "logo": "https://s3.eu-west-1.amazonaws.com/polygonid-assets/logo/12fa8d61-0b32-4827-a6ea-9f31acdb3f1b"
    },
    "offerDetails": {
        "attributeValues": [
            {
                "attributeKey": "CoreContributor",
                "attributeValue": 1
            },
            {
                "attributeKey": "SinceSeason",
                "attributeValue": 4
            }
        ],
        "attributes": [
            {
                "description": "Role as contributor in the DAO",
                "name": "CoreContributor",
                "type": "boolean"
            },
            {
                "description": "Number of season in which the contributor joined the DAO",
                "name": "SinceSeason",
                "type": "number"
            }
        ],
        "createdAt": "2022-11-28T11:39:03.845512Z",
        "expiresAt": null,
        "id": "cc3570ed-2bae-4b4c-b2f9-11f636a30151",
        "limitedClaims": null,
        "schemaTemplateID": "88a9b947-31b9-443e-8473-4344949815b4",
        "schemaTemplateName": "daoContributor2"
    },
    "qrcode": {
        "body": {
            "callbackUrl": "https://api-staging.polygonid.com/v1/offers-qrcode/cc3570ed-2bae-4b4c-b2f9-11f636a30151/callback?sessionID=9d0a2cb5-9020-4e7e-af54-c4c067fcd391",
            "reason": "auth login",
            "scope": []
        },
        "from": "114uHUxT37dnr4JJiAcsE9mNK2PKWm9umrHNuM8S35",
        "id": "0cf483fa-0b3d-46f3-8e47-7c2dafe9da05",
        "thid": "0cf483fa-0b3d-46f3-8e47-7c2dafe9da05",
        "typ": "application/iden3comm-plain-json",
        "type": "https://iden3-communication.io/authorization/1.0/request"
    },
    "sessionID": "9d0a2cb5-9020-4e7e-af54-c4c067fcd391"
}
```

## 9. Fetch the claim inside User's wallet 

To fetch a claim inside their wallet, the user either needs to scan a QR code or use deeplinking. After scanning the QR Code or clicking the deeplink, the user will be required to authenticate. On successful authentication, they will receive a notification to add the claim inside their wallet.

### 9.a. Via QR Code 

To Download the QRCode previously created as PNG file we use the [Download a QRCode of Offer](../offers/apis.md#download-qrcode-of-offer) Endpoint. For it, we need to pass the claim offer `id`, generated in step 7, as Path Parameter and the `sessionID`, generated from the previous step, as Query Parameter.

```
curl --location --request GET 'https://api-staging.polygonid.com/v1/offers-qrcode/cc3570ed-2bae-4b4c-b2f9-11f636a30151/download?sessionID=9d0a2cb5-9020-4e7e-af54-c4c067fcd391'
```

> the --output flag is necessary to tell where to save the output file

<div align="center">
<img src="../../../../imgs/qr-code-api-response.png" width="700" align="center" />
</div>
<br>

### 9.b. Via Deep Linking 

The same Claim Offer can also be delivered to users via Deep Linking. One way to utilize deep linking is by passing a base64 encoded message as the value of the i_m query parameter. The related deep link would be `iden3comm://?i_m={{base64EncodedRequestHere}}`. For example, in this specific case the deep link would be `iden3comm://?i_m=ewogICAgICAgICJib2R5IjogewogICAgICAgICAgICAiY2FsbGJhY2tVcmwiOiAiaHR0cHM6Ly9hcGktc3RhZ2luZy5wb2x5Z29uaWQuY29tL3YxL29mZmVycy1xcmNvZGUvY2MzNTcwZWQtMmJhZS00YjRjLWIyZjktMTFmNjM2YTMwMTUxL2NhbGxiYWNrP3Nlc3Npb25JRD05ZDBhMmNiNS05MDIwLTRlN2UtYWY1NC1jNGMwNjdmY2QzOTEiLAogICAgICAgICAgICAicmVhc29uIjogImF1dGggbG9naW4iLAogICAgICAgICAgICAic2NvcGUiOiBbXQogICAgICAgIH0sCiAgICAgICAgImZyb20iOiAiMTE0dUhVeFQzN2RucjRKSmlBY3NFOW1OSzJQS1dtOXVtckhOdU04UzM1IiwKICAgICAgICAiaWQiOiAiMGNmNDgzZmEtMGIzZC00NmYzLThlNDctN2MyZGFmZTlkYTA1IiwKICAgICAgICAidGhpZCI6ICIwY2Y0ODNmYS0wYjNkLTQ2ZjMtOGU0Ny03YzJkYWZlOWRhMDUiLAogICAgICAgICJ0eXAiOiAiYXBwbGljYXRpb24vaWRlbjNjb21tLXBsYWluLWpzb24iLAogICAgICAgICJ0eXBlIjogImh0dHBzOi8vaWRlbjMtY29tbXVuaWNhdGlvbi5pby9hdXRob3JpemF0aW9uLzEuMC9yZXF1ZXN0IgogICAgfQ==` For instance, if you have a specific message that you want to deliver as part of the deep link, you can encode it in base64 format and include it using the `i_m` parameter. This method is particularly useful when the message is relatively small and can be included directly in the link.

In situations where the message content is too large to be included directly in the deep link, there is also support of passing an encoded link. To do so, you may want to utilize a URL shortening service to create a more compact and user-friendly link. URL shortening services help convert long URLs into shorter, more manageable links that are easier to share and use. With this approach, the deep link will include the `request_uri` query parameter, which will contain a URL-encoded link. The deep link structure is as follows:
`iden3comm://?request_uri=urlEncodedLinkHere`. Some examples of encoded link: `iden3comm://?request_uri=https%3A%2F%2Fissuer-v2.polygonid.me%2Fapi%2Fqr-store%3Fid%3Df780a169-8959-4380-9461-f7200e2ed3f4` By using this method, you can include a link that points to the location where the message can be fetched via an HTTP GET request. This allows you to deliver more substantial messages without encountering issues related to the size constraints of the deep link itself.

In summary, our platform's deep linking capabilities provide two flexible methods for delivering Credential Offers. Whether you choose to pass a base64 encoded message or an encoded link, you can ensure that users have a seamless and efficient experience when interacting with the content you provide.

### (OPTIONAL) 10. Get QRCode of Offer

The notification will only show up if the user has turned on the notifications for Polygon ID App. If that's not the case, the user will need to scan a second QR Code to fetch the claim inside their wallet. This action is performed via the [Get QRCode of Offer](../offers/apis.md#get-qrcode-of-offer).



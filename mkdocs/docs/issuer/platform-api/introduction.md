# Polygon ID Platform API

The Polygon ID Platform API exposes all the functionalities necessary to run an issuer.

> To become familiar with the role of the issuer, it is advised to use  [Polygon Platform UI](https://platform-test.polygonid.com) as a testing sandbox. All the functionalities included in the UI are exposed here as independent APIs.

The core functionality of the Platform API are:

- [Onboarding Orgs](./onboarding-orgs/apis.md) to register and manage an Organization Account
- [Issuer](./issuer/apis.md) to set up an Issuer
- [Schemas](./schemas/apis.md) to create and manage Claim Schemas
- [Claim Offers](./offers/apis.md) to issue Claims based on existing schemas and offer them to your users via a QR code

<div align="center">
<img src="../../../imgs/platform-api-1.png" width="700" align="center" />
</div>
<br>

> Disclaimer: Polygon ID APIs will be subject to improvments and changes in the upcoming months.

The APIs categories are sequential steps: you cannot start creating Schemas and issuing claims without having an Issuer. Similarly, you need an Organization account to create an Issuer on Polygon ID Platform.
To start playing around with the Platform APIs, complete the [Issuer Integration Full Flow Tutorial](./flow-tutorial/happy-path.md)

Extra resources: 

- [OpenAPI specification for API Methods](https://api-staging.polygonid.com/)
- [Postman collection for API Methods](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)
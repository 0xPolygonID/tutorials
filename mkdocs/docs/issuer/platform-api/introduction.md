# Polygon ID Platform API

The Polygon ID Platform API exposes all the functionalites necessary to run a issuer.

> To become familiar with the role of the issuer, it is advised to start with the [Polygon Platform UI](https://platform-test.polygonid.com/). All the functionalities included in the UI are exposed here as independent APIs.

The core functionality of the Platform API are:

- [Onboarding Orgs](./onboarding-orgs/apis.md) to register an Organization Account
- [Issuer](./issuer/apis.md) to set up an Issuer
- [Schemas](./schemas/apis.md) to create and manage Claim Schemas
- [Claim Offers](./offers/apis.md) to issue Claims based on existing schemas and offer it to your users via a QR code

<div align="center">
<img src="../../imgs/platform-api-1.png" alt="Polygon ID app as a reference implementation" width="500" align="center" />
</div>
<br>

The APIs categories have to be considered as sequential steps: you cannot start creating schema and issuing claims without having a Issuer. Similarly you need an Organization account in order to create an Issuer on Polygon ID Platform. 

In order to start playing around with the Platform APIs:

- [Make your first API request](./make-your-first-request.md) to become familiar with the tooling provided inside the library
- Complete the [Issuer Integration Full Flow Tutorial](./flow-tutorial/happy-path.md)

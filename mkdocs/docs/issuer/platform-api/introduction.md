# Polygon ID Platform API

The Polygon ID Platform API exposes all the functionalites necessary to run a issuer.

> To become familiar with the role of the issuer, it is advised to start with the [Polygon Platform UI](https://platform-test.polygonid.com/). All the functionalities included in the UI are exposed here as independent APIs.

The core functionality of the Platform API are:

- [Onboarding Orgs](./onborading-orgs/apis.md) to register an Organization account on Polygon ID Platform
- [Issuer](./issuer/apis.md) to create an Issuer on Polygon ID Platform
- [Schemas](./schemas/apis.md) to manage the Schemas related to the Claims you are issuing
- [Offers](./offers/apis.md) to issue claims based on existing schemas and offer it to your users via a QR code

The APIs categories have to be considered as sequential steps: you cannot start creating schema and issuing claims without having a Issuer. Similarly you need an Organization account in order to create an Issuer on Polygon ID Platform. 

In order to start playing around with the Platform APIs:

- [Make your first API request](./make-your-first-request.md) to become familiar with the tooling provided inside the library
- Check out our tutorials based on specific flows for example [Onboard your Organization](./onboarding-org-flow-tutorial.md), [Create Claim Schemas](./create-schema-flow-tutorial.md) and [Issue a Claim](./issue-claim-flow-tutorial.md)

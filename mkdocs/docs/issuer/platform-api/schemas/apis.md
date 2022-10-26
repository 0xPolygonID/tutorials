# Schemas

The Schemas APIs allow the creation of customized Schema for your Claims. A Claim Schema encodes the structure of a particular claim by defining the usage and the vocabulary of Attributes. Let's consider the example of a company that wants to issue Claims to its employees attesting the starting data and their monthly salary. In this case, the company will create a schema defined `EmployeeData` with two attributes:
- `EmployedSince` that accepts a `date` format 
- `MonthlySalary` that accepts a `number` format

To achieve claim reusability across multiple verifiers is important to consistently use the same schema to represent the same type of information. 

As a rule of thumb, existing claim schemas should always be preferred in order to achieve interoperability inside the Polygon ID ecosystem.

> Add link to browse through exisitng schemas. 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/23322631-0518c0b5-afb2-447f-a1c4-41b1293f1207?action=collection%2Ffork&collection-url=entityId%3D23322631-0518c0b5-afb2-447f-a1c4-41b1293f1207%26entityType%3Dcollection%26workspaceId%3D77785b07-8a76-40fa-859c-898d64c5057a)

## Create Schema

**Function**: Endpoint to create a new Claim Schema for your Issuer

**How it works**: The Endpoint requires to pass the Issuer `id` as Path Parameter. Furthermore, it requires as part of the Body Request:

- `schema`, the name of the schema
- `mandatoryExpiration` a boolean that indicates whether to make the claim expire or not
- `attributes` an array of *maximum two objects* that describe the attributes of the Claim Schema. Each object contains: 
    
    - `name` (required), name of the attribute
    - `type` (required), type of the attribute which can be a `boolean`, a `date` or a `number`. 
    - `description`, a string that may added further details about the Schema or describes the vocabulary used to define the attributes
    - `values` ...

In order to create a new Schema, you need to pass an active `Bearer Token` token inside the Authorization Request Header.

On successful Schema creation, the Response Body contains a set of information related to your newly created Schemas such as its `id`.

> Remember that the Schema is only a Template which will be filled with actual user data inside the [Claim Offer](../offers/apis.md).

=> check out the Sandbox or the example in our flow!

**Role Inside the flow**: In order to start offering Claims to your users is necessary to have an existing Claim Schema to fill. Once a new Claim Schema is created it can be referred to use by its `id`. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Get Schema

**Function**: Endpoint to fetch the details of a specific Claim Schema starting from its `id`.

**How it works**: The Endpoint requires to pass the Issuer `id` and the Schema `id` as Path Parameters. In order to use this endpoint, you need to pass an active `Bearer Token` token inside the Authorization Request Header. The Response Body contains the entire set of information related to the required Claim Schema. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Get All Schemas

**Function**: Endpoint to fetch the details of all the Claim Schema created by an Issuer.

**How it works**: The Endpoint requires to pass the Issuer `id` as Path Parameter. In order to use this endpoint, you need to pass an active `Bearer Token` token inside the Authorization Request Header. The Response Body contains the entire set of information related to the Claim Schemas created by that specific Issuer. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Delete Schema

**Function**: Endpoint to delete a Claim Schema previously created.

**How it works**: The Endpoint requires to pass the Issuer `id` and the `id` of the Schema you want to remove as Path Parameters. In order to use this endpoint, you need to pass an active `Bearer Token` token inside the Authorization Request Header.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

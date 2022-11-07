# Schemas

The Schemas APIs allow the creation of customized Schema for your Claims. A Claim Schema encodes the structure of a particular claim by defining the usage and the vocabulary of its Attributes. To achieve claim reusability across multiple verifiers is important to consistently use the same schema to represent the same type of information. As a rule of thumb, existing claim schemas should always be preferred in order to achieve interoperability inside the Polygon ID ecosystem.

## Create Schema

**Function**: Endpoint to create a new Claim Schema Template for an Issuer

**How it works**: The Endpoint requires to pass the Issuer `id` as Path Parameter. 

It requires to pass the following as Request Body parameters:

- `schema` (required), the name of the schema
- `mandatoryExpiration` (required), a boolean that indicates whether to make the claim with mandatory expiration or not
- `attributes` (required) an array of *maximum four objects* that describe the type of data stored inside the Claim Schema. Each object contains: 
    
    - `name` (required), name of the attribute.
    - `type` (required), type of the attribute which can be `boolean`, `date`, `datetime`, `multichoice` and `number`. 
    - `description`, a string that may add further details about the Schema or describes the vocabulary used to define the attributes.
    - `values`, an array of strings that represent the range of possible values that the attribute can cover in the case the chosen type is `multichoice`.

It also requires to pass a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains a set of information related to your newly created Schemas such as its `id`.

> Remember that the Schema is only a Template which will be filled with actual user data inside the [Claim Offer](../offers/apis.md).

**[API Reference](https://api-staging.polygonid.com/#tag/Issuer/operation/CreateIssuer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#6-create-a-schema)
## Get Schema

**Function**: Endpoint to fetch the details of a specific Claim Schema starting from its `id`.

**How it works**: It requires to pass your Issuer `id` and the Schema `id` as Path Parameters. It also requires to pass a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of information related to the required Claim Schema.

> You can query a Schema created by a different Issuer. In order to do that you just need to pass the identifier of the queried Schema. The issuer identifier passed as Path Parameter must be your one!

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/GetSchemaTemplate)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Get All Schemas

**Function**: Endpoint to fetch the details of all the Claim Schemas created by an Issuer.

**How it works**: It requires to pass the Issuer `id` as Path Parameter. Optionally, it accepts a `query` as Query Parameter which is search keyword. 

It also requires to pass a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of information related to the required Claim Schema.

The Endpoint requires to pass the Issuer `id` as Path Parameter. In order to use this endpoint, you need to pass an active `Bearer Token` token inside the Authorization Request Header. The Response Body contains the entire set of information related to the Claim Schemas created by that specific Issuer. If the query was set to a specific value, for example `query=role` the Reponse Body will contain only the Schemas that contain the given keyword either in the schema Name or across its Attributes.

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/GetSchemaTemplates)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Delete Schema

**Function**: Endpoint to delete a Claim Schema previously created.

**How it works**: It requires to pass the Issuer `id` and the Schema `id` of the Schema to be deleted as Path Parameters. It also requires to pass a valid `Bearer Token` inside the Authorization Request Header. As a result of this Request the Schema will be deleted. Once a Schema get deleted, it won't be possible to use it again to Issue Claims.

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/RemoveSchemaTemplate)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**
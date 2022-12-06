# Schemas

The Schemas APIs allow the creation of customized Schema for your Claims. A Claim Schema encodes the structure of a particular claim by defining the usage and the vocabulary of its Attributes. To achieve claim reusability across multiple verifiers is important to consistently use the same schema to represent the same type of information. As a rule of thumb, existing claim schemas should always be preferred in order to achieve interoperability inside the Polygon ID ecosystem.

## Create Schema

**Function**: Endpoint to create a new Claim Schema Template for an Issuer

**How it works**: The Endpoint requires passing the Issuer `id` as Path Parameter. 

It requires passing the following as Request Body parameters:

- `schema` (required), name of the schema in a human-readable
- `mandatoryExpiration` (required), a boolean that indicates whether to make the claim with mandatory expiration or not
- `technicalName` (required), name of the schema with formatting constraints, such as no special characters and spaces
- `attributes` (required) an array of *maximum two objects* that describe the type of data stored inside the Claim Schema. Each object contains: 
    
    - `name` (required), name of the attribute in a human-readable
    - `technicalName` (required), name of the attribute with formatting constraints, such as no special characters and spaces
    - `type` (required), type of the attribute which can be `boolean`, `date`, `datetime`, `multichoice` and `number`.
    - `description`, a string that may add further details about the Schema or describes the vocabulary used to define the attributes
    - `values`, an array of strings that represent the range of possible values that the attribute can cover in the case the chosen type is `multichoice`. There should be at least 2 values, while there's no upper limit

> ⚠️ The `multichoice` type is not supported yet from the Polygon ID Wallet

It also requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains a set of information related to your newly created Schemas such as its `id`.

> Remember that the Schema is only a Template which will be filled with actual user data inside the [Claim Offer](../offers/apis.md).

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/CreateSchemaTemplate)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#6-create-a-schema)

## Get Schema

**Function**: Endpoint to fetch the details of a specific Claim Schema starting from its `id`.

**How it works**: It requires passing your Issuer `id` and the Schema `id` as Path Parameters. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of information related to the required Claim Schema.

> You can query a Schema created by a different Issuer. In order to do that you just need to pass the identifier of the queried Schema. The issuer identifier passed as Path Parameter must be your one!

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/GetSchemaTemplate)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Get All Schemas

**Function**: Endpoint to fetch the details of all the Claim Schemas created by an Issuer.

**How it works**: It requires passing the Issuer `id` as Path Parameter. Optionally, it accepts a `query` and a boolean `active` as Query Parameters which are search keywords. 

It also requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of information related to the required Claim Schema.

The Endpoint requires passing the Issuer `id` as Path Parameter. In order to use this endpoint, you need passing an active `Bearer Token` token inside the Authorization Request Header. The Response Body contains the entire set of information related to the Claim Schemas created by that specific Issuer. If the query was set to a specific value, for example `query=role` the Reponse Body will contain only the Schemas that contain the given keyword either in the schema Name or across its Attributes.

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/GetSchemaTemplates)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

<!-- ## Update Schema

**Function**: Endpoint to activate/deactivate a Claim Schema previously created.

**How it works**: It requires passing the Issuer `id` and the Schema `id` of the Schema to be updated as Path Parameters. It requires passing a boolean value to `active` as Request Body parameter. True in order to activate the Schema, false to deactivate the Schema. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. If a Schema gets deactivated, it won't be possible to use it again to Issue Claims unless you activate this again,.

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/UpdateSchemaTemplate)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f) -->

## Get Schema Claims

**Function**: Endpoint to return all the Claims issued based on a particular Schema.

**How it works**: It requires passing the Issuer `id` and the Schema `id` of the queried Schema as Path Parameters. It also requires passing a valid `Bearer Token` inside the Authorization Request Header.

**[API Reference](https://api-staging.polygonid.com/#tag/Schemas/operation/GetSchemaClaims)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)
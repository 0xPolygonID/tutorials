# Issuer

The Issuer endpoints represent all the actions needed to manage an Issuer, such as Creating, Updating or Deleting an Issuer. Each Organization Account can only manage a single Issuer. 

## Create Issuer

**Function**: Endpoint to create a new Issuer for an Organization Account. 

**How it works**: It requires passing the name of the Issuer `displayName` as required Request Body parameters. Other non-required Request Body parameters are the `logo`, the `legalName` and the `region` of your Issuer. This information will represent your Polygon ID Issuer profile. It also requires passing a valid `Bearer Token` inside the Authorization Request Header.

The Response Body contains a set of details related to the newly created Issuer such as its `id`. 

**[API Reference](https://api-staging.polygonid.com/#tag/Issuer/operation/CreateIssuer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#4-create-an-issuer)

## Get Issuer

**Function**: Endpoint to fetch key information about an Issuer.

**How it works**: It requires passing the Issuer `id` as Path Parameter. This endpoint can be used to fetch information about any issuer existing on Polygon ID. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of details related to the requested Issuer.

**[API Reference](https://api-staging.polygonid.com/#tag/Issuer/operation/GetIssuer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Update Issuer

**Function**: Endpoint to update the details of an existing Issuer. 

**How it works**: It allows passing the `displayName`, `logo`, `legalName` and `region` as optional Request Body parameters. You can choose passing only one of these value or all of them according to the type of information about the Issuer to update. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of details related to the updated Issuer.

**[API Reference](https://api-staging.polygonid.com/#tag/Issuer/operation/UpdateIssuer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Delete Issuer

**Function**: Endpoint to delete an existing Issuer. 

**How it works**: It requires passing the Issuer `id` as Path Parameter. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. As a result of this Request the Issuer will be deleted and no longer able to perform actions on Polygon ID Platform.
 
**[API Reference](https://api-staging.polygonid.com/#tag/Issuer/operation/DeleteIssuer)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

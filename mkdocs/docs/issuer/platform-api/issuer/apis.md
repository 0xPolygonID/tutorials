# Issuer

The Issuer endpoints represent all the actions needed to manage an Issuer, such as Creating, Updating or Deleting an Issuer. Each Organization Account can only manage a single Issuer. 

## CreateIssuer

**Function**: Endpoint to create a new Issuer for an Organization Account. 

**How it works**: This Endpoint requires to pass the name of the Issuer `displayName` as required parameter inside the Request Body. Other non-required Request Body parametrs are the `logo`, the `legalName` and the `region` of your Issuer. This information will represent your Polygon ID Issuer profile.

This Endpoint requires to pass an active `Bearer Token` that can be retrieved after [sign-in](../onboarding-orgs/apis.md#sign-in) to your Organization Account

On successful Issuer creation, the Response Body will contain a set of details related to the newly created Issuer such as its `id`. 

**Role Inside the flow**: To create an issuer it is required to have an Organization Account signed-in. Creating an Issue is mandatory to use the [schemas](../schemas/apis.md) and [offers](../offers/apis.md) APIs.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## GetIssuer

**Function**: Endpoint to fetch key information about an Issuer.

**How it works**: The Endpoint requires to pass the Issuer `id` as Path Parameter (you obtain it as Response from the [CreateIssuer Endpoint](#createissuer)). It also requires to pass the `Bearer Token` inside the Authorization Request Header. The Response Body contains the entire set of details related to the request Issuer. 

**Role Inside the flow**: In order to get information about an Issuer, it is required to pass as Path Parameter an identifier of an already created Issuer.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## UpdateIssuer

**Function**: Endpoint to update the details of an existing Issuer. 

**How it works**: This Endpoint allows to pass as optional parameter inside the Request Body one or more information about the Issuer that you want to update such as `displayName`, `logo`, `legalName` and `region`. This Endpoint requires to pass an active `Bearer Token` that can be retrieved after [sign-in](../onboarding-orgs/apis.md#sign-in) to your Organization Account.

On successful Issuer creation, the Response Body will contain the set of update details about the Issuer.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## DeleteIssuer

**Function**: Endpoint to delete an existing Issuer. 

**How it works**: The Endpoint requires to pass the Issuer `id` as Path Parameter (you obtain it as Response from the [CreateIssuer Endpoint](#createissuer)). It also requires to pass the `Bearer Token` inside the Authorization Request Header.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

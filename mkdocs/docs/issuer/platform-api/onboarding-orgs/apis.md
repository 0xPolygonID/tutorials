# Onboarding Orgs

The Onboarding Orgs endpoints represent all the actions needed to manage an Organization Account, such as Creating an Account, Activating an Account, Sign-in to an Account or Resetting its password. It is mandatory to create an Organization Account in order to perform any further action such as Creating Schemas or Issuing Claims. The owner of an Organization Account can set up an [Issuer](../issuer/apis.md) and will soon be able to set up a Verifier.

## CreateAccountManagement

**Function**: Endpoint to create a new Account for an Organization. 

**How it works**: This Endpoint requires to pass `email` and `password` as required Request Body parameters. These represent the login credentials for your Organization. The Response Body contains a set of information related to your Organization Account such the `id`. 

**Role Inside the flow**: To use the Platform API it is mandatory to create an Organization Account. This action has to be performed only once. If you already registered your Organization via the [Polygon ID Platform UI](https://platform-test.polygonid.com/), this action is not necessary. As a result of this you will also receive an email with a link to activate your Account. The credential used to create your Organization Account will be then used to [Sign-in](#sign-in). 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Sign-in

**Function**: Endpoint to sign-in to your Organization Account.

**How it works**: To sign-in, you need to pass your Organization Account credentials `email` and `password` inside the Request Body. The Response Body contains a JWT token that will be used as `Bearer Token` to get the authorization to use other APIs. The token, if not deactivated or refreshed, will be active for 24 hours.

**Role Inside the flow**: To use this Endpoint you need to already have performed [CreateAccountManagement](#createAccountmanagement). This action has to be performed to obtain a Bearer Token.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## Sign-out

**Function**: Endpoint to sign-out to your Organization Account.

**How it works**: To sign-out, you need to pass an active `Bearer Token` inside the Authorization Request Header.

**Role Inside the flow**: To use this Endpoint you need to be signed-in to an Organization Account. This action has to be performed every time you intend to deactive the Bearer Token.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## ActivateAccount

**Function**: Endpoint to activate your Organization Account. 

**How it works**: To activate an Account, you need to pass an active `Bearer Token` token inside the Authorization Request Header. The Response Body contains an updated `Bearer Token`.

**Role Inside the flow**: To use this Endpoint you need to already have [Signed-in to your Organization Account](#sign-in). It is mandatory to activate an Organization Account. This action has to be performed only once and can also be executed using the link sent to your Organization Account email after the first sign-in. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## RefreshToken

**Function**: Endpoint to refresh the Bearer Token for an Organization Account. 

**How it works**: This Endpoint requires to pass an active `Bearer Token`. The Response Body contains a refreshed `Bearer Token`. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## ResetPassword

**Function**: Endpoint to set a new password for your Organziation Account. 

**How it works**: This Endpoint requires to pass the `Bearer Token` and the new `password` as required Request Body parameters.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## RequestResetPassword

**Function**: Endpoint to request for a link to reset a new password for your Organziation Account. 

**How it works**: This Endpoint requires to pass your organization `email` as required Request Body parameters. As a result of this Request you will receive an email containing a link to Reset your Organization Account password.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

> The ResetPassword Endpoint requires to be already sign-in to an Organization Account while the RequestResetPassword doesn't. You will likely use the latter only when you forget your password!

## ResendEmail

**Function**: Endpoint to request an email that contains a link to activate your Organization Account.

**How it works**: This Endpoint requires to pass your organization `email` as required Request Body parameters. As a result of this Request you will receive an email containing a link to activate your Organization Account.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**

## UpdateAccountManagement

**Function**: Endpoint to update the password used to SignIn to your Organization Account.

**How it works**: The Endpoint requires to pass the Organization Account `id` as Path Parameter (you retrieve it as Response from the [createAccountManagement Endpoint](#createAccountmanagement)) and the new `password` inside the Body. In order to update your password you also need to pass an active `Bearer Token` inside the Authorization Request Header. The Response Body contains the updated set of information related to your Organization Account. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

**[Postman Reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8)**


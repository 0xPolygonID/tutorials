# Onboarding Orgs

The Onboarding Orgs endpoints contain all the actions needed to manage an Organization Account, such as Creating an Account, Activating an Account, Sign-in to an Account or Resetting its password.

## Create Org

**Function**: Endpoint to create a new Account for an Organization. 

**How it works**: It requires passing `email` and `password` as required Request Body parameters. These represent the login credentials for your Organization. The Response Body contains a set of information related to your Organization Account such as its identifier `id`. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#1-create-an-organization-account)

## Sign in

**Function**: Endpoint to sign-in to your Organization Account.

**How it works**: It requires passing your Organization Account credentials `email` and `password` as required Request Body parameters. The Response Body contains a JWT token that will be used as `Bearer Token` in order to use other Endpoints. The token, if not deactivated or refreshed, will be active for 24 hours.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/MemberOrgSignIn)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#2-sign-in-to-an-organization-account)


## Activate Account

**Function**: Endpoint to activate your Organization Account. 

**How it works**: It requires passing a valid `Bearer Token` token inside the Authorization Request Header. The Response Body contains an updated `Bearer Token`.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/ActivateAccount)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#3-activate-your-organization-account)

## Resend Email

**Function**: Endpoint to request an email that contains a link to activate your Organization Account.

**How it works**: It requires passing your organization `email` as required Request Body parameters. As a result of this Request you will receive an email containing a link to activate your Organization Account.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/ResendEmailForAccounts)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Update Account

**Function**: Endpoint to update the password of your Organization Account.

**How it works**: The Endpoint requires passing the Organization Account `id` as Path Parameter (you retrieve it as Response from the [Create Org Endpoint](#create-org)) and the current password (`password`) and the new password `newPassword` as required Request Body parameters. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains the updated set of information related to your Organization Account. 

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/UpdateAccountManagement)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Request Reset Password

**Function**: Endpoint to request for a link to reset a new password for your Organziation Account. 

**How it works**: It requires passing your Organization Account `email` as required Request Body parameters. As a result of this Request you will receive an email containing a link to Reset your Organization Account password.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/RequestResetPasswordAccountManagement)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

## Reset Password

**Function**: Endpoint to set a new password for your Organziation Account. 

**How it works**: It requires passing the new `password` as required Request Body parameters. It also requires passing a valid `Bearer Token` inside the Authorization Request Header. As a result of this Request you will change the password used to sign-in to your Organization Account.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/ResetPasswordAccountManagement)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The Reset Password Endpoint requires to be already sign-in to an Organization Account while the Request Reset Password doesn't. You will likely use the latter only when you forget your password!

## Update Account Email

**Function**: Endpoint to update the account email associated to your Organziation Account. 

**How it works**: It requires passing the `password` associated to your Organization Account and the new `email` that you want to associate to your Organization Account. The Endpoint requires passing a valid `Bearer Token`inside the Authorization Request Header. As a result of this Request a confirmation notification will be sent to the old account email with a deeplink to accept the change.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/UpdateAccountEmailRequest)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-d0d482c1-9773-4325-b604-d398eded4171)

## Refresh Token

**Function**: Endpoint to refresh the Bearer Token for an Organization Account. 

**How it works**: It requires passing a valid `Bearer Token` inside the Authorization Request Header. The Response Body contains a refreshed `Bearer Token`.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/RefreshTokenAccountManagement)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)

> The usage of this endpoint is included in our [full-flow Tutorial](../flow-tutorial/happy-path.md#5-refresh-the-token)

## Sign Out

**Function**: Endpoint to sign-out to your Organization Account.

**How it works**: It requires passing an active `Bearer Token` inside the Authorization Request Header. As a result of this Request your Bearer Token will be deactivated.

This action has to be performed every time you intend to deactive the Bearer Token.

**[API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/MemberOrgSignOut)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2dfc4ac1-4089-4062-8e0c-e862261da70f)













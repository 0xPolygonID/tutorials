# Make your first request

## Understand the endpoint

The first endpoint that we are gonna use is [CreateAccountManagement](./onborading-orgs/apis.md#createaccountmanagement), located inside the Onboarding Orgs Category.

By accessing the page of the specific endpoint you'll find a brief introduction that includes:

- **Function**, namely the action accomplished by this endpoint
- **How it works**, describes the parameters that need to be passed in order to succesfully execute the request
- **Role inside the flow**, describes how this endpoint fits inside the general flow that leads to a claim creation

To dive deeper into the details of the API you can check the [API Reference](https://api-staging.polygonid.com/#tag/Onboarding-Orgs/operation/CreateAccountManagement). This file contain a detailed overview of the endpoint, including a description of the parameters needed to be passed inside the request and the values included in the reponse. On the righthand side you can also find a sample Request and its corresponding sample Response.

## Make your request 

The documentation contains a reference to a Postman collection containing a reference to all the endpoints included inside the Polygon ID Platform API Library. From the endpoint specific page, you can access its [Postman reference](https://web.postman.co/workspace/My-Workspace~ef6b645d-1b41-44d0-80fa-29f8f99bea63/request/19130748-e3215056-5796-42b9-b9cb-bf8a543837a8).

Postman allows you to modify the body of the request and execute the request inside the Postman enviroment. Furthermore, Postman allows you to export the request in other formats such as Node.js Axios or cURL command line tool. You only need to click on the righthand side bar and click on `Code`. Let's try to extract the cURL command corresponding for this API endpoint using Postman.

```
curl --location --request POST 'https://api-staging.polygonid.com/v1/orgs/account-management' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin7@email.com",
    "password": "Some123456789123123Pwd!"
}'
```

By executing this command inside your terminal you'll be able to execute your first Polygon ID Platform API request. (remember to change the email and password otherwise I'll generate an error as these credentials have already been used by me!)

## Review the response

If everything goes well you should receive a similar response: 

```
{
    "id":"fbbd7264-68db-4f77-abb3-fd97193a1026",
    "email":"admin7@email.com",
    "type":"OWNER",
    "verified":false,
    "createdAt":"2022-10-20T14:58:24.939896Z",
    "modifiedAt":"2022-10-20T14:58:24.939896Z"
}
```

The values contained in the response are attesting the details of the organization just created. The `verified` key is equal to `false`. It means that the account requires to be activated using the x endpoint (**Add link to that endopoint**)




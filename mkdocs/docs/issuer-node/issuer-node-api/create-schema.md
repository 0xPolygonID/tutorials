# Create Schemas

The Issuer Node requires schemas to issue Verifiable Credentials. It is a template  that determines the structure of a credential. When a user sends a request to issue a credential, it sends the schema link within the request. 

In this tutorial, we shall see how to create a schema using [Serto Editor](https://schemas.serto.id/editor/). This Editor lets you create, edit, and test the Verifiable Credential Schemas which you can then use to issue credentials. It provides you a UI Editor where you can add different attributes related to a credential and then preview it simultaneously in the JSON format. 

## Steps to Create a Verifiable Credential Schema in Serto Editor

1. Log into the Serto Editor.

2. On the top menu, click **Create**. 

    <div align="center">
   <img src= "../../../imgs/create-menu.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

3. On the **Create New Schema** screen, enter Credential Schema Name, URL Slug, Version of the schema, and its description. 

    <div align="center">
   <img src= "../../../imgs/create-schema1.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

   <div align="center">
   <img src= "../../../imgs/create-schema2.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

    > Note: Make sure that you check the  "Searchable" box so that others can find it. 

Click **Next**. 

4. Now that you have defined the general details about schema, it is time to define some schema attributes. This depends on what type of schema you intend to create. For example, if you want to create a age-related schema, you can add attributes like credential id, date of birth, etc. This is just an example; you can define your own set of attributes. 

    <div align="center">
   <img src= "../../../imgs/enter-attributes1.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

    <div align="center">
   <img src= "../../../imgs/enter-attributes2.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

5. After adding all the attributes, click **Review**. This shows review of your schema:

    <div align="center">
   <img src= "../../../imgs/review-schema.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

6. After verifying that all the details you entered are correct, you can now publish your schema. On the UI-Editor, click **Publish**. 

    <div align="center">
   <img src= "../../../imgs/publish-schema.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

**Published Schema**:

<div align="center">
   <img src= "../../../imgs/published-schema.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

You can now see your schema in the JSON/JSON-LD formats:

<div align="center">
   <img src= "../../../imgs/schema-prepared.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

7. Once a schema is created, you can use it to issue Verifiable Credentials. On Serto, you can do it via Serto Agent (it is in the testing phase) or manually.

    <div align="center">
   <img src= "../../../imgs/issue-vc.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>

   <div align="center">
   <img src= "../../../imgs/issue-vc2.png" align="center" width="500" style="border: 1px solid black"/>
   </div>
   <br>
 





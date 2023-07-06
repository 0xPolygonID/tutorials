# Create Custom Schemas

!!!info
    Polygon ID offers an intuitive, user-friendly user interface to create schemas: the Schema Builder. [Here](schema-builder.md) you can find a tutorial for this tool. You can also access it on [https://schema-builder-test.polygonid.me/](https://schema-builder-test.polygonid.me/). 

A Schema Type encodes the structure of a particular Verifiable Credential (VC) by defining the type, the fields that must be included inside the VC, and a description for these fields.

Schemas are a crucial component that allows for the interoperable use of VCs across different services. Just by parsing a schema, any program can interpret the content of a Verifiable Credential without having to interact with Issuer Party.

In order to issue Verifiable Credentials, you can refer to [existing schemas](https://github.com/0xPolygonID/issuer-node/tree/main/docs/examples/schemas). If the existing ones are not able to describe the type of data you desire, you need to create your own schema `Type`.

A schema type is made of two documents:

- `JSON-LD Context`, which contains a description of the type and its fields. [Here](https://github.com/0xPolygonID/issuer-node/blob/main/docs/examples/schemas/json-ld/exampleBoolean.json-ld) is an example of JSON-LD Context for Schema Type `CodingExperienceCredential`

- `JSON Schema` which contains the validation rules for the Issuer Node. [Here](https://github.com/0xPolygonID/issuer-node/blob/main/docs/examples/schemas/json/exampleBoolean.json) is an example of a JSON Schema for Schema Type `CodingExperienceCredential`.

Without further ado, let's jump into building a new Schema Type!

## Tutorial

---
**Note:** The executable code and **further schemas examples** for this section can be found <a href="https://github.com/0xPolygonID/tutorial-examples/tree/main/credential-schema" target="_blank">here</a>. 

--- 

Let's suppose we are a DAO that wants to issue VCs to its members. Unfortunately, there's no existing schemas that can accommodate this type of data attestation. In order to issue these VCs, a schema of type `ProofOfDaoLongevity` needs to be created. This example will show you how to create a schema type that contains a single field, you can extend it to include more fields.

**1. Define which field to include in the schema**

The `ProofOfDaoLongevity` should include a field defined `entryDate` able to attest the specific date when one joined the DAO. A credential can contain as many fields as you want!

**2. Create the vocabulary of the Schema Type**

Create a markdown file in your git repository to describe the vocabulary used inside the Schema Type. We decide to name the file `proof-of-dao-longevity-vocab.md`. This should contain a description of the (only) field `entryDate` included in the schema type.

```md
# entryDate

Describes the date when a contributor joined the DAO
```

**3. Create the JSON-LD Context**

Create a `.jsonld` file in your repository to contain the JSON-LD Context of the Schema Type. We decide to name it `proof-of-dao-longevity.jsonld`.

The JSON-LD Context contains:

- the name of the Type

- its unique identifier `@id` which is a public URL where the context can be resolved. 

    If you are working on Github, you can fetch the URL directly from your published repository based on the file path. In this case it is 

    `https://raw.githubusercontent.com/0xPolygonID/tutorial-examples/main/credential-schema/proof-of-dao-longevity.jsonld#ProofOfDaoLongevity`
        
- the definition of the vocabulary with its URL

    In this case we create a field defined `vocab` and attach the URL that identifies the vocabulary. In this case it is 
    
    `https://github.com/0xPolygonID/tutorial-examples/blob/main/credential-schema/proof-of-dao-longevity-vocab.md#`


- The field that we want to include inside the credential, defined together with its identifier and its data type (all xsd data type are available)

    ```json hl_lines="8 9 15 17 18 19"
    {
      "@context": [
        {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "ProofOfDaoLongevity": {
            "@id": "https://raw.githubusercontent.com/0xPolygonID/tutorial-examples/main/credential-schema/proof-of-dao-longevity.jsonld#ProofOfDaoLongevity",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "vocab": "https://github.com/0xPolygonID/tutorial-examples/blob/main/credential-schema/proof-of-dao-longevity-vocab.md#",
              "xsd": "http://www.w3.org/2001/XMLSchema#",
              "entryDate": {
                "@id": "vocab:entryDate",
                "@type": "xsd:integer"
              }
            }
          }
        }
      ]
    }
    ```

---
**Note:** The lines which are underlined are the only ones that need to be modified in order to create a new Schema Type.

--- 

**5. Create the JSON Schema**

Last but not least, we have to create the JSON Schema Document.  We decide to name it `proof-of-dao-longevity.json`.
This a document that contains the serialization rule and the instruction for the Issuer to build Verifiable Credentials based on a specific schema type and spot any error in the process. Although it might seem complex and verbose, there are just a few values that need to be updated to adapt to your purpose:

- Add the URIs to your specific `jsonLdContext` and `jsonSchema`:
    
- Inside `CredentialSubject` update the information related to your field:


    ```json hl_lines="6 7 109 117 118"
    {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "$metadata": {
          "uris": {
            "jsonLdContext": "https://raw.githubusercontent.com/0xPolygonID/tutorial-examples/main/credential-schema/proof-of-dao-longevity.jsonld",
            "jsonSchema": "https://raw.githubusercontent.com/0xPolygonID/tutorial-examples/main/credential-schema/proof-of-dao-longevity.json"
          }
        },
        "required": [
          "@context",
          "id",
          "type",
          "issuanceDate",
          "credentialSubject",
          "credentialSchema",
          "credentialStatus",
          "issuer"
        ],
        "properties": {
          "@context": {
            "type": [
              "string",
              "array",
              "object"
            ]
          },
          "id": {
            "type": "string"
          },
          "type": {
            "type": [
              "string",
              "array"
            ],
            "items": {
              "type": "string"
            }
          },
          "issuer": {
            "type": [
              "string",
              "object"
            ],
            "format": "uri",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uri"
              }
            }
          },
          "issuanceDate": {
            "type": "string",
            "format": "date-time"
          },
          "expirationDate": {
            "type": "string",
            "format": "date-time"
          },
          "credentialSchema": {
            "type": "object",
            "required": [
              "id",
              "type"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uri"
              },
              "type": {
                "type": "string"
              }
            }
          },
          "subjectPosition": {
            "type": "string",
            "enum": [
              "none",
              "index",
              "value"
            ]
          },
          "merklizationRootPosition": {
            "type": "string",
            "enum": [
              "none",
              "index",
              "value"
            ]
          },
          "revNonce": {
            "type": "integer"
          },
          "version": {
            "type": "integer"
          },
          "updatable": {
            "type": "boolean"
          },
          "credentialSubject": {
            "type": "object",
            "required": [
              "id",
              "entryDate"
            ],
            "properties": {
              "id": {
                "title": "Credential Subject ID",
                "type": "string",
                "format": "uri"
              },
              "entryDate": {
                "type": "integer"
              }
            }
          }
        }
      }
    ```
    
**6. Publish it!**

If you were working on a git repository, push all the files, make sure that the repo is public and that's it!

### Further Resources 
    
- [JSON-LD - W3C VC Standard](https://www.w3.org/TR/vc-data-model/#json-ld)
- [JSON-LD Context - W3C VC Standard](https://www.w3.org/TR/vc-data-model/#contexts)    

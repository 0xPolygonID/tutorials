In order to create new types of credentials, it is necessary to generate JSON schemas. These are the underlying files that define the credential attributes. 
The Schema Builder is a tool created to simplify the process of creating schemas by using an intuitive user interface and enabling everyone to check previously made schemas.

!!!note
    For a more technical guide with no use of the user interface, please head to [Create Custom Schema](schema.md).

## Schema Explorer
The Schema Builder landing page presents a Schema Explorer, where you can find all previously created schemas and drill down your search for specific kinds of schemas. Not all schemas need to be created from scratch. It is a good practice to utilize the ones that are already in use.

<figure markdown>
  ![8008](../../imgs/schema-explorer.png){ width="1000"}
  <figcaption>Schema Explorer showing credentials and filters.</figcaption>
</figure>

We highly recommend that you look for one of the available schemas before actually creating one. By doing so, you can save time for your project and leverage a full library of popular ready-to-use schemas.
If you find a schema that is similar to what you need but you are not completely happy with its characteristics, you can always **fork it**.

<figure markdown>
  ![Fork Schema](../../imgs/fork-schema.png){ width="1000"}
  <figcaption>Schema details page with options to fork, check other versions and change visualization.</figcaption>
</figure>

Forking a schema is similar to GitHub forks. It creates a copy of the schema and lets you define new attributes. So you build your own out of another one.  

<figure markdown>
  ![Fork Schema](../../imgs/fork-define-schema.png){ width="1000"}
  <figcaption>Building a new schema from a previously forked one.</figcaption>
</figure>

!!!info
    The outcome of a forked schema shows its version and where it was forked from.
    ![Fork Version](../../imgs/fork-versions.png){ width="500"}

    The forked schema also shows its number of forks:

    ![Forks](../../imgs/forks.png){ width="300"}



## Schema Builder
As previously stated, the Schema Builder is the easiest way to generate new types of credentials as it allows users to define the attributes, data types, and constraints for their schemas, and the tool will generate the necessary JSON-LD files and other artifacts required to implement the schema.


<figure markdown>
  ![8008](../../imgs/schema-builder.png){ width="1000"}
  <figcaption>Schema form and its JSON outcome.</figcaption>
</figure>

!!!info
    If you already have access to a file containing a JSON schema or a URL where that schema might be located, you can always add it to the Schema Builder by clicking on the **Import Schema** button. Then you will be able to edit, create new JSON and JSON-LD files and publish it on IPFS.  
    <div align = "center">
    ![Import Schema](../../imgs/import-schema.png){ width="500"}
    </div>

### Schema definition
The first page of the Schema Builder flow lets you define the basic aspects of the schema, namely its title, type, version and description.

<figure markdown>
  ![Define Schema](../../imgs/define-schema.png){ width="1000"}
  <figcaption>Main Schema fields.</figcaption>
</figure>

- Title: a name for the schema.
- Schema Type: a set of attributes used to shape the data stored in one credential. 
- Version: this is important to register the current version of the schema, as it might be updated in the future.
- Description: a description of the schema should explain in simple terms what it will be used for. 

#### Attributes
You can add multiple attributes to your schema. All of them need to have the following characteristics: name, title, data type and description.

<figure markdown>
  ![](../../imgs/define-attributes.png){ width="1000"}
  <figcaption>Schema attribute fields.</figcaption>
</figure>

- Name: the name of the attribute with a limited use of characters.
- Title: a more human-readable title for the attribute without restrictions for special characters or space.
- Data type: the kind of data the schema will support, such as integer, string, boolean etc.
- Description: a short human-readable explanation of the attribute.

#### Publish on IPFS or Download JSON file
The last step of building a new schema is publishing it on [IPFS](https://ipfs.tech/). As an alternative, you can download the JSON file and store it in the location of your choice.


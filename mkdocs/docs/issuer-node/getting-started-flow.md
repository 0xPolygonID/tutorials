# Getting Started

This article details the steps that can be carried out to achieve full integration of the Issuer Node with the Polygon ID APIs.
## Installation

There are two options for installing and running the server alongside the UI:

1. [Docker Setup Guide](#docker-setup-guide)
2. [Standalone Mode Guide](#standalone-mode-guide)

**For either one, you first have to [clone the repository](https://github.com/0xPolygonID/issuer-node).**

=== "Docker"

    ### Docker Setup Guide

    Running the app with Docker allows for minimal installation and a quick setup. This is recommended **for evaluation use-cases only**, such as local development builds.

    #### Docker Guide Requirements

    - Unix-based operating system (e.g. Debian, Arch, Mac OS)
    - [Docker Engine](https://docs.docker.com/engine/) `1.27+`
    - Makefile toolchain `GNU Make 3.81`

    !!! warning
        There is no compatibility with Windows environments at this time.

    To help expedite a lot of the Docker commands, many have been abstracted using `make` commands. Included in the following sections are the equivalent Docker commands that show what is being run.

    #### Create Docker Configuration Files

    Make sure you are in the root folder and then make a copy of the following environment variables files:

    ```bash
    # FROM: ./

    cp .env-api.sample .env-api;
    cp .env-issuer.sample .env-issuer;
    # (Optional - For issuer UI)
    cp .env-ui.sample .env-ui;
    ```

    #### Node Issuer Configuration

    The `.env-issuer` will be loaded into the [Docker compose initializer](https://github.com/0xPolygonID/issuer-node/blob/develop/infrastructure/local/docker-compose.yml).

    Any of the following RPC providers can be used:

    - [Chainstack](https://chainstack.com/)
    - [Ankr](https://ankr.com/)
    - [QuickNode](https://quicknode.com/)
    - [Alchemy](https://www.alchemy.com/)
    - [Infura](https://www.infura.io/)

    !!!note "Mainnet or Testnet?"
        Using Mainnet or Testnet will depend on the RPC URL you are going to use in this step. After you decide which of the RPC providers you will be using, like any of the examples above, you will need to copy the URL for the network you are willing to use.

    If it is desired to run a free public forwarding URL, see [Getting A Public URL](#getting-a-public-url).

    Configure `.env-issuer` with the following details (or amend as desired).

    ```bash
    # ...

    # See Section: Getting A Public URL
    ISSUER_SERVER_URL=<https://unique-forwaring-or-public-url.ngrok-free.app>
    # Defaults for Basic Auth in Base64 ("user-issuer:password-issuer" = "dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy")
    # If you just want to get started, don't change these
    ISSUER_API_AUTH_USER=user-issuer
    ISSUER_API_AUTH_PASSWORD=password-issuer
    # !!!MUST BE SET or other steps will not work
    ISSUER_ETHEREUM_URL=<YOUR_RPC_PROVIDER_URI_ENDPOINT>
    ```

    !!! note
        In case the Vault was loaded multiple times and a fresh start is needed, the following will remove remnant data:

        ```bash
        # FROM: ./

        make clean-vault;
        # (Equivalent)
        #   rm -R infrastructure/local/.vault/data/init.out
        #   rm -R infrastructure/local/.vault/file/core/
        #   rm -R infrastructure/local/.vault/file/logical/
        #   rm -R infrastructure/local/.vault/file/sys/

        # Expected Output/Prompt:
        #   rm -R infrastructure/local/.vault/data/init.out
        #   rm -R infrastructure/local/.vault/file/core/
        #   rm -R infrastructure/local/.vault/file/logical/
        #   rm -R infrastructure/local/.vault/file/sys/
        ```

    #### Start Redis Postgres & Vault

    This will start the necessary local services needed to store the wallet private key to the Hashicorp vault and allow storing data associated to the issuer. Don't forget to initialize Docker before running this command.

    ```bash
    # FROM: ./

    make up;
    # (Equivalent)
    #   docker compose -p issuer -f ./infrastructure/local/docker-compose-infra.yml up -d redis postgres vault;

    # Expected Output:
    #   docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose-infra.yml up -d redis postgres vault
    #   [+] Running 4/4
    #   ⠿ Network issuer-network       Created                                                                                   0.0s
    #   ⠿ Container issuer-vault-1     Started                                                                                   0.5s
    #   ⠿ Container issuer-redis-1     Started                                                                                   0.4s
    #   ⠿ Container issuer-postgres-1  Started  
    ```

    To remove all services, run the following (ignore the warnings):

    ```bash
    # FROM: ./

    make down; 
    # (Equivalent)
    #   docker compose -p issuer -f ./infrastructure/local/docker-compose-infra.yml down --remove-orphans -v;

    # Expected Output:
    #   docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose-infra.yml down --remove-orphans
    #   [+] Running 4/3
    #   ⠿ Container issuer-postgres-1  Removed                                                                                   0.2s
    #   ⠿ Container issuer-redis-1     Removed                                                                                   0.2s
    #   ⠿ Container issuer-vault-1     Removed                                                                                   0.2s
    #   ⠿ Network issuer-network       Removed                                                                                   0.0s
    #   docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml down --remove-orphans
    #   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string. 
    #   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string. 
    #   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string. 
    #   WARN[0000] The "DOCKER_FILE" variable is not set. Defaulting to a blank string.
    ```

    #### Import Wallet Private Key To Vault

    In order to secure the wallet private key so that the issuer can use it to issue credentials, it must be stored in the Hashicorp Vault.

    !!! note
        Make sure the wallet that is provided has Testnet Matic to be able to send transactions and that you are providing the Private Key. Here's how you can [extract the private key from MetaMask](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed.), for instance.

    ```bash
    # FROM: ./

    # Make sure to verify that the issuer-vault-1 is full initialized to avoid: "Error writing data to iden3/import/pbkey: Error making API request."
    make private_key=<YOUR_WALLET_PRIVATE_KEY> add-private-key;
    # (Equivalent)
    #   docker exec issuer-vault-1 vault write iden3/import/pbkey key_type=ethereum private_key=<YOUR_WALLET_PRIVATE_KEY>;

    # Expected Output:
    #   docker exec issuer-vault-1 \
    #           vault write iden3/import/pbkey key_type=ethereum private_key=<YOUR_WALLET_PRIVATE_KEY>
    #   Success! Data written to: iden3/import/pbkey
    ```

    #### Add Vault To Configuration File

    This will get the vault token from the Hashicorp vault docker instance and add it to our `./env-issuer` file.

    ```bash
    # FROM: ./

    make add-vault-token;
    # (Equivalent)
    #   TOKEN=$(docker logs issuer-vault-1 2>&1 | grep " .hvs" | awk  '{print $2}' | tail -1);
    # sed '/ISSUER_KEY_STORE_TOKEN/d' .env-issuer > .env-issuer.tmp;
    # echo ISSUER_KEY_STORE_TOKEN=$TOKEN >> .env-issuer.tmp;
    # mv .env-issuer.tmp .env-issuer;

    # Expected Output:
    #   sed '/ISSUER_KEY_STORE_TOKEN/d' .env-issuer > .env-issuer.tmp
    #   mv .env-issuer.tmp .env-issuer
    ```

    #### Create Issuer DID

    !!! note
        This can also be done via the [UI API](#using-the-ui-api).

    This will create a new issuer DID by creating a new Docker instance of the issuer, generating the DID of the issuer, storing it in the database, then deleting the instance.

    It then copies the new DID to `.env-api`.

    === "_NON-Apple-M1/M2/Arm_ (ex: Intel/AMD)"

        ```bash
        # FROM: ./

        # NON-Apple-M1/M2/Arm Command:
        make generate-issuer-did;
        # (Equivalent)
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f ./infrastructure/local/docker-compose.yml up -d initializer
        # sleep 5
        #  $(eval DID = $(shell docker logs -f --tail 1 issuer-initializer-1 | grep "did"))
        #  @echo $(DID)
        #  sed '/ISSUER_API_UI_ISSUER_DID/d' .env-api > .env-api.tmp
        #  @echo ISSUER_API_UI_ISSUER_DID=$(DID) >> .env-api.tmp
        #  mv .env-api.tmp .env-api
        #  docker rm issuer-initializer-1
        ```

    === "_Apple-M1/M2/Arm_"

        ```bash
        # FROM: ./

        # Apple-M1/M2/Arm Command:
        make generate-issuer-did-arm;
        # (Equivalent)
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml up -d initializer;
        # sleep 5;
        #   DID=$(docker logs -f --tail 1 issuer-initializer-1 | grep "did");
        #   echo $DID;
        #   sed '/ISSUER_API_UI_ISSUER_DID/d' .env-api > .env-api.tmp;
        #   echo ISSUER_API_UI_ISSUER_DID=$DID >> .env-api.tmp;
        #   mv .env-api.tmp .env-api;
        #   docker rm issuer-initializer-1;

        # Expected Output:
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml up -d initializer
        #   WARN[0000] Found orphan containers ([issuer-vault-1 issuer-postgres-1 issuer-redis-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
        #   [+] Running 1/1
        #   ⠿ Container issuer-initializer-1  Started                                                                                0.2s
        #   sleep 5
        #   did:polygonid:polygon:mumbai:uniqueAlphanumericKeyGenerated
        #   sed '/ISSUER_API_UI_ISSUER_DID/d' .env-api > .env-api.tmp
        #   mv .env-api.tmp .env-api
        #   docker rm issuer-initializer-1
        #   issuer-initializer-1
        ```

    #### Start Issuer API

    Now that the issuer API is configured, it can be started.

    === "_NON-Apple-M1/M2/Arm_ (ex: Intel/AMD)"

        ```bash
        # FROM: ./

        make run;
        # (Equivalent)
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml up -d api;

        # Expected Output:
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/local/docker-compose.yml up -d api;
        ```

    === "_Apple-M1/M2/Arm_"

        ```bash
        # FROM: ./

        make run-arm;
        # (Equivalent)
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml up -d api;

        # Expected Output:
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/local/docker-compose.yml up -d api;
        #   WARN[0000] Found orphan containers ([issuer-vault-1 issuer-postgres-1 issuer-redis-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
        ```

    Navigating to <http://localhost:3001> shows the issuer API's frontend:

    ![Issuer API frontend](../imgs/3001.png)

    #### (Optional) Configure UI

    This step is required to run the separate UI application, which allows intuitive and convenient management of schemas, credentials, connections and issuer state.

    !!! tip
        Running and using the UI is optional, since it implements funcionality already exposed via the [UI API](#using-the-ui-api). It is highly recommended though, because it makes issuer management far simpler and more intuitive.

    ```bash
    # FROM: ./

    cp .env-ui.sample .env-ui;
    ```

    Configure the `.env-ui` file with the following details (or amend as desired):

    ```bash
    ISSUER_UI_BLOCK_EXPLORER_URL=https://mumbai.polygonscan.com
    ISSUER_UI_AUTH_USERNAME=user-ui
    ISSUER_UI_AUTH_PASSWORD=password-ui
    ```

    #### Start API UI, UI, Notifications server & Publisher

    This will start the UI API that exposes endpoints to manage schemas, credentials, connections and issuer state, as well as the UI that relies on it.

    === "_NON-Apple-M1/M2/Arm_ (ex: Intel/AMD)"

        ```bash
        # FROM: ./

        make run-ui;
        # (Equivalent)
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/local/docker-compose.yml up -d api-ui ui notifications pending_publisher;

        # Expected Output:
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml up -d api-ui ui notifications pending_publisher
        #   WARN[0000] Found orphan containers ([issuer-vault-1 issuer-postgres-1 issuer-redis-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
        #   [+] Running 4/4
        #    ⠿ Container issuer-ui-1                 Started                                                                                                           0.5s
        #    ⠿ Container issuer-api-ui-1             Started                                                                                                           0.5s
        #    ⠿ Container issuer-notifications-1      Started                                                                                                           0.4s
        #    ⠿ Container issuer-pending_publisher-1  Running  
        ```

    === "_Apple-M1/M2/Arm_"

        ```bash
        # FROM: ./

        make run-ui-arm;
        # (Equivalent)
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/local/docker-compose.yml up -d api-ui ui notifications pending_publisher;

        # Expected Output:
        #   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_FILE="Dockerfile-arm" docker compose -p issuer -f /Users/username/path/to/sh-id-platform/infrastructure/local/docker-compose.yml up -d api-ui ui notifications pending_publisher
        #   WARN[0000] Found orphan containers ([issuer-vault-1 issuer-postgres-1 issuer-redis-1]) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up. 
        #   [+] Running 4/4
        #    ⠿ Container issuer-ui-1                 Started                                                                                                           0.5s
        #    ⠿ Container issuer-api-ui-1             Started                                                                                                           0.5s
        #    ⠿ Container issuer-notifications-1      Started                                                                                                           0.4s
        #    ⠿ Container issuer-pending_publisher-1  Running  
        ```

    Now navigate to <http://localhost:3002> to see the UI API's frontend:

    ![Issuer UI API frontend](../imgs/3002.png)

    #### Using the UI API

    Make sure to set the HTTP authentication credentials in `.env-api` to the following:

    ```bash
    # ...

    ISSUER_API_UI_AUTH_USER=user-api
    ISSUER_API_UI_AUTH_PASSWORD=password-api
    ```

    Then authenticate via the following form on <http://localhost:3002>:

    ![Issuer UI API Authentication](../imgs/3002-auth.png)

    This allows you to make a request via any of the endpoints using this frontend.

    ![Issuer UI API Get Credentials](../imgs/3002-credentials.png)

    #### (Optional) Using the UI

    This service is running on <http://localhost:8088>.

    !!! note 
        If you are using Chrome, you might get the HTTP auth modal showing and disappearing quickly. To remedy this, use the following URL: <http://user-api:password-api@localhost:8088/>.

    File containing the basic auth credentials: `.env-ui`

    ```bash
    # ...

    ISSUER_UI_AUTH_USERNAME=user-ui
    ISSUER_UI_AUTH_PASSWORD=password-ui
    ```

    ![Issuer UI](../imgs/8088.png)

    !!! note
        If you want to run the UI app in development mode, i.e. with HMR enabled, please follow the steps in the [Development (UI)](#development-ui) section.

    ---

=== "Standalone Mode Guide"

    ### Standalone Mode Guide

    Running the app in standalone mode means you will need to install the binaries for the server to run natively. This is essential for production deployments.

    Make sure you have Postgres, Redis and Vault properly installed & configured. Do _not_ use `make up` since those will start the containers for non-production builds, see [Docker Setup Guide](#docker-setup-guide).

    #### Standalone Mode Guide Requirements

    - [Docker Engine](https://docs.docker.com/engine/) 1.27
    - Makefile toolchain
    - Unix-based operating system (e.g. Debian, Arch, Mac OS X)
    - [Go](https://go.dev/) 1.19
    - [Postgres](https://www.postgresql.org/)
    - [Redis](https://redis.io/)
    - [Hashicorp Vault](https://github.com/hashicorp/vault)

    #### Standalone Mode Setup

    1. Copy `.env-api.sample` as `.env-api` and `.env-issuer.sample` as `.env-issuer`. Please see the [configuration](#configuration) section for more details.
    2. Run `make build`. This will generate a binary for each of the following commands:
        - `platform`
        - `platform_ui`
        - `migrate`
        - `pending_publisher`
        - `notifications`
    3. Run `make db/migrate`. This checks the database structure and applies any changes to the database schema.
    4. Run `./bin/platform` command to start the issuer.
    5. Run `./bin/pending_publisher`. This checks that publishing transactions to the blockchain works.
    6. Follow the [steps](#import-wallet-private-key-to-vault) for adding an Ethereum private key to the Vault.
    7. Follow the [steps](#create-issuer-did) for creating an identity as your issuer DID.
    8. _(Optional)_ To set up the UI with its own API, first copy `.env-ui.sample` as `.env-ui`. Please see the [configuration](#configuration) section for more details.

    ---

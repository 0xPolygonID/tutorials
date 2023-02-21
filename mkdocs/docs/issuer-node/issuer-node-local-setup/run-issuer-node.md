# Run Issuer Node 

## Run Issuer Node Locally on IDE

As we stated earlier in the tutorials, the Issuer Node is platform-agnostic and can be run with CLI or IDE, or even on a cloud-based platfrom. In this tutorial, we are going to show you the steps needed to start the Node on GoLand IDE.


1. **Clone the Repositoy**: Clone the <a href="https://github.com/0xPolygonID/sh-id-platform" target="_blank">Issuer Node Repository</a>
to your system.

      ```
      git clone https://github.com/0xPolygonID/sh-id-platform
      ``` 

2. **Create a test branch**: Create a new branch, say, ***testbranch*** forked out from the main and switch to that branch.

    ```
    git checkout -b testbranch
    ```
    

3. **Start Docker Desktop**: Assuming that you have the Docker installed on your machine, start the Docker Desktop, this initiates the Docker Daemon service. 

4. **Run Docker Containers**: On the Terminal on IDE, enter the following command to start the three docker containers:

      ```
      make up
      ```
      With this, the system runs a `docker-compose` command to start the redis, postgres, and vault containers:

      ```
      docker-compose -p “project name” -f path/docker-compose.yml up -d redis postgres vault

      ```
      where the `path` shows the location of the docker-compose.yml file.

      This starts the postgres, redis, and vault containers:

      <div align="center">
         <img src= "../../../imgs/makeup.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

      To verify that the containers are running, execute this command:

      ```
      docker ps
      ```
      This lets you see all the containers that are currently running along with their statuses and ports.

      <div align="center">
         <img src= "../../../imgs/docker-ps.png" align="center" style="border: 1px solid black"/>
         </div>
      <br>

5. **Place Ethereum Private Key in Vault**: Run the following command to start the vault container in the interactive mode. This command is used to go inside the vault and run `sh` or `bsh` commands inside it. 

      ```
      docker exec -it vault-docker-name sh (or bash)
      ```

      where `-it` flag stands for the interactive mode that allows you to interact with the shell of the vault container. `vault-docker-name` is the name of your vault container. 

      As you run this command, it waits for your input. Here, as an input,  we shall place the `Ethereum Private Key` in the vault:

      ```
      vault write iden3/import/pbkey key_type=ethereum private_key=<privkey>

      ```

      <div align="center">
         <img src= "../../../imgs/ethereum-priv-key.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

      With this, the Ethereum Private Key is written into the vault container. 

6. **Set Field Values in Configuration File**: We have provided a `config.toml.sample` file. Copy this file in the `config.toml` in your project, and then set values for the following fields:

      - ServerPort: Enter the port on which Issuer Node would start. (Example: 3001)

      - ServerUrl:  If the Issuer Node is to be started locally, enter the localhost URL (for example, http://localhost:3001). If the Issuer Node is to be hosted on Google Cloud or an AWS or some other cloud (instead of being installed locally), enter the URL where the machine is located.

      - Database Url: The database URL that is provided by Docker. For example,
      Url="postgres://polygonid:polygonid@localhost:5432/platformid?sslmode=disable

      - Keystore Address: It is the address of the vault running locally in the docker.  (for example, http://localhost:8200/)

      - Keystore Token: It is the Initial Root Token of the Vault. Copy the value of this token from the Vault container and paste it here. Or, once you have run the docker conatiners, the token can be copied from this path in the repository: "infrastructure/local/.vault/data/init.out".  

      - Keystore PluginIden3MountPath: The path that needs to be added to the vault so that it can be configured correctly.

      - Ethereum URL: For this, you first need to sign up on Alchemy. Then create an app; enter app details including chain as Polygon and Network as Polygon Mumbai. Click **View Key** to know your JSON RPC URL and paste it into the field in the Ethereum URL field. 

      <div align="center">
         <img src= "../../../imgs/alchemy.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

      - Ethereum Contract Address: Paste your Ethereum Contract Address here. 

      - Prover Server URL: The URL and port of the Prover Server.

      - Circuit Path: The path to the circuits folder in your Issuer Node repository. This contains files for prover circuits.


7. Run the following command to start the Issuer Node:

      ```
      make run
      ```

   This loads all the build files for the Node and it starts at the port specified in the `config.toml` file. 

   <div align="center">
      <img src= "../../../imgs/node-start.png" align="center" style="border: 1px solid black"/>
      </div>
      
8. Browse ServerUrl configured in the config.toml file (in this case: http://localhost:3001). This shows the API documentation. 

> Note: Please note that for the M1 chips, running the Issuer Node with dockerization might give some errors. This is a "known issue". We have tested this for ubuntu and macOS however for Windows, testing has not yet been carried out. To avoid getting this error, please follow the steps to start the Issuer Node in the standalone mode explained in the next section. 

## Run Issuer Node in Standalone Mode

The standalone mode of the Issuer Node allows to compile the Issuer Node and creating the executables to run it without using docker. To run in the standalone mode, you would need compile it with GoLang 1.19 environment.  

Follow these steps to start the Issuer Node in the standalone mode:

1. **Set Field Values in Configuration File**: We have provided a `config.toml.sample` file. Copy this file in the `config.toml` in your project, and then set different values. This is same as step 6 of the previous section. 

2. Run this command:

      ```
      make build
      ```
This command will compile, run a `go install`, and will generate a binary for each of the three executables:

- Platform: It is the main executable required to run the project. It is the platform API. 

- Migrate: It is used to create database schema in Posgres. 

- Pending_Publisher: It is a service that runs in the background and the purpose is to check for transactions that we send to the blockchain. 


      <div align="center">
         <img src= "../../../imgs/make-build.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

3. Make sure that all the services: Postgres, Vault, and Redis are up and running. This is to be noted that if you are running your Issuer Node only for evaluation purposes, it is ok to use the docker images. But for production, you must use set up your own Postgres, Vault, and Redis. Like in the previous secion, you can use the following command to start docker containers:

      ```
      make up
      ```

      <div align="center">
         <img src= "../../../imgs/services-running.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

4. Configure your datbase using the following command:

      ```
      make db/migrate
      ```

      <div align="center">
         <img src= "../../../imgs/migration-done.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

This checks the current structure of the database, and accordingly, either creates or updates the database. 

5. Run this command to start the Issuer Node:

      ```
      ./bin/platform
      ```

      <div align="center">
         <img src= "../../../imgs/issuer-node-starts.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

This starts the Issuer Node. You can now browse to the port configured for your server (ServerPort)in the `config.toml` file and view the API documetation. For example, this could be: http://localhost:3001.

6. Run the following command to start the Pending_Publisher service:

      ```
      ./bin/pending_publisher
      ```
This step checks for errors, if any, as the transactions are published on-chain. 





 












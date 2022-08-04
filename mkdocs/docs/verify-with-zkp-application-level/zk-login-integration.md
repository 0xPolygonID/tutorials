# ZK Login Integration

The intergation of this workflow inside your application only requires to embed a button to initiate the login process on the front-end. After this button is pressed, the front-end makes a request to the back-end to generate an `auth request` and displays it in a QR code. When a user scans the QR code using their wallet, it generates a zk proof and sends this proof packed inside a JWZ to the call-back URL in order to verify it. 

Overall there are 2 endpoints to be added to the verifier's backend: 

- GET /api/sign-in - should return auth request inside a QR code
- POST /api/callback - should receive the callback request from the identity wallet containing the proof and verify it

The user should have the Polygon ID identity wallet (or any compatible wallet) installed on their device.

## Integrate with Javascript and GoLang

> Context: You are a platform that wants to authenticate users according to their age. If they are younger than a certain age, users are not allowed to log-in. The naive web2 way to perform this action would be to make users fill up a form with personal information. In web3 we can perform the same never accessing any user's PII.

1. **Add the authorization package to your project** 

	=== "GoLang"

		``` bash 
		go get github.com/iden3/go-iden3-auth
		```

	=== "Javascript"

		```bash 
		npm i @iden3/js-iden3-auth --save
		```

2. **Set up a server** 

	=== "GoLang"

		```go 
		package main

		import (
			"encoding/json"
			"fmt"
			"io"
			"net/http"
			"strconv"
			"time"

			"github.com/iden3/go-circuits"
			auth "github.com/iden3/go-iden3-auth"
			"github.com/iden3/go-iden3-auth/loaders"
			"github.com/iden3/go-iden3-auth/pubsignals"
			"github.com/iden3/go-iden3-auth/state"
			"github.com/iden3/iden3comm/protocol"
		)

		func main() {
			http.HandleFunc("/api/sign-in", GetQR)
			http.HandleFunc("/api/callback", Callback)
			http.ListenAndServe(":8080", nil)
		}

		// Create a map to store the auth requests and their session IDs
		var requestMap = make(map[string]interface{})
		```

	=== "Javascript"

		```js
		const express = require('express');
		const {auth, resolver, loaders} = require('@iden3/js-iden3-auth')
		const getRawBody = require('raw-body')

		const app = express();
		const port = 8080;

		app.get("/api/sign-in", (req, res) => {
			console.log('get QR');
			getQR(req,res);
		});

		app.post("/api/callback", (req, res) => {
			console.log('callback');
			callback(req,res);
		});

		app.listen(port, () => {
			console.log('server running on port 8080');
		});

		// Create a map to store the auth requests and their session IDs
		const requestMap = new Map();
		```

3. **Sign-in endpoint** 

	This is the endpoint that the user must interact with when trying to log-in into your platform. The most important part here is the definition of the request that gets presented to the user. 

	**[Understand how to design queries](./query-language.md)**

	=== "GoLang"

		```go
		// GetQR returns auth request
		func GetQR(w http.ResponseWriter, r *http.Request) {

			// Audience is verifier id
			rURL := "<YOUR REMOTE HOST>";
			sessionID := 1
			CallbackURL := "/api/callback"
			Audience := "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"

			uri := fmt.Sprintf("%s%s?sessionId=%s", rURL, CallbackURL, strconv.Itoa(sessionID))

			var request protocol.AuthorizationRequestMessage

			// Generate request for basic authentication
			request = auth.CreateAuthorizationRequestWithMessage("test flow", "message to sign", Audience, uri)

			request.ID = "7f38a193-0918-4a48-9fac-36adfdb8b542"
			request.ThreadID = "7f38a193-0918-4a48-9fac-36adfdb8b542"

			// Add request for a specific proof
			var mtpProofRequest protocol.ZeroKnowledgeProofRequest
			mtpProofRequest.ID = 1
			mtpProofRequest.CircuitID = string(circuits.AtomicQuerySigCircuitID)
			mtpProofRequest.Rules = map[string]interface{}{
				"query": pubsignals.Query{
					AllowedIssuers: []string{"*"},
					Req: map[string]interface{}{
						"birthDay": map[string]interface{}{
							"$lt": 20000101,
						},
					},
					Schema: protocol.Schema{
						URL:  "https://schema.polygonid.com/jsonld/kyc.json-ld",
						Type: "AgeCredential",
					},
				},
			}

			request.Body.Scope = append(request.Body.Scope, mtpProofRequest)

			// Store auth request in map associated with session ID
			requestMap[strconv.Itoa(sessionID)] = request

			msgBytes, _ := json.Marshal(request)
			

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(msgBytes)
			return
		}
		```

	=== "Javascript"

		```js
		// GetQR returns auth request
		async function getQR(req,res) {

			// Audience is verifier id
			const hostUrl = '<YOUR REMOTE HOST>'; 
			const sessionId = 1;
			const callbackURL = "/api/callback"
			const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"

			const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

			// Generate request for basic authentication
			const request = auth.createAuthorizationRequestWithMessage(
				'test flow',
				'message to sign',
				audience,
				uri,
			);
			
			request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
			request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

			// Add request for a specific proof
			const proofRequest = {
			id: 1,
			circuit_id: 'credentialAtomicQuerySig',
			rules: {
				query: {
				allowedIssuers: ['*'],
				schema: {
					type: 'AgeCredential',
					url: 'https://schema.polygonid.com/jsonld/kyc.json-ld',
				},
				req: {
					birthDay: {
					$lt: 20000101, // bithDay field less then 2000/01/01
					},
				},
				},
			},
			};

			const scope = request.body.scope ?? [];
			request.body.scope = [...scope, proofRequest];

			// Store auth request in map associated with session ID
			requestMap.set(`${sessionId}`, request);

			return res.status(200).set('Content-Type', 'application/json').send(request);

		}
		```

	Note the auth request doesn't need to include a query for a specific proof (`mtpProofRequest`). A web application can simply create an authorization request with a message to sign only using the [`auth.createAuthorizationRequestWithMessage`](https://github.com/iden3/js-iden3-auth/blob/develop/src/auth/auth.ts#L29) method without appending any Scope to the request body. An even simpler authorization request may also not need any message to sign, in that case you should implement the [`auth.createAuthorizationRequest`](https://github.com/iden3/js-iden3-auth/blob/develop/src/auth/auth.ts#L22) authorization method. 

4. **Callback endpoint**

	The callback post endpoint receives the JWZ from the identity wallet. The role of the callback endpoint is to execute the verification on the proof and further verification based on its input. The verification is executed inside the `verifier.FullVerify` function 

	> To ADD: The identity state `contractAddress` on polygon mainnet is 0xb8a86e138C3fe64CbCba9731216B1a638EEc55c8. The public verification keys for iden3 circuits generated after the trusted setup can be found [here](https://github.com/iden3/tutorial-examples/tree/main/verifier-integration/keys) and must be added to your project inside a folder called `keys`. Also, don't forget to add the RPC endpoint (such as Alchemy or Infura) inside the `ethURL` variable!

	=== "GoLang"

		```go
		// Callback verifies the proof after sign-in callbacks
		func Callback(w http.ResponseWriter, r *http.Request) {

			// Get session ID from request
			sessionID := r.URL.Query().Get("sessionId")

			// get JWZ token params from the post request
			tokenBytes, err := io.ReadAll(r.Body)

			// Add Polygon RPC node endpoint - needed to read on-chain state
			ethURL := "<RPCNODEURL>"

			// Add identity state contract address
			contractAddress := "0xb8a86e138C3fe64CbCba9731216B1a638EEc55c8"

			// Locate the directory that contains circuit's verification keys
			keyDIR := "../keys"

			// fetch authRequest from sessionID
			authRequest, _ := requestMap[sessionID]

			// load the verifcation key
			var verificationKeyloader = &loaders.FSKeyLoader{Dir: keyDIR}
			resolver := state.ETHResolver{
				RPCUrl:   ethURL,
				Contract: contractAddress,
			}

			// EXECUTE VERIFICATION
			verifier := auth.NewVerifier(verificationKeyloader, loaders.DefaultSchemaLoader{IpfsURL: "ipfs.io"}, resolver)
			authResponse, err := verifier.FullVerify(r.Context(), string(tokenBytes),
				authRequest.(protocol.AuthorizationRequestMessage))
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			userID := authResponse.From

			messageBytes := []byte("User with ID " + userID + " Successfully authenticated")

			w.WriteHeader(http.StatusOK)
			w.Header().Set("Content-Type", "application/json")
			w.Write(messageBytes)

			return

		}
		```

	=== "Javascript"

		```js
		// Callback verifies the proof after sign-in callbacks
		async function callback(req,res) {

			// Get session ID from request
			const sessionId = req.query.sessionId;

			// get JWZ token params from the post request
			const raw = await getRawBody(req);
			const tokenStr = raw.toString().trim();

			// fetch authRequest from sessionID
			const authRequest = requestMap.get(`${sessionId}`);
				
			// Locate the directory that contains circuit's verification keys
			const verificationKeyloader = new loaders.FSKeyLoader('../keys');
			const sLoader = new loaders.UniversalSchemaLoader('ipfs.io');

			// Add Polygon RPC node endpoint - needed to read on-chain state and identity state contract address
			const ethStateResolver = new resolver.EthStateResolver('<RPCNODEURL>', '0xb8a86e138C3fe64CbCba9731216B1a638EEc55c8');

			// EXECUTE VERIFICATION
			const verifier = new auth.Verifier(
			verificationKeyloader,
			sLoader, ethStateResolver,
		);


		try {
			authResponse = await verifier.fullVerify(tokenStr, authRequest);
		} catch (error) {
		return res.status(500).send(error);
		}
		return res.status(200).set('Content-Type', 'application/json').send("user with ID: " + authResponse.from + " Succesfully authenticated");
		}
		```

## Verification Procedure

The auth library provides a simple handler to extract all the necessary metadata from the JWZ token and execute all the verifications needed. The verification procedure that is happening behind the scenes involves: 

### Zero Knowledge Proof Verification

Starting from the circuit specific public verification key, the proof and the public inputs provided by the user inside the JWZ it is possible to verify the proof. In this case the Proof verification involves: 

- Verification of the proof contained in the JWZ signature based on the [`Auth Circuit`](../circuits/main-circuits.md#authentication)
- Verification of the proof contained in the JWZ payload based on the [`AtomicQuerySig Circuit`](../circuits/main-circuits.md#credentialatomicquerysig) or [`AtomicQueryMTP`](../circuits/main-circuits.md#credentialatomicquerymtp) based on the query.

### Verification of On-chain Identity States

Starting from the Identifier of the user, the State is fetched from blockchain and compared to the state provided as input to the proof to check whether the user is actually "owner" of the state used to generate the proof. It's important to note here is that there's no gas cost associated with the verification as the VerifyState method is just reading the identity state of the user on-chain without making any operations/smart contract call. The same verfication is performed for the Issuer Identity State.

In this part, it is also verified that the claim hasn't been revoked by the Issuer.

### Verification of Circuit Public Inputs

This involves a verification based on the public inputs of the circuits used to generate the proof. These must match the rules requested by the verifier inside the auth request. For example the query and the claim schema used by the user to generate the proof must match the auth request:

  - The message signed by the user is the same as the one passed to the user in the auth request
  - The rules such as the `query` or the claim `schema` used as public input for the circuit match the ones included inside the auth request. 
  
This "off-circuit" verification is important because a user can potentially modify the query and present a valid proof. A user born the 2000-12-31 shouldn't pass the check. But if they generate a proof using a query input `"$lt": 20010101`, the verifier would see it as a valid proof. By doing verifying the public inputs of the circuit, the verifier is able to detect the cheat.

> The executable code for this section can be found [here](https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration)


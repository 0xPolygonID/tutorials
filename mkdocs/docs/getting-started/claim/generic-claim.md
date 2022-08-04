# Generic Claim

A [Claim](https://docs.iden3.io/protocol/spec/#claims) is a statement made by one identity about another identity or about itself. In some cases claims can be stored as leaves in the Identity Sparse Merkle Tree (we'll see later why this is not always the case). Let's see how they look like.

1. **Update the required dependencies.**

	```bash
	go get github.com/iden3/go-iden3-core
	```

2. **Define the claim schema**.

	A [claim schema](./claim-schema.md) defines how a set of data must be stored inside a claim. In this example, we will use a schema called `ageSchema`. According to this schema the age is stored in the first index slot of the [claim data structure](https://docs.iden3.io/protocol/claims-structure).

    The hash of the schema is generated from the content of the schema document. For our example, the hash of the schema is: *`ce38102464833febf36e714922a83050`*

	Note, that the age schema example is provided only for illustrative purposes. In real life, you would store some constant information like the date of birth, but not the age, which changes over time.

3. **Create a generic claim.**  

	```go
	package main

	import (
		"encoding/json"
		"fmt"
		"math/big"

		core "github.com/iden3/go-iden3-core"
	)

	// create basic claim
	func main() {
	
		ageSchema, _ := core.NewSchemaHashFromHex ("ce38102464833febf36e714922a83050")  

		// define age
		age := big.NewInt(25)

		// create claim based on the ageSchema storing the age in the first index slot, while the second data slot remains empty 
		claim, _ := core.NewClaim(ageSchema, core.WithIndexDataInts(age, nil)) 

		// transform claim from bytes array to json 
		claimToMarshal, _ := json.Marshal(claim)

		fmt.Println(string(claimToMarshal))
	}
	```
Here is what the claim would look like:
```
["106590880073303418818490710639556704462","0","25","0","0","0","0","0"]
```
In particular, the first 4 values of the claim represent the `Index` part of the claim while the last 4 represent the `Value`.
```
Index:
{
"106590880073303418818490710639556704462", // Schema hash
"0",
"25", // first index data slot stores age
"0"  //  second index data slot is blank
}

Value:
{ 
"0",
"0",
"0", // first value data slot
"0"  // second value data slot
}	
```

The data stored in the first position of the Index contains a reference to the schema of the claim. As defined in the `ageSchema`, the value age must be stored in the first index data slot while the second index data slot and the two value data slots are left empty. Other schemas may provide different rules on where to store the data.

**The claim is a flexible and modular data primitive that can be used to represent any identity-related information**

> The executable code can be found [here](https://github.com/0xPolygonID/tutorial-examples/blob/main/issuer-protocol/main.go#L62)

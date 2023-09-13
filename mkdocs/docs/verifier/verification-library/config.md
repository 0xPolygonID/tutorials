# Configuration

The set of APIs included in the verification library can be split into two steps:

- [Request APIs](./request-api-guide.md) allow to design the request to be presented to the user in order to authenticate.
- [Verification APIs](./verification-api-guide.md) allow verifying the proof sent by the user. The proof is generated as response to the request. 

> Check the [workflow](./verifier-library-intro.md) to disambiguate between these two processes

Both the APIs are available either in Golang or Javascript:

=== "GoLang"

    ```bash
    go get github.com/iden3/go-iden3-auth/v2
    ```

    ```go
    import (
        "github.com/iden3/go-circuits/v2"
        auth "github.com/iden3/go-iden3-auth/v2"
        "github.com/iden3/go-iden3-auth/v2/loaders"
        "github.com/iden3/go-iden3-auth/v2/pubsignals"
        "github.com/iden3/go-iden3-auth/v2/state"
        "github.com/iden3/iden3comm/v2/protocol"
    )
    ```    

=== "Javascript"

    ```bash
    npm i @iden3/js-iden3-auth --save
    ```

    ```js
    const {auth, resolver, protocol} = require('@iden3/js-iden3-auth')
    ```

# Configuration

The set of APIs included in the verification library can be split into two main categories:

- [Authentication Request APIs](./request-api-guide.md) allow to design criteria in order to authenticate a user
- [Verification APIs](./verification-api-guide.md) allow to verify the proof sent by the user

Both the APIs are available either in Golang and Javascript

=== "GoLang"

    ```bash
    go get github.com/iden3/go-iden3-auth && github.com/iden3/go-circuits && github.com/iden3/iden3comm/protocol
    ```

    ```go
    import (
        "github.com/iden3/go-circuits"
        auth "github.com/iden3/go-iden3-auth"
        "github.com/iden3/go-iden3-auth/loaders"
        "github.com/iden3/go-iden3-auth/pubsignals"
        "github.com/iden3/go-iden3-auth/state"
        "github.com/iden3/iden3comm/protocol"
    )
    ```       

=== "Javascript"

    ```bash
    npm i @iden3/js-iden3-auth --save
    ```

    ```js
    const {auth, resolver, protocol, loaders, circuits} = require('@iden3/js-iden3-auth')
    ```
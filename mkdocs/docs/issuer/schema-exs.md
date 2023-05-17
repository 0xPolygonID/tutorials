# Schema examples
Here are some schemas with different data types.

## Boolean

**schema**: https://raw.githubusercontent.com/0xPolygonID/issuer-node/main/docs/examples/schemas/json/exampleBoolean.json

**type**: CodingExperienceCredential

**body:**

```json
{
    "credentialSchema": "https://raw.githubusercontent.com/0xPolygonID/sh-id-platform/adding-schema-examples/docs/examples/schemas/json/exampleBoolean.json",
    "type": "CodingExperienceCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qLPX9XnujT2xhuiPMHrqXTUD96UCV87CtThRUZFQm",
        "codingExperience": true
    },
    "expiration": "2025-04-05T08:34:07.117Z",
    "signatureProof": true,
    "mtProof": false
}
```

## Date / Date-time

**schema:** https://raw.githubusercontent.com/0xPolygonID/issuer-node/main/docs/examples/schemas/json/exampleDate.json

**type:** HireDateCredential

**body:**

```json
{
    "credentialSchema": "https://raw.githubusercontent.com/0xPolygonID/sh-id-platform/adding-schema-examples/docs/examples/schemas/json/exampleDate.json",
    "type": "HireDateCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qLPX9XnujT2xhuiPMHrqXTUD96UCV87CtThRUZFQm",
        "hireDate": "2020-12-12"
    },
    "expiration": "2025-04-05T08:34:07.117Z",
    "signatureProof": true,
    "mtProof": false
}
```

## Integer

**schema:** https://raw.githubusercontent.com/0xPolygonID/issuer-node/main/docs/examples/schemas/json/exampleInteger.json

**type:** BirthdayCredential

**body:**

```json
{
    "credentialSchema": "https://raw.githubusercontent.com/0xPolygonID/sh-id-platform/adding-schema-examples/docs/examples/schemas/json/exampleInteger.json",
    "type": "BirthdayCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qLPX9XnujT2xhuiPMHrqXTUD96UCV87CtThRUZFQm",
        "birthday": 20201012
    },
    "expiration": "2025-04-05T08:34:07.117Z",
    "signatureProof": true,
    "mtProof": false
}
```

## Number (float/double)

********schema:******** https://raw.githubusercontent.com/0xPolygonID/issuer-node/main/docs/examples/schemas/json/exampleNumber.json

**type:** SalaryCredential

**body:**

```json
{
    "credentialSchema": "https://raw.githubusercontent.com/0xPolygonID/sh-id-platform/adding-schema-examples/docs/examples/schemas/json/exampleNumber.json",
    "type": "SalaryCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qLPX9XnujT2xhuiPMHrqXTUD96UCV87CtThRUZFQm",
        "salary": 1000.0
    },
    "expiration": "2025-04-05T08:34:07.117Z",
    "signatureProof": true,
    "mtProof": false
}
```

## String

**schema**: https://raw.githubusercontent.com/0xPolygonID/issuer-node/main/docs/examples/schemas/json/exampleString.json

**type:** RoleCredential

**body:**

```json
{
    "credentialSchema": "https://raw.githubusercontent.com/0xPolygonID/sh-id-platform/adding-schema-examples/docs/examples/schemas/json/exampleString.json",
    "type": "RoleCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qLPX9XnujT2xhuiPMHrqXTUD96UCV87CtThRUZFQm",
        "role": "developer"
    },
    "expiration": "2025-04-05T08:34:07.117Z",
    "signatureProof": true,
    "mtProof": false
}
```

## Full example - multiple types

**schema:** https://raw.githubusercontent.com/0xPolygonID/issuer-node/main/docs/examples/schemas/json/exampleEmployee.json

**type:** EmployeeCredential

**body:**

```json
{
    "credentialSchema": "https://raw.githubusercontent.com/0xPolygonID/sh-id-platform/adding-schema-examples/docs/examples/schemas/json/exampleEmployee.json",
    "type": "EmployeeCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qLPX9XnujT2xhuiPMHrqXTUD96UCV87CtThRUZFQm",
        "role": "developer",
        "hireDate":"2022-10-10",
        "birthday": 19901204,
        "salary": 10000.0,
        "codingExperience": true
    },
    "expiration": "2025-04-05T08:34:07.117Z",
    "signatureProof": true,
    "mtProof": false
}
```
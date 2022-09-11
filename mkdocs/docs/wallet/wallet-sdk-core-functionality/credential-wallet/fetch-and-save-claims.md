
# Fetch and Save Claims

 An Integrator can fetch claims stored on an Issuer and then save it to the SDK. 

 To fetch and save a list of claims from Issuer, the `fetchAndSaveClaims()` function is called. 

 ```
 Future<List<ClaimEntity>> fetchAndSaveClaims(
      {required List<CredentialRequestEntity> credentialRequests}) 
      
      {
        return _fetchAndSaveClaimsUseCase.execute(param: credentialRequests);
      } 

```

The `fetchAndSaveClaims()` function uses a list of `Credential Request Entities`as the input parameter. A `Credential Request Entity` is composed of the identifier string (generated using `createIdentity()` function), the circuit data and other related data). The function returns a list of `Claim Entities`. 

## Wallet-Issuer Interaction for Fetching Claims


- Integrator scans the QR code displayed on the Issuer site.

- The Integrator requests the `Credential Request Entities` (or claims) that it intends to fetch from the Issuer. The Identifier that forms part of a `Credential Request Entity` is used to authenticate the Integrator. 

- Issuer validates the identity returns a list of `Claim Entities` back to the Integrator.

- The claims are added to the Polygon ID app and are stored on the SDK. 

# Get Claims

After a claim is fetched from an Issuer and stored on the wallet sdk, an Integrator can retrieve this claim from the storage. This is done using `getClaims()` function. 

```
Future<List<ClaimEntity>> getClaims({List<FilterEntity>? filters}) 

    {
        return _getClaimsUseCase.execute(param: filters);

    }
```
This function returns a list of `Claim Entities` based on some pre-defined criteria or filters. 

## Get Claims by Ids

A list of claims stored on the sdk can be retrieved using claim ids. This is done using  the `getClaimsByIds()` function: 

```
Future<List<ClaimEntity>> getClaimsByIds({required List<String> ids}) 

    {
        return _getClaimsUseCase.execute(param: [
        FilterEntity(operator: FilterOperator.inList, name: 'id', value: ids)
    ]);

    }
```

## Remove Claims

The claims stored on the sdk can be removed locally (they remain on the Issuer unless removed by it) by the Integrator. This is done using `removeClaims()` function, which removes claims from a list of ids:

```
Future<void> removeClaims({required List<String> ids}) 

    {

        return _removeClaimsUseCase.execute(param: ids);
    }
```
A single claim can also be removed based on its id using the `removeClaim()` function:

```
Future<void> removeClaim({required String id}) 

    {

    return _removeClaimsUseCase.execute(param: [id]);

    }

```

In the near future, additional functionality including updating claims would also be available on the PolygonID sdk. 
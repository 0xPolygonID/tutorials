# To Remove Claims: 'removeClaims'
 
The claims stored on the SDK can be removed locally (they remain on the Issuer unless removed by it) by the Integrator. This is done using `removeClaims()` function, which removes claims from a list of ids:
 
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
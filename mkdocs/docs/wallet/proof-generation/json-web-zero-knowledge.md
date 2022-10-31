# JWZ
 
JWZ stands for JSON Web Zero-Knowledge. Based on the existing secure messaging standards, namely, JWM (JSON Web Message) and JWT (JSON Web Token),
 
 
JWZ is a standard format for representing and sending secure messages backed by zero-knowledge technology. It is a novel way of providing interaction between two parties that intend to exchange messages while keeping the sender's public keys hidden. The proof that the SDK generates is packed in the JWZ format and sent to the Verifier using `callbackUrl`.  
 
## Structure of JWZ
 
JWZ structure can be separated into three parts: header, body (payload message) and the zk proof (proving that we are what we are claiming to be true, i.e. we are the ones that are signing and generating the proof). JWZ is used both on the issuer and the Verifier side authentication. An example of JWZ is given below:
 
**Example of JWZ Structure**
 
***First Part: Header***:
 
"eyJhbGciOiJncm90aDE2IiwiY2lyY3VpdElkIjoiYXV0aCIsImNyaXQiOlsiY2lyY3VpdElkIl0sInR5cCI6ImFwcGxpY2F0aW9uL2lkZW4zLXprcC1qc29uIn0"
 
which when decoded from the Base64 format looks like:
 
```json
 
{
   "alg": "groth16",
   "circuitId": "auth",
   "crit": [
       "circuitId"
   ],
   "typ": "application/iden3-zkp-json"
}
 
```
where:
**alg**: algorithm based on zero-knowledge and used for generating proofs.
**circuitId**: Type of circuit used for proof generation: `auth` or `atomicquerySig` circuits. Use `auth` for basic authentication and `atomicquerySig` for signature-based requests
**typ**: As mentioned in [types-of-auth-request-and-proofs](./types-of-auth-requests-and-proofs.md), typ is iden3comm Media Type or media type of the message sent. In the example above, it is JSON.
 
***Second Part: Message***:
 
eyJpZCI6Ijc5MjIzYWQ2LTQyY2UtNDZjNy1iODBjLWQyNGYwMjg3NDg0MCIsInR5cCI6ImFwcGxpY2F0aW9uL2lkZW4zY29tbS1wbGFpbi1qc29uIiwidHlwZSI6Imh0dHBzOi8vaWRlbjMtY29tbXVuaWNhdGlvbi5pby9hdXRob3JpemF0aW9uLzEuMC9yZXNwb25zZSIsInRoaWQiOiJhZTc0MTFhYi01ZmZiLTQ1YWUtYWNkMC05ZWRiOWYyOGZmNjIiLCJmcm9tIjoiMTE1dkFvZHQ3R0g5dUJwYzg1ajhyaGtiaDk5ZVNtMXZHcWt6MVJ2enVCIiwidG8iOiIxMTI1R0pxZ3c2WUVzS0Z3ajYzR1k4N01NeFBMOWt3REt4UFVpd01MTloiLCJib2R5Ijp7Im1lc3NhZ2UiOiIiLCJzY29wZSI6W3siaWQiOjEsImNpcmN1aXRfaWQiOiJjcmVkZW50aWFsQXRvbWljUXVlcnlTaWciLCJwcm9vZiI6eyJwaV9hIjpbIjE2OTIyMDg1MzIzMzExMzUyNzk1MzEyMjAyMzUzMzIzMzE1Mzk2NjU1NTcwMjQ4OTIzNjA0MDk4MTk1OTQxNzUwNTIzODA3MDUyNTUyIiwiMTM4NzIzNzY5MzMxNzgxMDU1NTk2NDIxMzg4MjI4MDcyNzA5MzQ2Njc5NzYxMzMxNjU1MTE1MDQ5NzIyNjkxMDA5NjU1NjA2NTQxMTgiLCIxIl0sInBpX2IiOltbIjExOTc0NjA3ODE0NTg0MTk4MzkyNjk5NjYyMDY1MzY3MzA5NzkxNzM0OTQzNDMzMzAzMjgyNjIwMzg1OTU3MTYwNTQxNDE5NDM4MjIiLCIxMDc2NzIwNzQ1OTUzNjYwMTc3OTM0MDYxMTM1NDg0MDYxMjQ0MTkyNzkwOTYzMjY0NTkyODU5NDE0NzA4Nzc2NDY0MTQyODMyNTA5NiJdLFsiNjc1MzEyNTc4MDI1NzU3Mjg4ODM4NjUyMjI4MTQxMjMwMjgzMDYxNDU3NTkwMDU5ODg4MDA1MDkwNTc3MDgzOTU3NDc1MjUxMjA2MSIsIjEwMTI4MzAxMTczMjkwMDk3MzcyMjcwNjc1NzMwODQzMjI4NDE1MjY2NDM0MDkzMTc0NDg0NDk0NTY1OTk2MjM3NDc4MTY1OTkwNTEyIl0sWyIxIiwiMCJdXSwicGlfYyI6WyI4OTY0MjcxOTMwODM2MDcxMDY0NTg2MzI0MzY5MzQ2NjEyNzA1ODA1MTc2Mzk5OTc3MDQ0NzIwMjgwMzU3OTM2NzA1MjU4NDQ1NDEwIiwiMTM2MjYyNzcyMTk3NzQzMjY3NTEyMDQ5NDcwMjg4NTA4MjAwNzc2NTY5Njc3NDIxNDI4MTUyOTIxNzA5MjA5OTI0NTc2MjY2MDg1NzMiLCIxIl0sImN1cnZlIjpudWxsLCJwcm90b2NvbCI6Imdyb3RoMTYifSwicHViX3NpZ25hbHMiOlsiOTUwMjE3NDgxMDM0NzA5MzMwMDAwMTE3Mjg2NDQ1NTAzOTYxNDE1MDU4Mzk5MjEyNzg3MzAwNjM1MTEyNzU3ODQ5NTEzNzk1OTc5MiIsIjE2NjE4MDYxMTQwNTc1MzMyODI0MDkwODM5MDIxODg3ODgwMTQ2NDkzMDM4Nzc3MDAwODcyODkyNzQ5NTY2NjY0MjgwMzQ5MDgxNiIsIjYwODc5MTAyODc4NzcyMDc4Nzc5MjE4NzUyMjk0ODQ3MDcyMTg4NDk4MDE5MDEyNjYxNTk5ODM0MzA1ODc3Nzc1ODU3ODI1NTE3MzgiLCIxIiwiMjUyNzM1NjE1ODQ2ODc3ODE5NzM1MzUwOTYwNTY0OTcxMzg0NTY4MTI1NDY5NjI4Mjc5NDQ0MTI0MzM1MjY2MzQ2NTM1MDI2Njg4IiwiMTAzMjUzNDk0MzMwODAzMjI0OTczNDc1OTQzOTEyNjAzNzI3NjcwMjEwOTYxNTcyNDIwMzE5NzYxMDA4NjAyMzkwODA4NTQ1ODIyMzEiLCIxNjYzMjQ2NDIxIiwiMjEwNDU5NTc5ODU5MDU4MTM1NDA0NzcwMDQzNzg4MDI4MjkyMzk4IiwiMiIsIjIiLCIyMDAwMDEwMSIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCJdfV19fQ
 
which when decoded from the Base64 format looks like:
 
```json
{
 "id": "28494007-9c49-4f1a-9694-7700c08865bf",
 "typ": "application/iden3comm-plain-json",
 "type": "https://iden3-communication.io/authorization/1.0/response",
 "thid": "7f38a193-0918-4a48-9fac-36adfdb8b542",
 "body": {
   "message": "message to sign",
   "scope": [
     {
       "id": 1,
       "circuit_id": "credentialAtomicQueryMTP",
       "proof": {
         "pi_a": [
           "20973485107186613835294420504168844900060429745180277370078136645423323796988",
           "20876512355517454358387352357430469269532511208427702435640954212414846794988",
           "1"
         ],
         "pi_b": [
           [
             "15359787792291301524429511563163819833209670586891499149880103897821631812320",
             "952148097741318750401406678248864482408113418728045541853254838790211944557"
           ],
           [
             "3866547068988378419787216494850441937393748849859411619995030091666678234233",
             "12737260954983772047680437941193675886215315463965099527215354428856166589220"
           ],
           [
             "1",
             "0"
           ]
         ],
         "pi_c": [
           "14032051669376519932957072147382739134658885782661390170658631107795386034990",
           "3426651920168576141328466441385872894824417141788260830832563707950605034542",
           "1"
         ],
         "protocol": "groth16"
       },
       "pub_signals": ["227999792560601581143923121210388382198276828932112237742319153709274234880","10099789665300975457802178862296098271243359660315802759495016285352640212814","12345","8390795654739203972616926774091445498451520813142121365678565136228528725312","206811791431269707427589302274952473147879888022142096363950465656014110720","1653057062","106590880073303418818490710639556704462","2","4","840","120","340","509","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
     }
   ]
 },
 "from": "119tqceWdRd2F6WnAyVuFQRFjK3WUXq2LorSPyG9LJ",
 "to": "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"
}
```
 
where, in addition to the fields explained in [types-of-auth-request-and-proofs](./types-of-auth-requests-and-proofs.md), there are some additional fields such as **proof**, **protocol**, and **pub_signals**
 
As seen above from the **type** field, this is a message of the type `authorization response`. Under the **scope** filed, you can see a sub-field called **proof** which is proof represented by three arrays `a, b, and c`. **from** is the sender's identity and **to** is the receiver's identity (Verifier).
 
***Third Part: Proof***:
 
 
eyJwcm9vZiI6eyJwaV9hIjpbIjU0Mzg5NDc4ODY5MDQzMDEzMzE0OTgwMzM2NDU0MTIxMTQ5NzE4NDMwMTMyMzA3NDAxOTQxNzcxMzk3OTc0ODYwMzE0MTUwNzgwODIiLCIyMDEwNjEyMzY5NTYyNTk2MTkwMDYzMDg3NjM0ODMwNzc5ODQwNzAyMjc2OTkxODI5OTM3NzE2MzgzMzQ3MjkzNjI0NTg4ODc4ODY0OCIsIjEiXSwicGlfYiI6W1siMTczOTE5ODk3MDkwNjIxMTUyNTA0NzI2OTQ4NDgwNjIwOTk3Mzk3Mjk3NDYzNTAyNDI2MTY4NjkyMTAxNzgxODMzMTc1ODkxNTc0MDUiLCI0MjkwMjI5NDI1NDU2MDM1MDkzMjM4NTM2NTcxNTIwNDQ2MDg2OTc3NDcwNTI3MTM3ODY4NTk1OTAxOTgxMzk1MDMwODY3MzU2Mzg5Il0sWyIzMDk1OTgxMzg2Nzc3NDE3NTIzMDE1ODc0MzYwNDMxMzc2NTExNDQxMTE2MzEwODQwNDcyMTQxMDg1MDY4NDI0NjE0NzE0Mjk2MTM1IiwiMTcwMDA4OTYxNDI5Mjc0NDQ3NTk2OTg3NjUxNTQwMTQzNDY4Mzg4MzM3NDQyNTU3NzE1MTg5NDY4MTYwMDU0OTIyNjI3ODkzNzgwNiJdLFsiMSIsIjAiXV0sInBpX2MiOlsiNDQ3OTE2NDY3MzAzMzI4NDI4ODQ5NTcwNzU2ODM4OTA4ODE4NDg3NDQ0NzcyNTQxNzcwNjIwMjE3MjQxNDUzOTkxNjMzNzIyMDcxNCIsIjY2NTczNDI1Njc1MDMwMTgwODM0MjM2MjkyNTQ0NzAwOTYzMjY3NzkzNzYzOTc2NjkwMTkxMjYwODgyNjMzODE3MTUyMTUzNjI4MTgiLCIxIl0sInByb3RvY29sIjoiZ3JvdGgxNiJ9LCJwdWJfc2lnbmFscyI6WyIxMTQ1NjI2MTYyNTkzODg1NDQwMTMyNzU3NDg3OTM5MjQxNzM4MzY5ODE0MzUxOTkxMzYzNDg4MTgxOTI2ODI1NTQ4NzQyNTQxMzUwIiwiNjA4NzkxMDI4Nzg3NzIwNzg3NzkyMTg3NTIyOTQ4NDcwNzIxODg0OTgwMTkwMTI2NjE1OTk4MzQzMDU4Nzc3NzU4NTc4MjU1MTczOCIsIjE2NjE4MDYxMTQwNTc1MzMyODI0MDkwODM5MDIxODg3ODgwMTQ2NDkzMDM4Nzc3MDAwODcyODkyNzQ5NTY2NjY0MjgwMzQ5MDgxNiJdfQ
 
which when decoded from the Base64 format looks like:
 
```json
{
   "proof": {
       "pi_a": ["5438947886904301331498033645412114971843013230740194177139797486031415078082","20106123695625961900630876348307798407022769918299377163833472936245888788648","1"],
       "pi_b": [
           [
               "17391989709062115250472694848062099739729746350242616869210178183317589157405",
               "4290229425456035093238536571520446086977470527137868595901981395030867356389"
           ],
           [
               "3095981386777417523015874360431376511441116310840472141085068424614714296135",
               "1700089614292744475969876515401434683883374425577151894681600549226278937806"
           ],
           [
               "1",
               "0"
           ]
       ],
       "pi_c": [
           "6216423503289496292944052032190353625422411483383378979029667243785319208095",
           "6657342567503018083423629254470096326779376397669019126088263381715215362818",
           "1"
       ],
       "protocol": "groth16"
   },
   "pub_signals": [
       "1145626162593885440132757487939241738369814351991363488181926825548742541350",
       "6087910287877207877921875229484707218849801901266159983430587777585782551738",
       "166180611405753328240908390218878801464930387770008728927495666642803490816"
   ]
}
 
 
To know more about the difference between JWZ and JWT, its usage and libraries, click [here](https://0xpolygonid.github.io/tutorials/verifier/verification-library/jwz/)
 
Read more on JWZ code [here](https://github.com/iden3/go-jwz/blob/main/jwz.go).

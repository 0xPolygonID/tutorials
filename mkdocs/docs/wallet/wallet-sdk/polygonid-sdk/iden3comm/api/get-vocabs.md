# To Get Vocabs: `getVocabsFromIden3Message` 
 
It gets the vocabulary json-ld files to translate the values of the schemas to be used by Integrators in a human-readable form in their apps.
 
```
Future<List<Map<String, dynamic>>> getVocabsFromIden3Message(
      {required Iden3MessageEntity message}) {
    return _getVocabsFromIden3MsgUseCase.execute(
        param: _schemaInfoMapper.mapFrom(message));
  }
```
<!-- Does above line need to be replaced with its override : return _getVocabsFromIden3MsgUseCase.execute(param: message) ? -->
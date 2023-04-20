# To Get Vocabs: `getVocabsFromIden3Message` 
 
It gets the vocabulary JSON-LD files to translate the values of the schemas to be used by Integrators in a human-readable form in their apps.
 
## Get Vocabulary

The `getVocabsFromIden3Message()` method uses `Iden3MessageEntity` as the input parameter and returns a list of maps of vocabulary JSON-LD files. 

```dart
Future<List<Map<String, dynamic>>> getVocabsFromIden3Message(
      {required Iden3MessageEntity message}) 
```



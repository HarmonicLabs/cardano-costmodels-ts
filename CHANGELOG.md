# Changelog

## 1.7.0

Cost models decoded like cardano-ledger, made for pragma-org's
[node-diversity-conformance](https://github.com/pragma-org/node-diversity-conformance) `cbor-decoding` scenario,
where every cost model in the corpus was dropped before (item 582, 114 samples).

### Changed
- `@harmoniclabs/cbor` is a peer dependency, and the decoders are duck-typed: a map parsed by another copy of cbor
  (for example cardano-ledger-ts's) decodes instead of being silently ignored.
- Cost models decode like cardano-ledger and round-trip: negative int64 entries accepted; languages 3–255 kept in
  `CostModels.unknownLanguages`; a known language whose list has an unexpected length is kept as a raw `bigint[]`.

### Compatibility
- Install: a consumer must have `@harmoniclabs/cbor` 2.x (npm 7+ installs peers automatically).
- Invalid input throws instead of being skipped.
- The language entries' TypeScript type widens (`bigint[]` for unexpected lengths).
- Valid cost models decode to the same values as before.

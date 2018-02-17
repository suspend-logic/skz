# SKZ
## What is this?
A set of utilities I find useful in day to day JS programming.
100% Test Coverage.

## API
### sieve (Array|Object, Properties)
Sieve works by only allowing the specified properties on the Object or Array of Objects supplied. 
In code:
```JS
    sieve({a: 10, b: 20}, ["b"]) === {b: 20}
    sieve({a: 10, b: 20, c: 30}, ["a"]) === {a: 10}
    sieve([{a: 10, b: false}, {a: 20, b: true, c: null}], ["b"]) === [{b: false}, {b: true}]
```
Sieve accepts a single Object, or an array of Objects. If the input is an array, it returns an Array with sieve applied to every object in the array.
Sieve clones objects supplied to it by using Object.extend, it leaves the input data intact.

### pluck (Array|Object, Properties)
Pluck works as the opposite of Sieve, removing the properties specified. Like sieve, it operates on a single Object or an Array of Objects.
In code:
```JS
    pluck({a: 10, b: 20}, ["b"]) === {a: 10}
    pluck({a: 10, b: 20, c: 30}, ["a"]) === {b: 20, c: 30}
    pluck([{a: 10, b: false}, {a: 20, b: true, c: null}], ["b"]) === [{a: 10}, {a: 20, c: null}]
```
Pluck clones the objects supplied to it by using Object.extend, leaving the input data intact.

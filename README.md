# FxJS

Try to learn `functional programming` (Iterable Program - LISP)

> 📎 based on <a href="https://github.com/marpple/FxJS/blob/master/README_kr.md#Getting-Started">Fxjs Library</a>

<br/>
<br/>

<code>💡 The following article is a compilation of some of the basic concepts I've learned about iterables.</code>

> Important Concept of Functional Programming in ES6+
## Iteration Protocol - introduced in ES6
It's the pre-promised rule written on ECMASCRIPT SPECS which is order to make iterable data collection

Prior to ES6, without the unified rule, iterable data collection such as Array, String, array-like-Object 
 and DOM Collections(NodeList, HTMLCollection)  could be traversed or looped in multiple ways using `for...in`, `for` statement and `forEach` method.

ES6 unifies iterable data collection into iterables that conform to the `iteration protocol` so that they can be used as targets of `for ... of` statements, `spread syntax`, and `array destructuring assignments`.

<br/>
<br/>

### `1. iterable protocol`
Calling a method that uses the well-known Symbol `Symbol.iterator` as a property key, and implementing it yourself or inheriting it from `prototype chain` will return an `iterator` that conforms to the `iterator protocol`. This convention is called the `iterable protocol`, and an object that conforms to the `iterable protocol` is called an `iterable`.

`Iterable` can be traversed by `for...of` statements, used in spread syntax, and assigned as targets for array destructuring.
That's why we use String as iterable.

```js
const str = 'string';
console.log([...str]); // ['s', 't', 'r', 'i', 'n', 'g'];
```

<br/>
<br/>

### `2. iterator protocol`

Calling `Symbol.iterator` on an `iterable` returns an `iterator` that conforms to the `iterator protocol`. The `iterator` owns a `next` method, which when called traverses the iterable and returns an iterator `result` object with properties `value` and `done`.

An object that conforms to the `iterator protocol` is called an `iterator`, and an iterator do as a pointer to navigate through the elements of an `iterable`.

```js
const arr = [1,2,3];
const iterator = arr[Symbol.iterator]();
// Array Iterator {}
// [[Prototype]]: Array Iterator

console.log(iterator.next()); // { value: 1. done: false }
console.log(iterator.next()); // { value: 2. done: false }
console.log(iterator.next()); // { value: 3. done: false }
console.log(iterator.next()); // { value: undefined. done: true }
```

We can say `Array`, `String`, `Map`, `Set`, NodeList, HTMLCollection(DOM Collection) are an `iterable`.

e.g.
`Array` is an `iterable` which extends `Symbol.iterator `method from `Array.prototype`. That's why it can be looped and traverse by `for...of` and can be used as the target of `Spread Syntax` and `Array Destructuring Assignments`.

```js
const array = [1, 3, 5];

console.log(Symbol.iterator in array); // true

for (const item of array) {
  console.log(item); 
  // 1
  // 3
  // 5
}

const [a, ...rest] = array;
console.log(a); // 1
console.log(rest); // [3,5]
```

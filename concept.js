// L.filter(conditionArrowFunction, iterable)
const it = L.filter((a) => a % 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(it); // Generator {<suspended>}

const its = [...it];
console.log(it); /// Generator {<suspended>}

console.log(its); // spread syntax로 즉시 평가 [1,3,5,7,9]
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

/**
 * L.take(limit, iterable)
 * 최대 limit 만큼 요소를 꺼내겠다는 의미
 */

const it1 = L.take(2, [1, 2, 3]);
console.log(it1);
console.log(it1.next()); // { value :1, done: false}
console.log(it1.next()); // { value :2, done: false}

console.log("f2", f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

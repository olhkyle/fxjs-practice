// 이터러블 프로그래밍 혹은 리스트 프로세싱(Lisp)
const { L, C } = window._;

// 1. 홀수 n개 더하기
const f1 = (limit, list) => {
  let acc = 0;

  for (const item of list) {
    if (item % 2) {
      const b = item * item;
      acc += b;
      if ((limit -= 1) == 0) break;
    }
  }

  return acc;
};

console.log("f1", f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

/**
 * 2. if를 filter로
 * 3. 값 변화 후 변수 할당을 map으로
 * 4. break를 take로
 * 5. 축약 및 합산을 reduce
 */

const f2 = (limit, list) => {
  let acc = 0;

  for (const a of L.take(
    limit,
    L.map(
      (a) => a * a,
      L.filter((a) => a % 2, list)
    )
  )) {
    acc += a;
    // if ((limit -= 1) == 0) break; // index가 3번째까지만 가져온다는 뜻
  }

  return acc;
};

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

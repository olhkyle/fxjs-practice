/**
 * 명령형 습관 지우기 - 만능 reduce? no!
 */

const { L, C } = window._;

// 💿 1. reduce + 복잡한 함수 + acc 보다 map + 간단한 함수 + reduce

const users = [
  { name: "AA", age: 35 },
  { name: "BB", age: 26 },
  { name: "CC", age: 28 },
  { name: "CC", age: 34 },
  { name: "EE", age: 23 },
];

// 2의 코드가 초기값을 설정하는 것보다, 합할 데이터 유형을 같게 만들어줄 경우 코드가 더 간결하다.
// 1의 코드에서는 reduce의 콜백함수의 이름을 짓기도 애매할 뿐더러, 재사용 가능성이 없어보인다.

// 1
console.log(_.reduce((total, { age }) => total + age, 0, users));

// 2
const add = (a, b) => a + b;
const ages = L.map(({ age }) => age);

// prettier-ignore
console.log(
  _.reduce(add, ages(users))
);

/**
 * 💿 2. reduce 하나보다 map + filter | reject + reduce2. reduce 하나보다 map + filter | reject + reduce
 *
 * */
console.log(
  _.reduce(
    (total, user) => (user.age >= 30 ? total : total + user.age),
    0,
    users
  )
);

// prettier-ignore
console.log(
  _.reduce(add,
    L.map((user) => user.age,
      L.filter((user) => user.age < 30, users)
    )
  )
);

// 3. query, queryToObject
const obj1 = {
  a: 1,
  b: undefined,
  c: "CC",
  d: "DD",
};

// a=1&c=CC&d=DD
const query1 = (obj) => {
  let res = "";
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res !== "") res += "&";
    res += k + "=" + v;
  }
  return res;
};

const query2 = (obj) => {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return query + (i > 0 ? "&" : "") + k + "=" + v;
  }, "");
};

// reject를 활용하여 filter 고차함수의 인수로 전달하는 콜백함수의 결과 판정값이 !== 일 경우를 반전시킬 수 있다.

const join = _.curry((separator, iterable) =>
  _.reduce((a, b) => `${a}${separator}${b}`, iterable)
);

// prettier-ignore
const query3 = (obj) => {
  return join('&', _.map(([k, v]) => `${k}=${v}`,
  _.reject(([_, v]) => v === undefined, Object.entries(obj))
));
};

const query4 = (obj) =>
  _.go(
    obj,
    Object.entries,
    _.reject(([_, v]) => v === undefined),
    _.map(([k, v]) => `${k}=${v}`),
    join("&")
  );

// pipe를 활용하여 함수를 반환하도록 할 수도 있다.
const query5 = (obj) =>
  _.pipe(
    Object.entries,
    _.reject(([_, v]) => v === undefined),
    _.map(([k, v]) => `${k}=${v}`),
    join("&")
  );

console.log(query1(obj1));
console.log(query2(obj1));
console.log(query3(obj1));
console.log(query4(obj1));
console.log(query5(obj1));

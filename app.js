// 이터러블 프로그래밍 혹은 리스트 프로세싱(Lisp)
const { L, C } = window._;

// _ 라는 namespace 호출 후
// L.take(limit ~) -> takeLazy { suspended } 라는 '아직 평가되지 않은 lazy 상태의 값을 반환'
// C

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

  const add = (acc, cur) => acc + cur;

  // prettier-ignore
  _.reduce(add,
    L.take(limit,
      L.map((a) => a * a,
        L.filter((a) => a % 2, list))));

  // 상단의 코드가 읽기 어렵기 때문에 _.go()와 같은 코드로 사람이 읽기 좋은 코드로 뒤집을수도 있습니다. 위와 똑같이 동작합니다.
  _.go(
    list,
    L.filter((a) => a % 2),
    L.map((a) => a * a),
    L.take(limit),
    _.reduce(add),
    console.log
  );
  /**
   *  for (const a of L.take(
    limit,
    L.map(
      (a) => a * a,
      L.filter((a) => a % 2, list)
    )
  )) {
    acc += a;
    // if ((limit -= 1) == 0) break; // index가 3번째까지만 가져온다는 뜻
  }
   */

  return acc;
};

/**
 * 6. while을 range로
 * 7. 효과를 each로 구분
 */

const f3 = (end) => {
  let i = 0;
  // L.range(?start, ?stop, ?step)
  // while 문과 같은 명령형 프로그래밍고 달리 범위를 선언적으로 지정하여 표현할 수 있다.

  // _.each -> 부수 효과가 있다는 것을 구분하는 함수로 볼 수 있다.
  // 앞으로 어떤 일이 일어날 것이다라고 이야기 할 수 있다.
  _.each(console.log, L.range(1, end, 2)); // 1 3 5 7 9

  _.go(L.range(1, end, 2), _.each(console.log));
};

f3(10);

/**
 * 추억의 별 그리기, 구구단
 * _ 는 즉시 평가
 * L 는 lazy(suspended)
 */

// 1. 별 그리기
// L을 활용하여 map으로 순회하면서 지연되게 하면서 만들게 하여 배열을 덜 만들 수 있다.
const join = (separator) => _.reduce((a, b) => `${a}${separator}${b}`);

_.go(
  L.range(1, 6),
  L.map(_.range),
  L.map(L.map((_) => "*")),
  L.map(join("")),
  join("\n"),
  console.log
);

// 2. 구구단
// _.range(2,10)은 2이상 10미만을 의미
_.go(
  _.range(2, 10),
  _.map((a) =>
    _.go(
      _.range(1, 10),
      _.map((b) => `${a}x${b}=${a * b}`),
      join("\n")
    )
  ),
  join("\n\n"),
  console.log
);

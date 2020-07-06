interface Point {
  x: number;
  y: number;
  z: number;
}

const currentPoint: Point = { x: 0, y: 0, z: 0 };

function updateCurrentPoint<T>(patch: Partial<T>, target: T) {
  for (const [key, value] of Object.entries(patch) as Array<[keyof T, any]>) {
    if (value !== undefined) {
      target[key] = value;
    }
  }
}

updateCurrentPoint({ x: 1 }, currentPoint);

function* map2<A, B, R>(f: (a: A, b: B) => R, a: Iterable<A>, b: Iterable<B>): Iterable<R> {
  const iteratorA = a[Symbol.iterator]();
  const iteratorB = b[Symbol.iterator]();
  let iterableA = iteratorA.next();
  let iterableB = iteratorB.next();
  while (!iterableA.done && !iterableB.done) {
    yield f(iterableA.value, iterableB.value);
  }
}

/// const result: number[];
const result = Array.from(map2((a, b) => a+b, [1,2,3,4], [2,3,4,5]));

export {};

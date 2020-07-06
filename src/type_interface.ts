const X = Symbol('X');
const Y = Symbol('Y');

interface Interface<T> {
  x: number;
  readonly y: string;
  z?: boolean;
  f(x: number, y: number):  number;
  g<X>(x: X, y: X):  X;
  k(x: T): T;
  a: T;
  [X]: Function;
  [Y]: Object;
}

interface Interface2 extends Interface<number>, Type<number> {

}


type Type<T> = {
  x: number;
  readonly y: string;
  z?: boolean;
  f(x: number, y: number):  number;
  g<X>(x: X, y: X):  X;
  k(x: T): T;
  a: T;
  [X]: Function;
  [Y]: Object;
};

type Type2 = {
  aaa: Function;
} & Type<number> & Function;

type MyPartial<T> = {
  [key in keyof T]?: T[key];
};

interface MyPartialInterface<T> extends MyPartial<Type<T>> {

}

const y: MyPartialInterface<Type<number>> = {};

const x: MyPartial<Type<number>> = {};

let z: Array<any> & Function = null as any;

z(1,2,34);
z.push(1,2,3);


interface X {
  x: {
    a: number,
    b: number;
    d: Array<number>;
  },
  c: number;
}

interface DeepPartial_X {
  x?: {
    a?: number,
    b?: number;
    d?: Array<number | undefined>;
  },
  c?: number;
}

type DeepPartial<T> = {
  [key in keyof T]?: T[key] extends string | number | boolean | undefined | bigint | symbol | null ? T[key] : DeepPartial<T[key]>;
}

type DP_X = DeepPartial<X>;
const dp_x: DP_X = {
  x: {
    d: [1, 2, undefined],
  }
};



export {};

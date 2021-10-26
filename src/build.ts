import fs from "fs";

type Function = {
  name: string;
  f: any;
  docstring?: string;
  typeings?: string[];
};

const functions: Function[] = [
  {
    name: "boolean",
    typeings: [`function boolean<X>(x: X): boolean;`],
    f: function boolean(x) {
      return !!x;
    },
  },
  {
    name: "iff",
    docstring: `
      Evaluates _test_. If _test_ is not _false_ or _null_ returns _then_, otherwise returns _else__. If _else__ is not supplied it returns _null_.

      ### Examples:

      iff(eql('a', 'a'), 'yes') // 'yes'

      iff(eql('a', 'b'), 'yes') // _null_

      iff(eql('a', 'b'), 'yes', 'no') // 'no'
    `,
    typeings: [
      `function iff<T, E = null>(test: boolean, then: T, else_?: E): T | E;`,
    ],
    f: function iff(test, then, else_ = null) {
      // @ts-ignore
      return boolean(test) ? then : else_;
    },
  },
  {
    name: "eql",
    typeings: [`function eql<T>(a: T, b: T, ...args: T[]): boolean`],
    f: function eql(a, b, ...args) {
      return [a, b, ...args].every((v) => v === a);
    },
  },
];
// function eql<T>(a: T, b: T, ...args: T[]) {
//   return [a, b, ...args].every((v) => v === a);
// }
// _global.eql = eql;

// function and<T>(a: T, b: T, ...args: T[]) {
//   const all = [a, b, ...args];
//   const allTrue = all.every((v) => v === a);
//   return allTrue ? all[all.length] : false;
// }
// _global.and = and;

// function or<T>(a: T, b: T, ...args: T[]) {
//   const all = [a, b, ...args];
//   const allTrue = all.some((v) => v === a);
//   return allTrue ? all[all.length] : false;
// }
// _global.or = or;{
const build = () => {
  const fileString = functions.reduce((acc, curr) => {
    return `
      ${acc}
      ${
        curr.docstring
          ? `
      /**
        ${curr.docstring}
      */
      `
          : ""
      }
      ${curr.typeings?.map((typing) => `${typing}`).join(`/n`) || ""}
      ${curr.f.toString()}
      _global.${curr.name} = ${curr.name}
    `;
  }, "const _global = (global || window) as any;");

  fs.writeFileSync("./src/index.ts", fileString);
};

build();

// @ts-ignore
// const _global = (global || window) as any;

// Logic
/**
  Evaluates _test_. If _test_ is not _false_ or _null_ returns _then_, otherwise returns _else__. If _else__ is not supplied it returns _null_.

  ### Examples:

  iff(eql('a', 'a'), 'yes') // 'yes'

  iff(eql('a', 'b'), 'yes') // _null_

  iff(eql('a', 'b'), 'yes', 'no') // 'no'
*/
// function iff<T, F = null>(test: boolean, then: T, else_?: F) {
//   return boolean(test) ? then : else_ || null;
// }
// _global.iff = iff;

// function eql<T>(a: T, b: T, ...args: T[]) {
//   return [a, b, ...args].every((v) => v === a);
// }
// _global.eql = eql;

// function and<T>(a: T, b: T, ...args: T[]) {
//   const all = [a, b, ...args];
//   const allTrue = all.every((v) => v === a);
//   return allTrue ? all[all.length] : false;
// }
// _global.and = and;

// function or<T>(a: T, b: T, ...args: T[]) {
//   const all = [a, b, ...args];
//   const allTrue = all.some((v) => v === a);
//   return allTrue ? all[all.length] : false;
// }
// _global.or = or;

// function boolean<T>(a: T) {
//   return !!a;
// }
// _global.boolean = boolean;

// // Collections
// function map<I, R>(arr: I[], f: (item: I, index: number) => R): R[];
// function map<I, R>(f: (item: I, index: number) => R): (arr: I[]) => R[];
// function map<I, R>(params: any) {
//   if (params.length === 2) {
//     const arr = params[0] as I[];
//     const f = params[1];
//     const results = arr.map((item, index) => f(item, index));
//     return results as R[];
//   } else {
//     const f = params[0];
//     const g = (arr: I[]) => arr.map((item, index) => f(item, index));
//     return g;
//   }
// }
// _global.filter = filter;

// function filter<I>(arr: I[], f: (item: I, index: number) => boolean): I[];
// function filter<I>(f: (item: I, index: number) => boolean): (arr: I[]) => I[];
// function filter<I>(params: any) {
//   if (params.length === 2) {
//     const arr = params[0] as I[];
//     const f = params[1];
//     const results = arr.filter((item, index) => f(item, index));
//     return results;
//   } else {
//     const f = params[0];
//     const g = (arr: I[]) => arr.filter((item, index) => f(item, index));
//     return g;
//   }
// }
// _global.filter = filter;

// function thread<I>(
//   arr: I[],
//   f: (arr: I[]) => any,
//   ...args: ((arr: I[]) => any)[]
// ) {
//   const fs = [f, ...args];

//   return fs.reduce((acc, curr) => {
//     return curr(acc);
//   }, arr);
// }
// _global.thread = thread;

import * as E from 'fp-ts/Either';
import { Eq } from 'fp-ts/Eq';
import { Monoid } from 'fp-ts/Monoid';
import * as O from 'fp-ts/Option';
/**
 *
 * Functional switch/case analogue:
 *
 *  switch(candidate) {
 *    case(predicate(candidate)) => resolution(candidate);
 *    ...
 *    default: defaultT
 *  }
 *
 * @template C examination candidate type
 * @template T resolution result type
 * @param {C} candidate
 * @param {T} defaultT fallback value
 * @param {[(candidate: C) => boolean, (candidate: C) => T][]} resolvers [predicate, resolution] tuples
 * @returns  {T}
 */
export declare const firstRight: <C, T>(candidate: C, defaultT: T, resolvers: [(candidate: C) => boolean, (candidate: C) => T][]) => T;
export declare const equals: <T>(E: Eq<T>) => (lhs: T) => (rhs: T) => boolean;
export declare const concatApply: <T, D>(m: Monoid<T>) => (fns: ((data: D) => T)[]) => (data: D) => T;
export declare const and: (fns: ((data: unknown) => boolean)[]) => (data: unknown) => boolean;
export declare const or: (fns: ((data: unknown) => boolean)[]) => (data: unknown) => boolean;
export declare const tap: <F extends (data: D) => any, D>(f: F) => (data: D) => D;
export declare const log: <T>(tag: string) => (data: unknown) => unknown;
export declare const deepLog: <T>(tag: string) => (data: unknown) => unknown;
export declare const getMatches: (regex: RegExp) => (str: string) => O.Option<RegExpExecArray>;
export declare const stringifyWithReplace: (replacer: (key: string, value: any) => any, space?: number) => <A>(a: A) => E.Either<unknown, string>;
//# sourceMappingURL=fp-utils.d.ts.map
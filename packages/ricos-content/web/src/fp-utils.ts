import { identity, pipe } from 'fp-ts/function';
import { Eq } from 'fp-ts/Eq';
import { concatAll, Monoid } from 'fp-ts/Monoid';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/Semigroup';

export const resolveFirstRight = <C, T>(
  candidate: C,
  defaultT: T,
  resolvers: [(candidate: C) => boolean, (candidate: C) => T][]
): T => {
  const firstRightSemi = E.getSemigroup<T, T>(S.first<T>());
  const concatFirstRightSemi = S.concatAll(firstRightSemi)(E.left(defaultT));
  return pipe(
    concatFirstRightSemi(
      pipe(
        resolvers,
        A.map(r =>
          pipe(
            candidate,
            E.fromPredicate(r[0], () => defaultT),
            E.map(r[1])
          )
        )
      )
    ),
    E.fold(identity, identity)
  );
};

export const split = (splitter: string) => (str: string) => str.split(splitter);

export const trim = (str: string) => str.trim();

export const replace = (replaced: RegExp | string, by: string) => (str: string): string =>
  str.replace(replaced, by);

export const equals = <T>(E: Eq<T>) => (lhs: T) => (rhs: T) => E.equals(lhs, rhs);

export const concatApply = <T, D>(m: Monoid<T>) => (fns: ((data: D) => T)[]) => (data: D) =>
  pipe(fns, A.ap(A.of(data)), concatAll(m));

export const toUpperCase = (str: string) => str.toUpperCase();

export const log = <T>(tag: string, processor: (data: T) => string | T = identity) => (data: T) => {
  console.log(tag, processor(data)); // eslint-disable-line no-console
  return data;
};

export const getMatches = (regex: RegExp) => (str: string): O.Option<RegExpExecArray> =>
  pipe(regex.exec(str), O.fromNullable);

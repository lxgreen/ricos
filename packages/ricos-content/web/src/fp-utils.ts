import { identity, pipe } from 'fp-ts/function';
import { Eq } from 'fp-ts/Eq';
import { concatAll, Monoid } from 'fp-ts/Monoid';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/Semigroup';

export const firstRight = <C, T>(
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

export const equals = <T>(E: Eq<T>) => (lhs: T) => (rhs: T) => E.equals(lhs, rhs);

export const concatApply = <T, D>(m: Monoid<T>) => (fns: ((data: D) => T)[]) => (data: D) =>
  pipe(fns, A.ap(A.of(data)), concatAll(m));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tap = <F extends (data: D) => any, D>(f: F) => (data: D): D => {
  f(data);
  return data;
};

const logWithTag = <T>(tag: string) => (data: T) => console.log(tag, data); // eslint-disable-line no-console

export const log = <T>(tag: string) => tap(logWithTag<T>(tag));

export const getMatches = (regex: RegExp) => (str: string): O.Option<RegExpExecArray> =>
  pipe(regex.exec(str), O.fromNullable);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringifyWithReplace = (replacer: (key: string, value: any) => any) => <A>(
  a: A
): E.Either<unknown, string> =>
  E.tryCatch(() => {
    const s = JSON.stringify(a, replacer);
    if (typeof s !== 'string') {
      throw new Error('Converting unsupported structure to JSON');
    }
    return s;
  }, identity);

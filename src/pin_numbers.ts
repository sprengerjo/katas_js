import {drop, head, split} from 'ramda';

// alternative approach:
//const permute = o => liftN(o.length, (...args) => args);

export const pinNumbers = (observed: string): Array<String> => {
  const lookUp = ['08', '124', '1235', '236', '1457', '24568', '3569', '478', '57890', '689'];

  let obsHead: string = head(observed);

  const heads = lookUp[obsHead];

  if (observed.length <= 1)
    return split('', heads);

  const result = [];
  for (const h of heads) {
    for (const t of pinNumbers(drop(1, observed))) {
      result.push(h + t)
    }
  }
  return result
};
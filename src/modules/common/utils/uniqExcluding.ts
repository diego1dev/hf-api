import difference from 'lodash/difference';
import uniq from 'lodash/uniq';

export function getUniqExcluding<T>(elements: T[], excludeElements:T[]): T[] {
  return difference(uniq(elements), excludeElements);
}
export function getUniquePair<T>(elements: T[], otherElements:T[]): [T[], T[]] {
  const uniqueElements = difference(uniq(elements), otherElements);
  const uniqueOtherElements = difference(uniq(otherElements), elements);
  return [uniqueElements, uniqueOtherElements];
}

export default getUniqExcluding;

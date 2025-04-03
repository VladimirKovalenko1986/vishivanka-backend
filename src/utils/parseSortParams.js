import { SORT_ORDER } from '../constants/index.js';

const parseSoertOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);

  if (!isKnownOrder) return SORT_ORDER.ASC;
  return sortOrder;
};

const parseSortBy = (sortBy) => {
  const keysOfStudent = ['_id', 'username', 'email', 'comments'];

  if (!keysOfStudent.includes(sortBy)) {
    return '_id';
  }
  return sortBy;
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSoertOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

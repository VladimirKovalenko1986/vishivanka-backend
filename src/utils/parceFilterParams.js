export const parceFilterParams = (query) => {
  const { username, email, comments } = query;

  const filter = {};

  if (typeof username === 'string') {
    filter.username = { $regex: username, $options: 'i' };
  }

  if (typeof email === 'string') {
    filter.email = { $regex: email, $options: 'i' };
  }

  if (typeof comments === 'string') {
    filter.comments = { $regex: comments, $options: 'i' };
  }

  return filter;
};

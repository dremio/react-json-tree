export const createItemString = (data, expanded) => {
  const keys = Object.keys(data);
  const isArray = data instanceof Array;
  const content = keys.length ? '...' : '';
  const nonExpandedView = isArray ? `[${content}]` : `{${content}}`;
  const expandedView = isArray ? '[' : '{';
  return expanded ? expandedView : nonExpandedView;
};

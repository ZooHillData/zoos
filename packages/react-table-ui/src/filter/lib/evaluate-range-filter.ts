const evaluateRangeFilter = <T>(params: { from?: T; to?: T; value: T }) => {
  const { from, to, value } = params;

  // If no filter is set, return true
  if (!from && !to) {
    return true;
  }

  // If both `from` and `to` are set, value must be in between
  if (from && to) {
    return value >= from && value <= to;
  }

  // If only `from` is set, value must be greater than `from`
  if (from) {
    return value >= from;
  }

  // If only `to` is set, value must be less than `to`
  if (to) {
    return value <= to;
  }

  return true;
};

export { evaluateRangeFilter };

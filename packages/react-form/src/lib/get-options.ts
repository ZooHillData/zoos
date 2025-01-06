type Option = { value: string; label: string };
type Options = Option[];

const getOptions = ({
  values,
  getLabel = (value: string) => value,
  sort = (a, b) => a.label.localeCompare(b.label),
}: {
  values: string[];
  getLabel?: (value: string) => string;
  sort?: (a: Option, b: Option) => number;
}): Options => {
  const options = values.map((value) => ({ value, label: getLabel(value) }));
  if (sort) {
    return options.sort(sort);
  }
  return options;
};

export { getOptions, type Option, type Options };

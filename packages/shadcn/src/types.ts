type WithFreshClassName<T> = T & { freshClassName?: string };

type WithClassNameFn<T> = Omit<T, "className"> & {
  className?: (componentClassName?: string) => string;
};

export { WithFreshClassName, WithClassNameFn };

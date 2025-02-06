import { useReactiveState } from "@zoos/shadcn";

const JsonKeyValueForm = (props: {
  value: Record<string, unknown>;
  onSubmit: (value: Record<string, unknown>) => void;
}) => {
  const [value, setValue] = useReactiveState(props.value);

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(value);
      }}
    ></form>
  );
};

export { JsonKeyValueForm };

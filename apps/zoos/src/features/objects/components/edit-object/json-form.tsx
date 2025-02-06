import { Button, Textarea, useReactiveState } from "@zoos/shadcn";

const JsonForm = (props: {
  value: Record<string, unknown>;
  onSubmit: (value: Record<string, unknown>) => void;
}) => {
  const [value, setValue] = useReactiveState(
    JSON.stringify(props.value, null, 2).replace(/\\"/g, '"'),
  );

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(JSON.parse(value));
      }}
    >
      <Textarea
        className="h-[200px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export { JsonForm };

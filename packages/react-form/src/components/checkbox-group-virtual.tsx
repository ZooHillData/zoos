import { Virtualizer } from "@tanstack/react-virtual";

import { useReactiveState, type WithClassNameFn } from "@zoos/shadcn";

import { CheckboxWithLabel } from "./checkbox-with-label";
import { type Options, type Option } from "../lib/get-options";

const CheckboxGroupVirtual = (
  props: WithClassNameFn<{
    options: Options;
    virtualizer: Virtualizer<HTMLDivElement, Element>;
    value?: string[];
    onChange?: (value: string[]) => void;
    getCheckboxProps?: (
      option: Option,
    ) => React.ComponentProps<typeof CheckboxWithLabel>;
  }>,
) => {
  const [value, setValue] = useReactiveState(props.value);
  const { className = (className) => className } = props;
  return (
    <div
      style={{ height: `${props.virtualizer.getTotalSize()}px` }}
      className={className("relative w-full")}
    >
      {props.virtualizer.getVirtualItems().map((virtualItem) => {
        const option = props.options[virtualItem.index];
        return (
          <div
            key={option?.value}
            className="absolute left-0 top-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <CheckboxWithLabel
              label={option?.label}
              checked={value?.includes(option?.value)}
              onCheckedChange={(checked) => {
                if (checked) {
                  props.onChange?.([...(props.value || []), option.value]);
                } else {
                  props.onChange?.(
                    (props.value || []).filter((v) => v !== option?.value),
                  );
                }
              }}
              {...props.getCheckboxProps?.(option)}
            />
          </div>
        );
      })}
    </div>
  );
};

export { CheckboxGroupVirtual };

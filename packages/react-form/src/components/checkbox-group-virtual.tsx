import { Virtualizer } from "@tanstack/react-virtual";

import { useReactiveState, type WithClassNameFn } from "@zoos/shadcn";

import { type CheckboxGroupProps } from "./checkbox-group";
import { CheckboxWithLabel } from "./checkbox-with-label";

const CheckboxGroupVirtual = (
  props: WithClassNameFn<
    CheckboxGroupProps & { virtualizer: Virtualizer<HTMLDivElement, Element> }
  >,
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
                  props.onChange?.(
                    [...(props.value || []), option.value],
                    option,
                  );
                } else {
                  props.onChange?.(
                    (props.value || []).filter((v) => v !== option?.value),
                    option,
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

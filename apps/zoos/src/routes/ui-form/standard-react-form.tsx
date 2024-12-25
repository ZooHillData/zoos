import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui-form/standard-react-form")({
  component: RouteComponent,
});

///
/// Route Component
///

import { unique } from "remeda";
import { formOptions, useForm } from "@tanstack/react-form";
import { CheckboxWithLabel, Select, getOptions } from "@zoos/ui-form";
import { Button, Label } from "@zoos/ui-shad";

const getFormData = () => {
  const sets = [
    "node-1",
    "node-2",
    "surface-1",
    "surface-2",
    "edge-1",
    "edge-2",
    "volume-1",
  ];
  return {
    variables: ["Temperature", "Viscocity", "Distortion"],
    sets,
    setTypes: unique(sets.map((s) => s.split("-")[0])),
  };
};

const options = formOptions({
  defaultValues: {
    // string - name of the variable to show
    variable: "Temperature", // one of "Temperature", "Viscocity", "Distortion"
    // boolean - will show / hide the setType / sets fields
    setFilter: false,
    // string - type of the set, 1 of "node", "surface", "edge", "volume"
    setType: "",
    // sets - array of strings, matching the set type
    sets: "",
  },
});

function RouteComponent() {
  const data = getFormData();
  const form = useForm(options);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="flex h-full w-[300px] flex-col gap-4 pt-16"
    >
      <form.Field name="variable">
        {(field) => (
          <Label className="block space-y-2">
            <div>Variable</div>
            <Select
              sort={true}
              options={getOptions({ values: data?.variables || [] })}
              value={field.state.value}
              onChange={(value) => field.setValue(value)}
            />
          </Label>
        )}
      </form.Field>

      <form.Field name="setFilter">
        {(field) => (
          <CheckboxWithLabel
            id="set-filter"
            label="Filter by set?"
            checked={field.state.value}
            onCheckedChange={(checked) => field.setValue(Boolean(checked))}
          />
        )}
      </form.Field>

      {
        // Subscribe this field to setFilter field updates
        <form.Subscribe
          selector={(state) => ({ setFilter: state.values.setFilter })}
        >
          {(subscribed) => {
            // If setFilter is true, show the setType and sets fields
            if (subscribed.setFilter) {
              return (
                <form.Field name="setType">
                  {(field) => (
                    <Label className="block space-y-2">
                      <div>Set Type</div>
                      <Select
                        sort={true}
                        options={getOptions({
                          values: data?.setTypes || [],
                        })}
                        value={field.state.value}
                        onChange={(value) => field.setValue(value)}
                      />
                    </Label>
                  )}
                </form.Field>
              );
            }
          }}
        </form.Subscribe>
      }

      {
        // Keeping the next field separate in the case of fields being
        // independent configs (e.g. library will render like this)
        <form.Subscribe
          // Subscribe to state
          selector={(state) => ({
            setFilter: state.values.setFilter,
            setType: state.values.setType,
          })}
          // Render children contingent upon the form state subscribed to
          children={({ setFilter, setType }) => {
            const setsFiltered = data?.sets.filter((s) => {
              return !setType || s.startsWith(setType);
            });
            if (setFilter) {
              return (
                <form.Field name="sets">
                  {(field) => (
                    <Label className="block space-y-2">
                      <div>Sets</div>
                      <Select
                        sort={true}
                        options={getOptions({
                          values: setsFiltered || [],
                        })}
                        value={field.state.value}
                        onChange={(value) => field.setValue(value)}
                      />
                    </Label>
                  )}
                </form.Field>
              );
            }
          }}
        />
      }
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} onClick={() => form.handleSubmit()}>
            {isSubmitting ? "..." : "Save"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

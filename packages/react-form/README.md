# @zoos/react-form

A component library for creating forms in React.

## Features

- **`Form` Component -** Primary feature of this library. A component and configuration structure for rendering forms (uses Tanstack Form).

- **Standard Shad Inputs -** Cleaner APIs for standard form components leveraging Shad input components (e.g. single `Select` component instead of Shad's compositional exports: `Select`, `SelectOption`, `SelectGroup`, etc.)

## Form Component

The Form Component is the primary feature of this library. It is responsible for rendering the `FormConfig`. With the config, the Form component delivers:

- **Field Atttribute Callbacks -** Callbacks for field attributes (e.g. `hidden`, `disabled`, etc.) are passed current form `values` and `context` (see `context` below)

- **Rerendering and Reactivity -** All fields are subscribed to re-render on all field value changes. This was a simple solution. If performance or usability is a problem, will revisit.

- **`getFormConfig` -** A utility provides type inference to ease form configuration creation.

- **Context -** Pass and update fully typed context to the form. Context is available in all field attribute callbacks. _Can be used for populating form field options from a query._

- **Standard Form Options -** In the `FormConfig`, `formOptions` are passed directly to `useForm` hook, providing access to full capability of Tanstack Form.

- **Standard Field Options -** In `FormConfig.fields`, `fieldProps` are passed to the `<form.Field>` component, providing custom validators and event handlers.

## Writing Configs

We are trying to make writing form configs as easy as possible. Full type inference, sensible defaults with backdoors into full customization and access to Tanstack Form standard APIs.

If you have ideas for improving the API, please [start a discussion](https://github.com/ZooHillData/zoos/discussions/new?category=ideas)

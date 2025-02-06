# What is Zoos?

Zoos is an experiment to find the right level of abstraction using Tanstack, Shadcn, Zustand and many other core React libraries.

Zoos is comprised of:

- **Libraries -** many simple, independent helper-libraries for working with core React libraries
- **Copy/Paste Features and Examples -** several React apps that provide examples, documentation and testing for building features with core libraries

## Purpose

The driving purpose of Zoos is to make building _**and maintaining**_ React apps as efficiently as possible.

Zoos is a vehicle for us to serve a ton of clients and experiment with our own product ideas with a super small and nimble team.

## Levels of Abstraction

Zoos provides different abstraction levels:

- `core` - the lowest level of abstraction. no components. all hooks, stores, utilities. extremely thin wrapper around Tanstack, Zustand, the logic-side of component libraries like Shadcn, Recharts, etc.
- `core-ui` - the component-side of the core React libraries. still highly flexible, but is focused on Shadcn, Tailwind and other chosen UI libraries
- `features` - core application features (auth, nav tree). composed of core, core-ui and other libraries. exposed in Tanstack Router app.
- `community` - features built by the community. same as core, copy-paste into your own app. More free-form than core features. Use at your own risk 😉

Our #1 goal is to make building **and maintaining** React apps as efficiently as possible. Experiment with product ideas, serve a ton of clients and keep your team really small. That's us..

## Principles

It takes ideas from Shadcn and Tanstack to create a combined, ever-so-slightly higher abstraction on top of those core React libraries. Zoos attempts to...

- Stay true to underlying 3rd-party libraries it "wraps".
- Expose full API to underlying library at every possible level of abstraction
- Encourage users to develop app features directly in zoos `community`, modify zoos as needed and copy-paste into your app
- Zoos is a power-user library. It is still a low level of abstraction.

Please post a discussion if you have ideas about how to make building apps more efficient. This is an experiment. If there's another idea, we'd love to discuss.

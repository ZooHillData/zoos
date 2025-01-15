import React from "react";

import { Input, cn } from "@zoos/shadcn";

import { EyeClosedIcon, EyeIcon } from "lucide-react";

const InputPassword = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  const [inputType, setInputType] = React.useState<"password" | "text">(
    "password",
  );

  return (
    <div className="mt-2 grid grid-cols-1">
      <Input
        className={cn("col-start-1 row-start-1 block w-full", className)}
        {...props}
        type={inputType}
        //   className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pr-9 sm:text-sm/6"
      />
      <button
        tabIndex={-1}
        onClick={() =>
          setInputType(inputType === "password" ? "text" : "password")
        }
        className="col-start-1 row-start-1 mr-3 self-center justify-self-end text-gray-400"
      >
        {inputType === "password" ? (
          <EyeClosedIcon className="size-5" />
        ) : (
          <EyeIcon className="text-primary size-5" />
        )}
      </button>
    </div>
  );
};

export { InputPassword };

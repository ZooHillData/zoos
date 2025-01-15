import React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  cn,
} from "@zoos/shadcn";

const OTP = ({
  value,
  onValueChange,
  onComplete,
  className,
  containerClassName,
  length = 6,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  containerClassName?: string;
  length?: number;
}) => {
  React.useEffect(() => {
    if (value.length === length) {
      onComplete?.(value);
    }
  }, [value, onComplete, length]);

  return (
    <InputOTP
      className={cn("w-full text-center", className)}
      containerClassName={containerClassName}
      maxLength={6}
      value={value}
      onChange={(value) => {
        onValueChange(value);
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <>
          <InputOTPGroup key={index}>
            <InputOTPSlot index={index} />
          </InputOTPGroup>
          {index < length - 1 && <InputOTPSeparator />}
        </>
      ))}
    </InputOTP>
  );
};

export { OTP };

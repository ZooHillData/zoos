import React from "react";

import { HomeIcon } from "lucide-react";
import {
  BreadcrumbList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@zoos/shadcn";

const LocationBreadcrumb = (props: {
  location: string;
  onBreadcrumbClick?: (location: string) => void;
  className?: string;
}) => {
  const parts = props.location.split("/").filter(Boolean);
  return (
    <Breadcrumb>
      <BreadcrumbList className={props.className}>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="hover:cursor-pointer"
            onClick={() => props.onBreadcrumbClick?.("/")}
          >
            <HomeIcon className="size-5" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:cursor-pointer"
                onClick={() => {
                  let path = parts.slice(0, index + 1).join("/");
                  if (path !== "/") {
                    path = `/${path}/`;
                  }
                  props.onBreadcrumbClick?.(path);
                }}
              >
                {part}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < parts.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { LocationBreadcrumb };

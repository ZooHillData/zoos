import type { Object } from "../../types";
import {
  getEditableInfoFields,
  getAutomaticInfoFields,
} from "../../db/parse-objects";
import { JsonForm } from "./json-form";
import { closeDialog } from "../../../../lib/dialog";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../../queries";

const useFormContext = () => {
  const folders = useQuery(getFolders({ params: {} }));
  return {
    folders,
  };
};

const EditObjectForm = (props: {
  object: Object;
  onUpdateObject: (params: { id: number } & Partial<Object>) => void;
}) => {
  const editableInfoFields = getEditableInfoFields(props.object);
  const uneditableInfoFields = getAutomaticInfoFields(props.object);
  return (
    <>
      <div className="bg-muted rounded p-2 text-xs">
        <p className="text-sm font-medium">Uneditable by user</p>
        {/* {Object.entries(props.object).map(([k, v]) => (
          <p className="" key={k}>
            <strong className="font-medium">{k}: </strong>
            <span>
              {!["string", "number"].includes(typeof v)
                ? JSON.stringify(v)
                : String(v)}
            </span>
          </p>
        ))} */}
      </div>
      <JsonForm
        value={props.object}
        onSubmit={(value) => {
          props.onUpdateObject({
            id: props.object.id,
            ...value,
          });
          closeDialog();
        }}
      />
    </>
  );
};

export { EditObjectForm };

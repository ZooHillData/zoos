/*
This file is used to override the type definitions
automatically generated using `npx supabase gen-types ...`

See [Supabase docs](https://supabase.com/docs/reference/javascript/typescript-support#helper-types-for-tables-and-joins)
*/

import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated } from "./database-generated.types";
import { Json } from "./database-generated.types";

type Database = MergeDeep<
  DatabaseGenerated,
  {
    zoos: {
      Views: {
        objects_view: {
          Row: {
            /*
            * Fix nullable fields in view
            All fields in a View Row are nullable (a limitation of Postgres)

            See [Github discussion](https://github.com/orgs/supabase/discussions/14151)
            ! Make sure to modify this when you add modify the view definition
            */
            access_manage_emails: string[];
            access_manage_group_ids: number[];
            access_read_emails: string[];
            access_read_group_ids: number[];
            access_write_emails: string[];
            access_write_group_ids: number[];
            created_at: string;
            description: string;
            folder_id: number | null;
            id: number;
            last_updated_at: string;
            last_updated_email: string;
            metadata: Json;
            name: string;
            object_data: Json;
            object_type: string;
            owner_email: string;
          };
        };
      };
    };
  }
>;

export type { Json, Database };

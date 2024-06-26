// Generated by Xata Codegen 0.26.6. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "user",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "NN" },
      { name: "email", type: "email", unique: true },
    ],
    revLinks: [
      { column: "user_id_giver", table: "quest" },
      { column: "user_taker_id", table: "user_has_quest" },
      { column: "user", table: "user_passes" },
    ],
  },
  {
    name: "quest",
    columns: [
      {
        name: "quest_name",
        type: "string",
        notNull: true,
        defaultValue: "Nic",
      },
      {
        name: "description",
        type: "string",
        notNull: true,
        defaultValue: "nic",
      },
      { name: "expiration_date", type: "datetime" },
      { name: "time_in_h", type: "int", notNull: true, defaultValue: "1" },
      { name: "user_id_giver", type: "link", link: { table: "user" } },
    ],
    revLinks: [{ column: "quest_id", table: "user_has_quest" }],
  },
  {
    name: "status",
    columns: [{ name: "status_name", type: "string", unique: true }],
    revLinks: [{ column: "status_id", table: "user_has_quest" }],
  },
  {
    name: "user_has_quest",
    columns: [
      { name: "status_id", type: "link", link: { table: "status" } },
      { name: "quest_id", type: "link", link: { table: "quest" } },
      { name: "user_taker_id", type: "link", link: { table: "user" } },
      { name: "returnedAt", type: "datetime" },
      { name: "veryfiedAt", type: "datetime" },
    ],
  },
  {
    name: "user_passes",
    columns: [
      { name: "user", type: "link", link: { table: "user" }, unique: true },
      {
        name: "hash_pass",
        type: "string",
        notNull: true,
        defaultValue: "test",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type User = InferredTypes["user"];
export type UserRecord = User & XataRecord;

export type Quest = InferredTypes["quest"];
export type QuestRecord = Quest & XataRecord;

export type Status = InferredTypes["status"];
export type StatusRecord = Status & XataRecord;

export type UserHasQuest = InferredTypes["user_has_quest"];
export type UserHasQuestRecord = UserHasQuest & XataRecord;

export type UserPasses = InferredTypes["user_passes"];
export type UserPassesRecord = UserPasses & XataRecord;

export type DatabaseSchema = {
  user: UserRecord;
  quest: QuestRecord;
  status: StatusRecord;
  user_has_quest: UserHasQuestRecord;
  user_passes: UserPassesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Tomasz-Jankiewicz-s-workspace-16dvpb.eu-central-1.xata.sh/db/astroApiDB_1",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};

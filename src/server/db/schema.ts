import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `power-of-numbers_${name}`);
export const createTable = pgTableCreator((name) => name);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  userInformation: one(userInformation, {
    fields: [users.id],
    references: [userInformation.userId],
  }),
}));

export const userInformation = createTable("user_information", {
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id)
    .primaryKey(),
  birthday: text("birthday").notNull(),
  pythagoreanTriangle: jsonb("pythagorean_triangle").notNull(),
});

export const userInformationRelations = relations(
  userInformation,
  ({ one }) => ({
    ser: one(users, {
      fields: [userInformation.userId],
      references: [users.id],
    }),
  }),
);

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const rootNumbers = createTable("root_number", {
  number: integer("number").primaryKey(),
  positive: text("positive"),
  negative: text("negative"),
  summary: text("summary"),
});

export const lifePathCategories = createTable("life_path_category", {
  number: integer("number").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const lifePaths = createTable(
  "life_path",
  {
    // number: integer("number"),
    mainCategory: integer("main_category").references(
      () => lifePathCategories.number,
    ),
    secondaryCategory: integer("secondary_category").references(
      () => lifePathCategories.number,
    ),
    description: text("description"),
  },
  // (lp) => ({
  //   compoundKey: primaryKey({
  //     columns: [lp.mainCategory, lp.secondaryCategory],
  //   }),
  // }),
);

export const LifePath = createInsertSchema(lifePaths);
export type TLifePath = z.infer<typeof LifePath>;

export const lifePathRelations = relations(lifePaths, ({ one }) => ({
  mainCategoryRelation: one(lifePathCategories, {
    fields: [lifePaths.mainCategory],
    references: [lifePathCategories.number],
  }),
  secondaryCategoryRelation: one(lifePathCategories, {
    fields: [lifePaths.secondaryCategory],
    references: [lifePathCategories.number],
  }),
}));

export const sideRootNumbers = createTable("side_root_number", {
  number: integer("number").primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
});
export const SideRootNumber = createInsertSchema(sideRootNumbers);
export type TSideRootNumber = z.infer<typeof SideRootNumber>;

//Chapter 18
export const hiddenRootNumbers = createTable("hidden_root_number", {
  number: integer("number").primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
});

//Chapter 19 Inner Diagram

//Chapter 20 Health and Sickness
export const healthAnalysis = createTable("health_analysis", {
  element: text("element").primaryKey(),
  description: text("description").notNull(),
});

export const HealthAnalysis = createInsertSchema(healthAnalysis);
export type THealthAnalysis = z.infer<typeof HealthAnalysis>;

//Chapter 22 Combined Root number
export const combinedRootNumbers = createTable("combined_root_number", {
  number: integer("number").primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
});

//Chapter 23 Career/Work & Business Options
export const careerAnalysis = createTable("career_analysis", {
  // number: integer("number").primaryKey(),
  element: varchar("text").notNull().primaryKey(),
  profession: text("profession"),
  business: text("business"),
});

//Chapter 24 Day Analysis
export const dayAnalysis = createTable("day_analysis", {
  number: integer("number").primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
});

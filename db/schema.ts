import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const betaInquiries = sqliteTable("beta_inquiries", {
  id: text("id").primaryKey(), visitorId: text("visitor_id").notNull().default(""),
  name: text("name").notNull(), company: text("company").notNull().default(""), email: text("email").notNull(),
  marketsJson: text("markets_json").notNull().default("[]"), activeListings: text("active_listings").notNull(),
  monthlyListings: text("monthly_listings").notNull(), monthlyHours: text("monthly_hours").notNull(),
  challenge: text("challenge").notNull(), pilotReady: integer("pilot_ready", { mode: "boolean" }).notNull().default(false),
  priceIntent: text("price_intent").notNull(), status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex("beta_inquiries_email_unique").on(table.email), index("beta_inquiries_status_created_idx").on(table.status, table.createdAt), index("beta_inquiries_visitor_created_idx").on(table.visitorId, table.createdAt)]);

export const marketingPageViews = sqliteTable("marketing_page_views", {
  id: text("id").primaryKey(), sessionId: text("session_id").notNull(), visitorId: text("visitor_id").notNull().default(""),
  path: text("path").notNull(), referrerHost: text("referrer_host").notNull().default(""), country: text("country").notNull().default(""),
  device: text("device").notNull().default(""), browser: text("browser").notNull().default(""), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("marketing_page_views_created_idx").on(table.createdAt), index("marketing_page_views_path_created_idx").on(table.path, table.createdAt), index("marketing_page_views_session_created_idx").on(table.sessionId, table.createdAt), index("marketing_page_views_visitor_created_idx").on(table.visitorId, table.createdAt)]);

export const marketingExcludedVisitors = sqliteTable("marketing_excluded_visitors", {
  visitorId: text("visitor_id").primaryKey(), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

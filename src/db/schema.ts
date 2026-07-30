import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const generatedConfigs = sqliteTable("generated_configs", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  shareToken: text("share_token").notNull().unique(),
  title: text("title").notNull().default("WVFWARP Config"),
  protocol: text("protocol").notNull(),
  dnsProvider: text("dns_provider").notNull(),
  dnsServers: text("dns_servers").notNull(),
  endpoint: text("endpoint").notNull(),
  mtu: integer("mtu").notNull().default(1280),
  obfuscationParams: text("obfuscation_params").notNull(),
  warpAccountType: text("warp_account_type").notNull().default("FREE"),
  privateKey: text("private_key").notNull(),
  publicKey: text("public_key").notNull(),
  clientAddressV4: text("client_address_v4").notNull(),
  clientAddressV6: text("client_address_v6").notNull(),
  reservedBits: text("reserved_bits"),
  routingMode: text("routing_mode").notNull().default("all"),
  downloadsCount: integer("downloads_count").notNull().default(0),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const obfuscationPresets = sqliteTable("obfuscation_presets", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  protocol: text("protocol").notNull(),
  params: text("params").notNull(),
  recommendedEndpoint: text("recommended_endpoint").default("162.159.193.5:2408"),
  recommendedDns: text("recommended_dns").default("1.1.1.1, 1.0.0.1"),
  isOfficial: integer("is_official", { mode: "boolean" }).default(true).notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const warpKeysPool = sqliteTable("warp_keys_pool", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  privateKey: text("private_key").notNull(),
  publicKey: text("public_key").notNull(),
  clientIpV4: text("client_ip_v4").notNull(),
  clientIpV6: text("client_ip_v6").notNull(),
  reservedBits: text("reserved_bits").default("[0, 0, 0]"),
  isAssigned: integer("is_assigned", { mode: "boolean" }).default(false).notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export type GeneratedConfig = typeof generatedConfigs.$inferSelect;
export type NewGeneratedConfig = typeof generatedConfigs.$inferInsert;
export type ObfuscationPreset = typeof obfuscationPresets.$inferSelect;
export type NewObfuscationPreset = typeof obfuscationPresets.$inferInsert;
export type WarpKeyItem = typeof warpKeysPool.$inferSelect;
export type NewWarpKeyItem = typeof warpKeysPool.$inferInsert;

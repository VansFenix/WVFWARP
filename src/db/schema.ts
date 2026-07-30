import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const generatedConfigs = pgTable("generated_configs", {
  id: serial("id").primaryKey(),
  shareToken: text("share_token").notNull().unique(),
  title: text("title").notNull().default("WVFWARP Config"),
  protocol: text("protocol").notNull(),
  dnsProvider: text("dns_provider").notNull(),
  dnsServers: text("dns_servers").notNull(),
  endpoint: text("endpoint").notNull(),
  mtu: integer("mtu").notNull().default(1280),
  obfuscationParams: jsonb("obfuscation_params").notNull(),
  warpAccountType: text("warp_account_type").notNull().default("FREE"),
  privateKey: text("private_key").notNull(),
  publicKey: text("public_key").notNull(),
  clientAddressV4: text("client_address_v4").notNull(),
  clientAddressV6: text("client_address_v6").notNull(),
  reservedBits: text("reserved_bits"),
  routingMode: text("routing_mode").notNull().default("all"),
  downloadsCount: integer("downloads_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const obfuscationPresets = pgTable("obfuscation_presets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  protocol: text("protocol").notNull(),
  params: jsonb("params").notNull(),
  recommendedEndpoint: text("recommended_endpoint").default("162.159.193.5:2408"),
  recommendedDns: text("recommended_dns").default("1.1.1.1, 1.0.0.1"),
  isOfficial: boolean("is_official").default(true).notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const warpKeysPool = pgTable("warp_keys_pool", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  privateKey: text("private_key").notNull(),
  publicKey: text("public_key").notNull(),
  clientIpV4: text("client_ip_v4").notNull(),
  clientIpV6: text("client_ip_v6").notNull(),
  reservedBits: text("reserved_bits").default("[0, 0, 0]"),
  isAssigned: boolean("is_assigned").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GeneratedConfig = typeof generatedConfigs.$inferSelect;
export type NewGeneratedConfig = typeof generatedConfigs.$inferInsert;
export type ObfuscationPreset = typeof obfuscationPresets.$inferSelect;
export type NewObfuscationPreset = typeof obfuscationPresets.$inferInsert;
export type WarpKeyItem = typeof warpKeysPool.$inferSelect;
export type NewWarpKeyItem = typeof warpKeysPool.$inferInsert;

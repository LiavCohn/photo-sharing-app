import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    externalId: v.string(), // Clerk ID
  })
    .index("byExternalId", ["externalId"])
    .index("byUsername", ["username"]),

  pictures: defineTable({
    name: v.string(),
    caption: v.optional(v.string()),
    public: v.boolean(), // Is it publicly visible?
    userId: v.id("users"),
    image: v.id("_storage"), // Convex file reference
    albumId: v.optional(v.id("albums")), // Optional album
    createdAt: v.number(), // Unix timestamp or Date.now()
    username: v.string(),
    externalId: v.string(),
  }).index("byUserId", ["userId"]),

  albums: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.id("users"),
    public: v.boolean(),
    createdAt: v.number(),
    externalId:v.string(),
  }).index("byUserId", ["userId"]),

  sharedContent: defineTable({
    contentType: v.union(v.literal("picture"), v.literal("album")),
    contentId: v.union(v.id("pictures"), v.id("albums")),
    fromUserId: v.id("users"),
    toUserId: v.id("users"),
    sharedAt: v.number(),
  })
    .index("byToUserId", ["toUserId"])
    .index("byFromUserId", ["fromUserId"]),
});

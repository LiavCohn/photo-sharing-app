import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        externalId: v.string()
    }).index("byExternalId", ["externalId"]).index("byUsername", ["username"]),
    picture: defineTable({
        name: v.string(),
        captions: v.string(),
        public: v.boolean(),
        userId: v.id("users"),
        image: v.id("_storage"),
    }).index("byUserId",["userId"])
    
})
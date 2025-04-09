// pictures.ts
import { mutation,query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const savePicture = mutation({
  args: {
    name: v.string(),
    caption: v.optional(v.string()),
    image: v.id("_storage"),
    public: v.boolean(),
    albumId: v.optional(v.id("albums")), // 👈 add this line
  },
  handler: async (ctx, args) => {
    const { _id } = await getCurrentUserOrThrow(ctx);

    return await ctx.db.insert("pictures", {
      ...args,
      userId: _id,
      createdAt: Date.now(),
    });
  },
});

export const getUserPicture = query({
  args: {},
  handler: async (ctx) => {
    const {_id} = await getCurrentUserOrThrow(ctx);
    return await ctx.db.query("pictures").filter(q => q.eq(q.field("userId"), _id)).collect();
  }
})

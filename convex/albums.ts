import { v } from "convex/values";
import { mutation ,query} from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getAlbumsByUser = query({
    args: {},
    handler: async (ctx) => {
        const {_id} = await getCurrentUserOrThrow(ctx);
        return await ctx.db.query("albums").withIndex("byUserId",(q) => q.eq("userId",_id)).collect()
    },
})


export const createAlbum = mutation({
    args: {
      title: v.string(),
        description: v.optional(v.string()),
        public: v.boolean(),
    },
    handler: async (ctx, args) => {
        const {_id,externalId} = await getCurrentUserOrThrow(ctx);
  
      const albumId = await ctx.db.insert("albums", {
        title: args.title,
        description: args.description,
        userId: _id, 
        externalId:externalId,
        public: args.public,
        createdAt: Date.now(),
      });
  
      return albumId;
    },
  });
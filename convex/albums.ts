import { mutation } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getAlbumsByUser = mutation({
    args: {},
    handler: async (ctx) => {
        const {_id} = await getCurrentUserOrThrow(ctx);
        return await ctx.db.query("albums").withIndex("byUserId",(q) => q.eq("userId",_id)).collect()
    },
})
import { mutation ,query} from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getAlbumsByUser = query({
    args: {},
    handler: async (ctx) => {
        const {_id} = await getCurrentUserOrThrow(ctx);
        return await ctx.db.query("albums").withIndex("byUserId",(q) => q.eq("userId",_id)).collect()
    },
})
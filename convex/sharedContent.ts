import { query} from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getSharedContent = query({
    args: {},
    handler: async (ctx) => {
        const {_id} = await getCurrentUserOrThrow(ctx);
        return await ctx.db.query("sharedContent").withIndex("byToUserId",(q) => q.eq("toUserId",_id)).collect()
    },
})
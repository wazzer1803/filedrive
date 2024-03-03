import{v,ConvexError} from "convex/values"
import {mutation,query,MutationCtx,QueryCtx} from "./_generated/server"
import { getUser } from "./users"



async function hasAccessToOrg(tokenIdentifier:string,orgId:string,ctx:QueryCtx | MutationCtx){
    const user=await getUser(ctx,tokenIdentifier)
    const hasAccess = user.orgIds.includes(orgId) ||
    user.tokenIdentifier.includes(orgId)
    return hasAccess
    
}
export const createFile = mutation({
    args:{
        name:v.string(),
        orgId:v.string()
    },
    async handler(ctx,args){
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new ConvexError("Unauthenticated")
        }
        console.log(identity)
        const hasAccess = await hasAccessToOrg(identity.tokenIdentifier,args.orgId,ctx)
      if(!hasAccess){

          throw new ConvexError("YOu dont have access to this organization")
      }

     
    // if( !user.orgIds.includes(args.orgId)&&user.tokenIdentifier !==identity.tokenIdentifier){
    // }
await ctx.db.insert("files",{
    name:args.name,
    orgId:args.orgId
})
}
    })


    export const getFiles = query({
        args:{
            orgId:v.string()
        },
        async handler(ctx,args){
           
            const identity = await ctx.auth.getUserIdentity()
        
            if(!identity){
                return []
            }
            const hasAccess = await hasAccessToOrg(identity.tokenIdentifier,args.orgId,ctx)
            if(!hasAccess){
                return []
            }

            
            return ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
        }
    })



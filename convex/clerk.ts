"use node";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { v } from "convex/values";
import { Webhook } from "svix";

import { internalAction } from "./_generated/server";

const webhookSecret = "whsec_H7kpRiEr2aAvGnQ6By+KnNPOZ2f6LERt" || ``;

export const fulfill = internalAction({
  args: { headers: v.any(), payload: v.string() },
  handler: async (ctx, args) => {
    const wh = new Webhook(webhookSecret);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    return payload;
  },
});
import { z } from "zod";
import { didDisSchema } from "./dis";

export const commitSchema = z.object({
    did: didDisSchema,
    originalOwner: z.string(),
    didDocument: z.any(),
    hexDid: z.string(),
    salt: z.string(),
    signatureWallet: z.string(),
    signatureDid: z.string(),
});

export const walletSchema = z.object({
    did: didDisSchema,
    chainId: z.number(),
    creator: z.string(),
    address: z.string(),
    salt: z.number(),
    pki: z.string(),
    recovery: z.string(),
    commitments: z.object({
        wallet: z.string(),
        identity: z.string(),
    }),
    identity: z.object({
        hex: z.string(),
        document: z.any(),
    }),
});

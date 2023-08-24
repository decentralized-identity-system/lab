import { z } from "zod";
import { didDisSchema } from "./dis";

export const commitSchema = z.object({
    did: didDisSchema,
    didDocument: z.any(),
    hexDid: z.string(),
    salt: z.string(),
    signatureWallet: z.string(),
    signatureDid: z.string(),
});

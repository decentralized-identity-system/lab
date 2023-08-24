import { z } from "zod";

export const didDisSchema = z
    .string()
    .refine(
        did => /^did:dis:\d+:0x[a-fA-F0-9]{40}:0x[a-fA-F0-9]{40}$/.test(did),
        {
            message: "Invalid DID format",
        },
    );

import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

import { commitSchema } from "../lib/validation/commit";

/**
 * POST /commit
 * Stores a new DID commitment into the database.
 */
export const commit = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;

    const safeDid = commitSchema.safeParse(body);

    if (!safeDid.success) {
        res.status(400).json({ ok: false, error: "Invalid body" });
        return;
    }

    const {
        did: didData,
        didDocument,
        hexDid,
        salt,
        signatureDid,
        signatureWallet,
    } = safeDid.data;

    try {
        await prisma.dis.create({
            data: {
                did: didData,
                didDocument,
                hexDid,
                salt,
                signatureDid,
                signatureWallet,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: "Error while storing DID commit",
        });
        return;
    }

    res.status(200).json({ ok: true, did: req.params.did });
};

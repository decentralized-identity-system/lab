import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {  walletSchema } from "../lib/validation/commit";

/**
 * POST /commit
 * Stores Wallet and DID commitments into the database.
 */
export const commit = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;

    const safeWallet = walletSchema.safeParse(body);

    if (!safeWallet.success) {
        res.status(400).json({ ok: false, error: "Invalid body" });
        return;
    }

    const {
        did: didData,
        chainId,
        creator,
        address,
        salt,
        pki,
        recovery,
        commitments,
        identity,
    } = safeWallet.data;

    try {
        await prisma.wallet.create({
            data: {
                did: didData,
                chainId: Number(chainId),
                creator,
                address,
                salt: Number(salt),
                pki,
                recovery,
                commitments,
                identity,
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

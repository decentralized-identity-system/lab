import { ethers } from "ethers";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { didDisSchema } from "../lib/validation/dis";

/**
 * GET /materialized
 * Materialized page.
 */
export const materialized = async (
    req: Request,
    res: Response,
): Promise<void> => {
    // Resolves a DID to a DID Document
    const did = req.params.did;

    const safeDid = didDisSchema.safeParse(did);

    if (!safeDid.success) {
        res.status(400).json({ ok: false, error: "Invalid DID" });
        return;
    }

    const didData = safeDid.data;

    try {
        const DIS = await prisma.dis.findUnique({
            where: {
                did: didData,
            },
        });

        if (!DIS) {
            res.status(404).json({ ok: false, error: "DID not found" });
            return;
        }

        const { hexDid, signatureDid } = DIS;

        const msg = ethers.utils.solidityPack(
            ["bytes", "bytes"],
            [signatureDid, hexDid],
        );

        res.status(200).json({
            data: msg,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: "Error while resolving DID",
        });
        return;
    }
};

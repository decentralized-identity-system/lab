import { Request, Response } from "express";
import { BigNumber, ethers } from "ethers";
import { prisma } from "../lib/prisma";
import { didDisSchema } from "../lib/validation/dis";

interface CounterfactualRequest extends Request {
    params: {
        did: string;
    };
}

/**
 * GET /counterfactual
 * Counterfactual page.
 */
export const counterfactual = async (
    req: CounterfactualRequest,
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

        const { hexDid, salt, signatureDid, signatureWallet } = DIS;

        const msg = ethers.utils.solidityPack(
            ["uint256", "bytes", "bytes", "bytes"],
            [BigNumber.from(salt), signatureWallet, signatureDid, hexDid],
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

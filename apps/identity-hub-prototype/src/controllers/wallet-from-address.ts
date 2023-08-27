import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { isAddress } from "ethers/lib/utils";

interface ResolveRequest extends Request {
    params: {
        address: string
    };
}

/**
 * GET /wallet-from-address/:address
 * Fetch Smart Wallet from creator address.
 */
export const walletFromAddress = async (
    req: ResolveRequest,
    res: Response,
): Promise<void> => {
    const address = req.params.address;

    if (!isAddress(address)) {
        res.status(400).json({ ok: false, error: "Invalid Address" });
        return;
    }

    try {
        const dis = await prisma.wallet.findFirst({
            where: {
                creator: address,
            },
        });

        if (!dis) {
            res.status(404).json({ ok: false, error: "DID not found" });
            return;
        }

        res.status(200).json({ ...dis });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: "Error while resolving DID",
        });
        return;
    }
};

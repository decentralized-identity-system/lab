import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

import { didDisSchema } from "../lib/validation/dis";

interface ResolveRequest extends Request {
    params: {
        did: string;
    };
}

/**
 * GET /resolve
 * Resolve a DID stored in the database
 */
export const resolve = async (
    req: ResolveRequest,
    res: Response,
): Promise<void> => {
    const did = req.params.did;

    const safeDid = didDisSchema.safeParse(did);

    if (!safeDid.success) {
        res.status(400).json({ ok: false, error: "Invalid DID" });
        return;
    }

    const didData = safeDid.data;

    try {
        const dis = await prisma.dis.findUnique({
            where: {
                did: didData,
            },
        });

        if (!dis) {
            res.status(404).json({ ok: false, error: "DID not found" });
            return;
        }

        res.status(200).json({ ok: true, dis });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: "Error while resolving DID",
        });
        return;
    }
};

import { BigNumber, ethers } from "ethers";
import { Request, Response } from "express";

// DID Document Object
let DID = {
    "@context": "https://www.w3.org/ns/did/v1",
    id: "did:dis:10:0x5FbDB2315678afecb367f032d93F642f64180aa3:0x0cFd869c63b828C28b758A7a96B15E62Be013a22",
};
const signatureDID =
    "0xcf92ef8fd2fa567bae2508e0d3a63d46427efc86453b17c158532567ee7caf557056143a1fb825171cb3e2b41a5f6d7cc4a965146234ecf9a53e3cf54e689f841c";
const signatureWallet =
    "0xab856af405d43f66dc003d335cec2889a4dfeb46b8dd2b9d9d1d4159f61b1ab32f4d5bb5bd51f05c9d1011b26d53408206fc2c4cf8adacd0d186ed125c5f430e1c";

/**
 * GET /materialized
 * Materialized page.
 */
export const materialized = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const bytes = ethers.utils.toUtf8Bytes(JSON.stringify(DID));
    const hexValue = ethers.utils.hexlify(bytes);
    const msg = ethers.utils.solidityPack(
        ["bytes", "bytes"],
        [signatureDID, hexValue],
    );
    res.json({
        data: msg,
    });
};

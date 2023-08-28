import express from "express";
import logger from "morgan";
import * as path from "path";
import {BigNumber, ethers} from "ethers";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
// Create Express server
export const app = express();

  // DID Document Object
let DID = {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: "did:dis:10:0x5FbDB2315678afecb367f032d93F642f64180aa3:0xc809050143d31d20dDf7bcbA132bfA30120c92A1"
}
const signatureDID = "0x8896911c3104076384499f4c8e055825a4e8ce9830ddd8552ad0cc2b1175fe342d51370b83165df2c8b3e913649646ee446eeabb3d93cb185d80a9a91367c49a1c"
const signatureWallet = "0xda75ef26af4047bc4c6a943d25dada93bcae7849ff08ab81411b46492d1900b0057a0591732f820b8b4d2cc2eedb61f9d8a06ad2492ab85f13f2d3c5e93593151b"
const RECOVERY = '0xdEAD000000000000000042069420694206942069';
// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.get("*", index);
app.post("*", index);
app.get('/counterfactual/*', (req, res) => {
    const bytes = ethers.utils.toUtf8Bytes(JSON.stringify(DID));
    const hexValue = ethers.utils.hexlify(bytes);
    const salt = "1";
    const msg = ethers.utils.solidityPack(['uint256', 'address', 'bytes', 'bytes', 'bytes'], [BigNumber.from(salt), RECOVERY, signatureWallet, signatureDID, hexValue]);
    res.json({
        data: msg
    });
})

app.get('/materialized/*', (req, res) => {
    const bytes = ethers.utils.toUtf8Bytes(JSON.stringify(DID));
    const hexValue = ethers.utils.hexlify(bytes);
    const msg = ethers.utils.solidityPack(['bytes', 'bytes'], [signatureDID, hexValue]);
    res.json({
        data: msg
    });
})

app.use(errorNotFoundHandler);
app.use(errorHandler);

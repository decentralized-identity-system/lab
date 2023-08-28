import { Router } from "express";
import * as controller from "../controllers/index";

export const index = Router();

index.get("/", controller.index);
index.get("/counterfactual/:did", controller.counterfactual);
index.get("/materialized/:did", controller.materialized);
index.get("/resolve/:did", controller.resolve);
index.get("/wallet-from-address/:address", controller.walletFromAddress);
index.post("/commit", controller.commit);

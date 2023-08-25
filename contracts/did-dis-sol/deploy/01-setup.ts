import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hardhat;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const URLS_APP =['http://localhost:3001/counterfactual/{sender}/{data}'];
  const ENTRY = '0xdEAD000000000000000042069420694206942069';

  await deploy("PKI", {
    contract: "PKI",
    from: deployer,
    args: [ENTRY, URLS_APP],
    skipIfAlreadyDeployed: false,
    log: true,
  });
}

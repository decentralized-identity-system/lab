import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hardhat;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const URLS_APP =['http://localhost:3001/counterfactual/{sender}/{data}'];
  const ENTRY = '0xdEAD000000000000000042069420694206942069';
  const PKI = '0xdEAD000000000000000042069420694206942069';
  const RECOVERY = '0xdEAD000000000000000042069420694206942069';

  await deploy("Wallet", {
    contract: "Wallet",
    from: deployer,
    args: [ENTRY, PKI, RECOVERY, deployer, URLS_APP],
    skipIfAlreadyDeployed: false,
    log: true,
  });
}

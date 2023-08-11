import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deploy(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hardhat;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const URL = 'http://localhost:3000/{sender}';
  const OWNER = ethers.constants.AddressZero;

  await deploy("Wallet", {
    contract: "Wallet",
    from: deployer,
    args: [URL, [OWNER]],
    skipIfAlreadyDeployed: false,
    log: true,
  });
}

const { ethers, run } = require("hardhat");

async function main() {
  const simplestoragefactory = await ethers.getContractFactory("SimpleStorage");
  const simplestorage = await simplestoragefactory.deploy();
  await simplestorage.deployed();
  console.log(`deployed in address ${simplestorage.address}`);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await simplestorage.deployTransaction.wait(6);
    await verify(simplestorage.address, []);
  }

  const currentValue = await simplestorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simplestorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simplestorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};
main();

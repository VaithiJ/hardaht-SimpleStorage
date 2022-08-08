const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("SimpleStorage", function () {
  let simplestorage, simplestoragefactory;
  beforeEach(async function () {
    simplestoragefactory = await ethers.getContractFactory("SimpleStorage");
    simplestorage = await simplestoragefactory.deploy();
  });

  it("First fav number is 0", async function () {
    const currentvalue = await simplestorage.retrieve();
    const expvalue = "0";
    assert.equal(currentvalue.toString(), expvalue);
  });
  it("Should update when we call store", async function () {
    const expValue = "7";
    const transactionResponse = await simplestorage.store(expValue);
    await transactionResponse.wait(1);

    const currentValue = await simplestorage.retrieve();
    assert.equal(currentValue.toString(), expValue);
  });
  it("LEt's see whether the favnum,name function works", async function () {
    const expectedname = "Vaithi";
    const expectedFavoriteNumber = "30";
    const txresponse = await simplestorage.addPerson(
      expectedname,
      expectedFavoriteNumber
    );
    await txresponse.wait(1);
    const { favoriteNumber, name } = await simplestorage.people(0);
    assert.equal(name, expectedname);
    assert.equal(favoriteNumber, expectedFavoriteNumber);
  });
});

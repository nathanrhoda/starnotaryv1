const StarNotary = artifacts.require("./starNotary.sol");

var accounts;
var owner;

contract('StarNotary',  (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('has correct name', async () => {
    let instance = await StarNotary.deployed();
    let starName = await instance.starName.call();
    assert.equal(starName, "Awesome Udacity Star");
});

it('can be claimed', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    assert.equal(await instance.starOwner.call(), owner);
});

it('can change owners', async () => {
    let instance = await StarNotary.deployed();
    var secondUser = accounts[1];
    await instance.claimStar({from: owner});
    assert.equal(await instance.starOwner.call(), owner);
    await instance.claimStar({from: secondUser});
    assert.equal(await instance.starOwner.call(), secondUser);

});

it('can change name', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    await instance.changeName("I Changed the name");
    assert.equal(await instance.starName.call(), "I Changed the name");

});
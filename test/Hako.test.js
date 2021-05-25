const { assert } = require('chai');

const Hako = artifacts.require('./Hako.sol');

contract('Hako', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', 0, {from: alice});
  });

  it('should have correct name, symbol, decimals, hakoOwner, hakoAddress, tokenSupply and upperLimit', async function () {
  
    const name = await this.hako.name();
    const symbol = await this.hako.symbol();
    const decimals = await this.hako.decimals();
    const hakoOwner = await this.hako.hakoOwner();
    const hakoAddress = await this.hako.hakoAddress();
    const totalSupply = await this.hako.totalSupply();
    const upperLimit = await this.hako.upperLimit();
    const hakoOwnerBalance = await this.hako.balanceOf(hakoOwner);
    
    assert.equal(name.valueOf(), 'HakoExample');
    assert.equal(symbol.valueOf(), 'HKEX');
    assert.equal(decimals.valueOf(), '0');
    assert.equal(hakoOwner, alice);
    assert.equal(hakoAddress, hakoAddress);
    assert.equal(totalSupply, 1000);
    assert.equal(upperLimit, 500);
    assert.equal(hakoOwnerBalance, 1000);
  });

});
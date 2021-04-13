const { assert } = require('chai');

const Hako = artifacts.require('./Hako.sol');

contract.skip('Hako', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 'HakoExample', 'HKEX', {from: alice});
  });

  it('should have correct name, symbol, decimals, hakoAddress and tokenSupply', async function () {
  
    const name = await this.hako.name();
    const symbol = await this.hako.symbol();
    const decimals = await this.hako.decimals();
    const hakoAddress = await this.hako.hakoAddress();
    const totalSupply = await this.hako.totalSupply();
    
    assert.equal(name.valueOf(), 'HakoExample');
    assert.equal(symbol.valueOf(), 'HKEX');
    assert.equal(decimals.valueOf(), '2');
    assert.equal(hakoAddress, hakoAddress);
    assert.equal(totalSupply, 1000);
  });

});
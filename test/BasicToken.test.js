const { assert } = require('chai');
const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");

contract.skip('BasicToken', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 'HakoExample', 'HKEX', {from: alice});
  });

  it('should exist', function () {
    this.hako.should.exist;
  });
      
  it('should have correct initialSupply', async function () {
    const initialSupply = await this.hako.balanceOf(alice);
    assert.equal(initialSupply, 1000);
  });
      
  it('should have correct totalSupply', async function () {
    const totalSupply = await this.hako.totalSupply();
    assert.equal(totalSupply, 1000);
  });

  describe('transfer', () => {

    it('should transfer token', async function () {
      await this.hako.transfer(bob, 500, {from: alice});
      const balanceOfAlice = await this.hako.balanceOf(alice);
      const balanceOfBob = await this.hako.balanceOf(bob);
      assert.equal(balanceOfAlice, 500);
      assert.equal(balanceOfBob, 500);
    });

    it('should transfer token to multiple accounts', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.transfer(carol, 100, {from: bob});
      await this.hako.transfer(dave, 50, {from: bob});
      await this.hako.transfer(dave, 50, {from: carol});
      const balanceOfAlice = await this.hako.balanceOf(alice);
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfCarol = await this.hako.balanceOf(carol);
      const balanceOfDave = await this.hako.balanceOf(dave);
      assert.equal(balanceOfAlice, 400);
      assert.equal(balanceOfBob, 150);
      assert.equal(balanceOfCarol, 250);
      assert.equal(balanceOfDave, 200);
    });

    it('should not transfer more token than a transferer has', async function () {
      await utils.shouldThrow(this.hako.transfer(bob, 2000, {from: alice}));
    });

    it('should not transfer token to address(0)', async function () {
      await utils.shouldThrow(this.hako.transfer(0, 500, {from: alice}));
    });

    it('should emit a Transfer event', async function () {
      const {logs} = 
        await this.hako.transfer(bob, 500, {from: alice});
      const event = await expectEvent.inLogs(logs, 'Transfer');
      assert.equal(event.args.from, alice);
      assert.equal(event.args.to, bob);
      assert.equal(event.args.value, 500);
    });
      
  });
  
});
const { assert } = require('chai');
const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");

contract('HakoOwner', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', {from: alice});
  });

  it('should have correct hakoOwner', async function () {
    const hakoOwner = await this.hako.hakoOwner();
    assert.equal(hakoOwner, alice);
  });

  it('should have correct balanceOf hako owner', async function () {
    const balanceOfHakoOwner = await this.hako.balanceOfHakoOwner();
    assert.equal(balanceOfHakoOwner, 1000);
  });

  describe('changeHakoOwner', () => {
    
    it('should change hakoOwner', async function () {
      await this.hako.changeHakoOwner(bob, {from: alice});
      const newHakoOwner = await this.hako.hakoOwner();
      assert.equal(newHakoOwner, bob);
    });
    
    it('should not allow non-hakoOwner accounts to change hakoOwner', async function () {
      await utils.shouldThrow(this.hako.changeHakoOwner(bob, {from: bob}));
    });

    it('should not change hakoOwner to an account of hako member', async function () {
      await this.hako.joinHako(0, {from: bob});
      await utils.shouldThrow(this.hako.changeHakoOwner(bob, {from: alice}));
    });

    it('should not change hakoOwner to address(0)', async function () {
      await utils.shouldThrow(this.hako.changeHakoOwner(0, {from: alice}));
    });

    it('should emit a ChangeHakoOwner event', async function () {
      const {logs} = 
        await this.hako.changeHakoOwner(bob, {from: alice});
      const event = await expectEvent.inLogs(logs, 'ChangeHakoOwner');
      assert.equal(event.args.oldHakoOwner, alice);
      assert.equal(event.args.newHakoOwner, bob);
    });

  });

  describe('changeUpperLimit', () => {

    it('should change upperLimit', async function () {
      await this.hako.changeUpperLimit(600, {from: alice});
      const upperLimit = await this.hako.upperLimit();
      assert.equal(upperLimit, 600);
    });
    
    it('should not allow non-hakoOwner accounts to change upperLimit', async function () {
      await utils.shouldThrow(this.hako.changeUpperLimit(600, {from: bob}));
    });

    it('should emit a ChangeUpperLimit event', async function () {
      const {logs} = 
        await this.hako.changeUpperLimit(600, {from: alice});
      const event = await expectEvent.inLogs(logs, 'ChangeUpperLimit');
      assert.equal(event.args.hakoOwner, alice);
      assert.equal(event.args.newUpperLimit, 600);
    });

  });

});
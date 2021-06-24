const { assert } = require('chai');
const expectEvent = require('@openzeppelin/test-helpers/src/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("@openzeppelin/test-helpers/src/time");

contract('HakoOwner', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', 0, {from: alice});
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

  describe('getReward', () => {

    it('should get reward', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.getReward({from: alice});
      //balance of hako is 594 (= 600 - 600/100)
      //balance of alice is 406 (= 400 + 600/100)
      const balanceOfHakoA = await this.hako.balanceOfHako();
      const balanceOfAliceA = await this.hako.balanceOf(alice);
      assert.equal(balanceOfHakoA, 594);
      assert.equal(balanceOfAliceA, 406);
      await time.increase(time.duration.seconds(86400));
      await this.hako.getReward({from: alice});
      //balance of hako is 589 (= 594 - 594/100)
      //balance of alice is 411 (= 406 + 594/100)
      const balanceOfHakoB = await this.hako.balanceOfHako();
      const balanceOfAliceB = await this.hako.balanceOf(alice);
      assert.equal(balanceOfHakoB, 589);
      assert.equal(balanceOfAliceB, 411);
      await time.increase(time.duration.seconds(86400));
      await this.hako.getReward({from: alice});
      //balance of hako is 584 (= 589 - 589/100)
      //balance of alice is 416 (= 411 + 589/100)
      const balanceOfHakoC = await this.hako.balanceOfHako();
      const balanceOfAliceC = await this.hako.balanceOf(alice);
      assert.equal(balanceOfHakoC, 584);
      assert.equal(balanceOfAliceC, 416);
    });
    
    it('should not allow non-hakoOwner accounts to get reward', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await utils.shouldThrow(this.hako.getReward({from: bob}));
    });

    it('should not get reward if 24 hours is yet to be passed', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.getReward({from: alice});
      await time.increase(time.duration.seconds(82800));
      await utils.shouldThrow(this.hako.getReward({from: alice}));
    });

    it('should emit a GetReward event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      const {logs} = 
        await this.hako.getReward({from: alice});
      const event = await expectEvent.inLogs(logs, 'GetReward');
      assert.equal(event.args.hakoOwner, alice);
      assert.equal(event.args.rewardValue, 6);
    });

  });

});
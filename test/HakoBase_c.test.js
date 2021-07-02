const { assert } = require('chai');
const expectEvent = require('@openzeppelin/test-helpers/src/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("@openzeppelin/test-helpers/src/time");

contract('HakoBase_c', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoTokenExample', 'HTE', 0, {from: alice});
  });

  describe('transferCredit', () => {

    it('should allow hako members to transfer creditToHako to other members', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.transferCredit(carol, 100, {from: bob});
      await this.hako.transferCredit(dave, 100, {from: bob});
      await this.hako.transferCredit(dave, 100, {from: carol});
      //creditToHako of bob is 100 (= 300 - 100 - 100).
      //creditToHako of carol is 200 (= 200 + 100 - 100).
      //creditToHako of dave is 300 (= 100 + 100 + 100).
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const creditToHakoOfDave = await this.hako.creditToHakoOf(dave);
      assert.equal(creditToHakoOfBob, 100);
      assert.equal(creditToHakoOfCarol, 200);
      assert.equal(creditToHakoOfDave, 300);
    });

    it('should not allow non-hako member accounts to transfer creditToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      //bob is not a hako member.
      await utils.shouldThrow(this.hako.transferCredit(carol, 100, {from: bob}));
    });

    it('should not allow hako members to transfer creditToHako to non-hako member accounts', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      //bob is a hako member, but carol is not a hako member.
      await utils.shouldThrow(this.hako.transferCredit(carol, 100, {from: bob}));
    });

    it('should not allow hako members to transfer more creditToHako than they have', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      //bob has only 300 creditToHako.
      await utils.shouldThrow(this.hako.transferCredit(carol, 1000, {from: bob}));
    });

    it('should not allow hako members to transfer creditToHako to address(0)', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await utils.shouldThrow(this.hako.transferCredit(0, 100, {from: bob}));
    });

    it('should not allow hako members to transfer creditToHako to the members who have debtToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.createCredit(100, {from: carol});
      //carol has 100 debtToHako.
      await utils.shouldThrow(this.hako.transferCredit(carol, 100, {from: bob}));
      await this.hako.reduceDebt(100, {from: carol});
      await this.hako.registerBorrowing(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.transferCredit(dave, 300, {from: carol});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //carol has 100 debtToHako.
      await utils.shouldThrow(this.hako.transferCredit(carol, 300, {from: dave}));
    });

    it('should emit a TransferCredit event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      const {logs} = 
        await this.hako.transferCredit(carol, 100, {from: bob});
      const event = await expectEvent.inLogs(logs, 'TransferCredit');
      assert.equal(event.args.from, bob);
      assert.equal(event.args.to, carol);
      assert.equal(event.args.value, 100);
    });

  });

});
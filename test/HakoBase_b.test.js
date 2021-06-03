const { assert } = require('chai');
const expectEvent = require('@openzeppelin/test-helpers/src/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("@openzeppelin/test-helpers/src/time");

contract('HakoBase_b', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', 0, {from: alice});
  });

  describe('depositToken', () => {

    it('should allow hako members to deposit token', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(100, {from: bob});
      await this.hako.depositToken(100, {from: bob});
      //balance of bob's token is 100 (= 300 - 100 - 100)
      //balance of hako's token is 200 (= 0 + 100 + 100)
      //creditToHako of bob is 200 (= 100 + 100)
      //debtToBob of hako is 200 (bob's credit to hako = hako's debt to bob)
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfHako = await this.hako.balanceOfHako();
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToBobOfHako = await this.hako.debtOfHako();
      assert.equal(balanceOfBob, 100);
      assert.equal(balanceOfHako, 200);
      assert.equal(creditToHakoOfBob, 200);
      assert.equal(debtToBobOfHako, 200);
    });

    it('should not allow hako members to deposit more token than they have', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(100, {from: bob});
      //bob has only 200 token
      await utils.shouldThrow(this.hako.depositToken(1000, {from: bob}));
    });

    it('should not allow non-hako member accounts to deposit token', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(100, {from: bob});
      //carol is not a hako member
      await utils.shouldThrow(this.hako.depositToken(100, {from: carol}));
      await this.hako.leaveHako({from: bob});
      //bob left hako, so he is not a hako member
      await utils.shouldThrow(this.hako.depositToken(100, {from: bob}));
    });

    it('should emit a DepositToken event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(100, {from: bob});
      const {logs} = 
        await this.hako.depositToken(100, {from: bob});
      const event = await expectEvent.inLogs(logs, 'DepositToken');
      assert.equal(event.args.member, bob);
      assert.equal(event.args.value, 100);
    });

  });

  describe('withdrawToken', () => {

    it('should allow hako members to withdraw token', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.withdrawToken(100, {from: bob});
      //balance of bob's token is 100 (= 300 - 300 + 100)
      //balance of hako's token is 200 (= 0 + 300 - 100)
      //creditToHako of bob is 200 (= 300 - 100)
      //debtToBob of hako is 200 (bob's credit to hako = hako's debt to bob)
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfHako = await this.hako.balanceOfHako();
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToBobOfHako = await this.hako.debtOfHako();
      assert.equal(balanceOfBob, 100);
      assert.equal(balanceOfHako, 200);
      assert.equal(creditToHakoOfBob, 200);
      assert.equal(debtToBobOfHako, 200);
    });

    it('should allow hako members to withdraw token (when the hako does not have enough token)', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(200, {from: carol});
      //creditToHako of carol is 400 (= 200 + 200)
      //debtToHako of carol is 200
      await this.hako.transferCredit(bob, 400, {from: carol});
      //creditToHako of bob is 700 (= 300 + 400)
      //creditToHako of carol is 0 (= 400 - 400)
      await this.hako.withdrawToken(700, {from: bob});
      //hako has only 600 token, but bob withdraws 700 token (over!)
      //it increases 100 token supply
      //balance of hako's token is 700 (= 600 + 100)
      //totalSupply is 1100 (= 1000 + 100)
      //then, bob withdraws 700 token
      //balance of bob's token is 700 (= 300 - 300 + 700)
      //balance of hako's token is 0 (= 700 - 700)
      //creditToHako of bob is 0 (= 700 - 700)
      //creditToHako of carol is 0
      //creditToHako of dave is 100
      //debtToHako of bob is 0
      //debtToHako of carol is 200
      //debtToHako of dave is 0
      //creditToMembers of hako is 200 (= 0 + 200 + 0)
      //debtToMembers of hako is 100 (= 0 + 0 + 100)
      //hako's credit to members = bob's, carol's, dave's (members') debt to hako
      //hako's debt to members = bob's, carol's, dave's (members') credit to hako
      const totalSupply = await this.hako.totalSupply();
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfHako = await this.hako.balanceOfHako();
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToMembersOfHako = await this.hako.creditOfHako();
      const debtToMembersOfHako = await this.hako.debtOfHako();
      assert.equal(totalSupply, 1100);
      assert.equal(balanceOfBob, 700);
      assert.equal(balanceOfHako, 0);
      assert.equal(creditToHakoOfBob, 0);
      assert.equal(debtToHakoOfBob, 0);
      assert.equal(creditToHakoOfCarol, 0);
      assert.equal(debtToHakoOfCarol, 200);
      assert.equal(creditToMembersOfHako, 200);
      assert.equal(debtToMembersOfHako, 100);
    });

    it('should not allow hako members to withdraw more token than they have', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      //bob has only 300 creditToHako
      await utils.shouldThrow(this.hako.withdrawToken(1000, {from: bob}));
    });

    it('should not allow hako members who have debtToHako to withdraw token', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(100, {from: carol});
      //carol has 100 debtToHako
      await utils.shouldThrow(this.hako.withdrawToken(100, {from: carol}));
      await this.hako.arrangement(100, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.transferCredit(dave, 300, {from: carol});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //carol has 100 debtToHako
      await utils.shouldThrow(this.hako.withdrawToken(100, {from: carol}));
    });

    it('should not allow hako members who have debtToMember to withdraw token', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      //carol has 100 debtToMember
      await utils.shouldThrow(this.hako.withdrawToken(100, {from: carol}));
    });

    it('should emit a WithdrawToken event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      const {logs} = 
        await this.hako.withdrawToken(100, {from: bob});
      const event = await expectEvent.inLogs(logs, 'WithdrawToken');
      assert.equal(event.args.member, bob);
      assert.equal(event.args.value, 100);
    });

  });

});
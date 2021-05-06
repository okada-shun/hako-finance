const { assert } = require('chai');
const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract('CreditCreation_b', ([alice, bob, carol, dave, ...accounts]) => {
  
  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', {from: alice});
  });

  describe('arrangement', () => {

    it('should allow a hako member to arrange his creditToHako and debtToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.creditCreationByMember(100, {from: bob});
      await this.hako.arrangement(50, {from: bob});
      //creditToHako of bob is 350 (= 300 + 100 - 50)
      //debtToHako of bob is 50 (= 100 - 50)
      //creditToBob of hako is 50 (bob's debt to hako = hako's credit to bob)
      //debtToBob of hako is 350 (bob's credit to hako = hako's debt to bob)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const creditToBobOfHako = await this.hako.creditOfHako();
      const debtToBobOfHako = await this.hako.debtOfHako();
      assert.equal(creditToHakoOfBob, 350);
      assert.equal(debtToHakoOfBob, 50);
      assert.equal(creditToBobOfHako, 50);
      assert.equal(debtToBobOfHako, 350);
    });

    it('should allow multiple hako members to arrange their creditToHako and debtToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(100, {from: bob});
      await this.hako.creditCreationByMember(50, {from: carol});
      await this.hako.creditCreationByMember(50, {from: dave});
      await this.hako.arrangement(50, {from: bob});
      await this.hako.arrangement(20, {from: carol});
      await this.hako.arrangement(10, {from: dave});
      //creditToHako of bob is 350 (= 300 + 100 - 50)
      //debtToHako of bob is 50 (= 100 - 50)
      //creditToHako of carol is 230 (= 200 + 50 - 20)
      //debtToHako of carol is 30 (= 50 - 20)
      //creditToHako of dave is 140 (= 100 + 50 - 10)
      //debtToHako of dave is 40 (= 50 - 10)
      //creditToMembers of hako is 120 (= 50 + 30 + 40, members' debt to hako = hako's credit to members)
      //debtToMembers of hako is 720 (= 350 + 230 + 140, members' credit to hako = hako's debt to members)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToHakoOfDave = await this.hako.creditToHakoOf(dave);
      const debtToHakoOfDave = await this.hako.debtToHakoOf(dave);
      const creditToMembersOfHako = await this.hako.creditOfHako();
      const debtToMembersOfHako = await this.hako.debtOfHako();
      assert.equal(creditToHakoOfBob, 350);
      assert.equal(debtToHakoOfBob, 50);
      assert.equal(creditToHakoOfCarol, 230);
      assert.equal(debtToHakoOfCarol, 30);
      assert.equal(creditToHakoOfDave, 140);
      assert.equal(debtToHakoOfDave, 40);
      assert.equal(creditToMembersOfHako, 120);
      assert.equal(debtToMembersOfHako, 720);
    });

    it('should allow hako members to return their debtToHako to hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.transferCredit(dave, 300, {from: carol});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //creditToHako of bob is 300 (= 300 - 100 + 100)
      //debtToHako of bob is 0
      //creditToHako of carol is 0 (= 200 + 100 - 300)
      //debtToHako of carol is 100
      //creditToHako of dave is 400 (= 100 + 300)
      //debtToHako of dave is 0
      await this.hako.withdrawToken(300, {from: dave});
      await this.hako.transfer(carol, 300, {from: dave});
      await this.hako.depositToken(300, {from: carol});
      await this.hako.arrangement(50, {from: carol});
      //creditToHako of bob is 300
      //debtToHako of bob is 0
      //creditToHako of carol is 250 (= 0 + 300 - 50)
      //debtToHako of carol is 50 (= 100 - 50)
      //creditToHako of dave is 100 (= 400 - 300)
      //debtToHako of dave is 0
      //creditToMembers of hako is 50 (= 0 + 50 + 0, members' debt to hako = hako's credit to members)
      //debtToMembers of hako is 650 (= 300 + 250 + 100, members' credit to hako = hako's debt to members)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToHakoOfDave = await this.hako.creditToHakoOf(dave);
      const debtToHakoOfDave = await this.hako.debtToHakoOf(dave);
      const creditToMembersOfHako = await this.hako.creditOfHako();
      const debtToMembersOfHako = await this.hako.debtOfHako();
      assert.equal(creditToHakoOfBob, 300);
      assert.equal(debtToHakoOfBob, 0);
      assert.equal(creditToHakoOfCarol, 250);
      assert.equal(debtToHakoOfCarol, 50);
      assert.equal(creditToHakoOfDave, 100);
      assert.equal(debtToHakoOfDave, 0);
      assert.equal(creditToMembersOfHako, 50);
      assert.equal(debtToMembersOfHako, 650);
    });

    it('should not allow hako members to arrange more creditToHako or debtToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(100, {from: bob});
      //bob has 400 creditToHako, 100 debtToHako
      await utils.shouldThrow(this.hako.arrangement(200, {from: bob}));
      await this.hako.arrangement(100, {from: bob});
      await this.hako.creditCreationByMember(300, {from: bob});
      await this.hako.transferCredit(carol, 600, {from: bob});
      //bob has 0 creditToHako, 300 debtToHako
      await utils.shouldThrow(this.hako.arrangement(200, {from: bob}));
    });

    it('should emit a Arrangement event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.creditCreationByMember(100, {from: bob});
      const {logs} = 
        await this.hako.arrangement(50, {from: bob});
      const event = await expectEvent.inLogs(logs, 'Arrangement');
      assert.equal(event.args.member, bob);
      assert.equal(event.args.value, 50);
    });

  });

});
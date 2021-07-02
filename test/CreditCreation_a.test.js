const { assert } = require('chai');
const expectEvent = require('@openzeppelin/test-helpers/src/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("@openzeppelin/test-helpers/src/time");

contract('CreditCreation_a', ([alice, bob, carol, dave, ...accounts]) => {
  
  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoTokenExample', 'HTE', 0, {from: alice});
  });

  describe('createCredit', () => {

    it('should allow a hako member to create creditToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.createCredit(100, {from: bob});
      //creditToHako of bob is 400 (= 300 + 100).
      //debtToHako of bob is 100.
      //creditToBob of hako is 100 (bob's debt to hako = hako's credit to bob).
      //debtToBob of hako is 400 (bob's credit to hako = hako's debt to bob).
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const creditToBobOfHako = await this.hako.creditOfHako();
      const debtToBobOfHako = await this.hako.debtOfHako();
      assert.equal(creditToHakoOfBob, 400);
      assert.equal(debtToHakoOfBob, 100);
      assert.equal(creditToBobOfHako, 100);
      assert.equal(debtToBobOfHako, 400);
    });

    it('should allow multiple hako members to create creditToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.createCredit(100, {from: bob});
      await this.hako.createCredit(50, {from: carol});
      await this.hako.createCredit(50, {from: dave});
      //creditToHako of bob is 400 (= 300 + 100).
      //debtToHako of bob is 100.
      //creditToHako of carol is 250 (= 200 + 50).
      //debtToHako of carol is 50.
      //creditToHako of dave is 150 (= 100 + 50).
      //debtToHako of dave is 50.
      //creditToMembers of hako is 200 (= 100 + 50 + 50, members' debt to hako = hako's credit to members).
      //debtToMembers of hako is 800 (= 400 + 250 + 150, members' credit to hako = hako's debt to members).
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToHakoOfDave = await this.hako.creditToHakoOf(dave);
      const debtToHakoOfDave = await this.hako.debtToHakoOf(dave);
      const creditToMembersOfHako = await this.hako.creditOfHako();
      const debtToMembersOfHako = await this.hako.debtOfHako();
      assert.equal(creditToHakoOfBob, 400);
      assert.equal(debtToHakoOfBob, 100);
      assert.equal(creditToHakoOfCarol, 250);
      assert.equal(debtToHakoOfCarol, 50);
      assert.equal(creditToHakoOfDave, 150);
      assert.equal(debtToHakoOfDave, 50);
      assert.equal(creditToMembersOfHako, 200);
      assert.equal(debtToMembersOfHako, 800);
    });

    it('should not allow non-hako member accounts to create creditToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await utils.shouldThrow(this.hako.createCredit(100, {from: bob}));
    });

    it('should not allow hako members who have debtToHako to create creditToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.createCredit(100, {from: carol});
      //carol has 100 debtToHako.
      await utils.shouldThrow(this.hako.createCredit(100, {from: carol}));
      await this.hako.reduceDebt(100, {from: carol});
      await this.hako.registerBorrowing(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.transferCredit(dave, 300, {from: carol});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //carol has 100 debtToHako.
      await utils.shouldThrow(this.hako.createCredit(100, {from: carol}));
    });

    it('should not allow hako members to create more creditToHako than upperLimit', async function () {
      await this.hako.transfer(bob, 700, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(700, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      //upperLimit is 500.
      //netAssets of bob is 700.
      await utils.shouldThrow(this.hako.createCredit(700, {from: bob}));
    });

    it('should not allow hako members whose netAssets is minus to create creditToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowing(200, 60, {from: bob});
      await this.hako.lendCredit(bob, 200, 60, {from: carol});
      await this.hako.transferCredit(dave, 500, {from: bob});
      //balance of bob's token is 0 (= 300 - 300).
      //creditToHako of bob is 0, debtToHako of bob is 0.
      //creditToMember of bob is 0, debtToMember of bob is 200.
      //netAssets of bob is -200.
      await utils.shouldThrow(this.hako.createCredit(100, {from: bob}));
    });

    it('should not allow hako members to create more creditToHako than his netAssets', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      //balance of bob's token is 0 (= 300 - 300).
      //creditToHako of bob is 300, debtToHako of bob is 0.
      //creditToMember of bob is 0, debtToMember of bob is 0.
      //netAssets of bob is 300.
      await utils.shouldThrow(this.hako.createCredit(500, {from: bob}));
      await this.hako.registerBorrowing(200, 60, {from: bob});
      await this.hako.lendCredit(bob, 200, 60, {from: carol});
      //balance of bob's token is 0.
      //creditToHako of bob is 500, debToHako of bob is 0.
      //creditToMember of bob is 0, debtToMember of bob is 200.
      //netAssets of bob is 300.
      await utils.shouldThrow(this.hako.createCredit(500, {from: bob}));
      await this.hako.returnDebtTo(carol, 1, {from: bob});
      await this.hako.transferCredit(bob, 200, {from: carol});
      //balance of bob's token is 0.
      //creditToHako of bob is 500, debToHako of bob is 0.
      //creditToMember of bob is 0, debtToMember of bob is 0.
      //netAssets of bob is 500.
      await this.hako.createCredit(500, {from: bob});
    });

    it('should emit a CreateCredit event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      const {logs} = 
        await this.hako.createCredit(100, {from: bob});
      const event = await expectEvent.inLogs(logs, 'CreateCredit');
      assert.equal(event.args.member, bob);
      assert.equal(event.args.value, 100);
    });

  });

});
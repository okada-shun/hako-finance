const { assert } = require('chai');
const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract('Lend_b', ([alice, bob, carol, dave, ...accounts]) => {
  
  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', 0, {from: alice});
  });

  describe('collectDebtFrom', () => {

    it('should allow a creditor member to collect his credit from a debtor member (when the debtor has enough creditToHako)', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //creditToHako of bob is 300 (= 300 - 100 + 100)
      //creditToHako of carol is 200 (= 200 + 100 - 100)
      //creditToMember of bob is 0 (= 100 - 100)
      //debtToMember of carol is 0 (= 100 - 100)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToMemberOfBob = await this.hako.creditToMemberOf(bob);
      const creditToMemberOfCarol = await this.hako.creditToMemberOf(carol);
      const debtToMemberOfBob = await this.hako.debtToMemberOf(bob);
      const debtToMemberOfCarol = await this.hako.debtToMemberOf(carol);
      assert.equal(creditToHakoOfBob, 300);
      assert.equal(creditToHakoOfCarol, 200);
      assert.equal(debtToHakoOfBob, 0);
      assert.equal(debtToHakoOfCarol, 0);
      assert.equal(creditToMemberOfBob, 0);
      assert.equal(creditToMemberOfCarol, 0);
      assert.equal(debtToMemberOfBob, 0);
      assert.equal(debtToMemberOfCarol, 0);
    });

    it('should allow a creditor member to collect his credit from a debtor member (when the debtor has not enough creditToHako)', async function () {
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
      //carol has 100 debtToMember(debt to bob), but she has 0 creditToHako (not enough!)
      //in place of carol, hako pays back to bob to make up for
      //carol has 100 debtToHako
      //creditToHako of bob is 300 (= 300 - 100 + 100)
      //creditToHako of carol is 0 (= 200 + 100 - 300)
      //debtToHako of carol is 100
      //creditToMember of bob is 0 (= 100 - 100)
      //debtToMember of carol is 0 (= 100 - 100)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToMemberOfBob = await this.hako.creditToMemberOf(bob);
      const creditToMemberOfCarol = await this.hako.creditToMemberOf(carol);
      const debtToMemberOfBob = await this.hako.debtToMemberOf(bob);
      const debtToMemberOfCarol = await this.hako.debtToMemberOf(carol);
      assert.equal(creditToHakoOfBob, 300);
      assert.equal(creditToHakoOfCarol, 0);
      assert.equal(debtToHakoOfBob, 0);
      assert.equal(debtToHakoOfCarol, 100);
      assert.equal(creditToMemberOfBob, 0);
      assert.equal(creditToMemberOfCarol, 0);
      assert.equal(debtToMemberOfBob, 0);
      assert.equal(debtToMemberOfCarol, 0);
    });

    it('should not allow a creditor member to collect his credit from a debtor member twice', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //bob has already collected his credit from carol
      await utils.shouldThrow(this.hako.collectDebtFrom(carol, 1, {from: bob}));
    });

    it('should not allow a creditor member to collect his credit from a debtor member when lend duration is yet to be passed', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(30));
      //only passed 30 seconds (< 60 seconds)
      await utils.shouldThrow(this.hako.collectDebtFrom(carol, 1, {from: bob}));
    });

    it('should not allow a non-creditor member to collect credit from a debtor member', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      //dave is not a creditor
      await utils.shouldThrow(this.hako.collectDebtFrom(carol, 1, {from: dave}));
    });

    it('should not allow a creditor member to collect his credit from a non-debtor member', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      //dave is not a debtor
      await utils.shouldThrow(this.hako.collectDebtFrom(dave, 1, {from:bob}));
    });

    it('should emit a CollectDebtFrom event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      const {logs} = 
        await this.hako.collectDebtFrom(carol, 1, {from: bob});
      const event = await expectEvent.inLogs(logs, 'CollectDebtFrom');
      assert.equal(event.args.creditor, bob);
      assert.equal(event.args.debtor, carol);
      assert.equal(event.args.id, 1);
    });
      
  });

  describe('returnDebtTo', () => {

    it('should allow a debtor member to return his debt to a creditor member', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      await this.hako.returnDebtTo(bob, 1, {from: carol});
      //creditToHako of bob is 300 (= 300 - 100 + 100)
      //creditToHako of carol is 200 (= 200 + 100 - 100)
      //creditToMember of bob is 0 (= 100 - 100)
      //debtToMember of carol is 0 (= 100 - 100)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToMemberOfBob = await this.hako.creditToMemberOf(bob);
      const creditToMemberOfCarol = await this.hako.creditToMemberOf(carol);
      const debtToMemberOfBob = await this.hako.debtToMemberOf(bob);
      const debtToMemberOfCarol = await this.hako.debtToMemberOf(carol);
      assert.equal(creditToHakoOfBob, 300);
      assert.equal(creditToHakoOfCarol, 200);
      assert.equal(debtToHakoOfBob, 0);
      assert.equal(debtToHakoOfCarol, 0);
      assert.equal(creditToMemberOfBob, 0);
      assert.equal(creditToMemberOfCarol, 0);
      assert.equal(debtToMemberOfBob, 0);
      assert.equal(debtToMemberOfCarol, 0);
    });

    it('should not allow a debtor member to return his debt to a creditor member twice', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      await this.hako.returnDebtTo(bob, 1, {from: carol});
      //carol has already returned her debt to bob
      await utils.shouldThrow(this.hako.returnDebtTo(bob, 1, {from: carol}));
    });

    it('should not allow a non-debtor member to return his debt to a creditor member', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      //dave is not a debtor
      await utils.shouldThrow(this.hako.returnDebtTo(bob, 1, {from: dave}));
    });

    it('should not allow a debtor member to return his debt to a non-creditor member', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      //dave is not a creditor
      await utils.shouldThrow(this.hako.returnDebtTo(dave, 1, {from: carol}));
    });

    it('should not allow a debtor member to return his debt to a creditor member when the debtor has not enough creditToHako', async function () {
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
      //carol has only 0 creditToHako
      await utils.shouldThrow(this.hako.returnDebtTo(bob, 1, {from: carol}));
    });

    it('should emit a ReturnDebtTo event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      const {logs} = 
        await this.hako.returnDebtTo(bob, 1, {from: carol});
      const event = await expectEvent.inLogs(logs, 'ReturnDebtTo');
      assert.equal(event.args.debtor, carol);
      assert.equal(event.args.creditor, bob);
      assert.equal(event.args.id, 1);
    });

  });

});
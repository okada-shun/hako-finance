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

contract('Lend_a', ([alice, bob, carol, dave, ...accounts]) => {
  
  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoExample', 'HKEX', 0, {from: alice});
  });

  describe('registerBorrowValueDuration', () => {

    it('should allow hako members to register borrowValue and borrowDuration', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.registerBorrowValueDuration(100, 60, {from: bob});
      const registeredBorrowValueDurationOfBob = await this.hako.getBorrowValueDurationOf(bob);
      assert.equal(registeredBorrowValueDurationOfBob[0], 100);
      assert.equal(registeredBorrowValueDurationOfBob[1], 60);
    });

    it('should not allow non-hako member accounts to register borrowValue and borrowDuration', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await utils.shouldThrow(this.hako.registerBorrowValueDuration(100, 60, {from: bob}));
    });
    
    it('should not allow hako members who have debtToMember to register borrowValue and borrowDuration', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      //debtToMember of carol is 100
      await utils.shouldThrow(this.hako.registerBorrowValueDuration(100, 60, {from: carol}));
    });

    it('should not allow hako members to register more borrowValue than upperLimit', async function () {
      await this.hako.transfer(bob, 700, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(700, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      //upperLimit is 500
      //netAssets of bob is 700
      await utils.shouldThrow(this.hako.registerBorrowValueDuration(700, 60, {from: bob}));
    });

    it('should not allow hako members whose netAssets is minus to register borrowValue and borrowDuration', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(200, {from: bob});
      await this.hako.transferCredit(carol, 500, {from: bob});
      //balance of bob's token is 0 (= 300 - 300)
      //creditToHako of bob is 0, debtToHako of bob is 200
      //creditToMember of bob is 0, debtToMember of bob is 0
      //netAssets of bob is -200
      await utils.shouldThrow(this.hako.registerBorrowValueDuration(100, 60, {from: bob}));
    });

    it('should not allow hako members to register more borrowValue than his netAssets', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      //balance of bob's token is 0 (= 300 - 300)
      //creditToHako of bob is 300, debtToHako of bob is 0
      //creditToMember of bob is 0, debtToMember of bob is 0
      //netAssets of bob is 300
      await utils.shouldThrow(this.hako.registerBorrowValueDuration(500, 60, {from: bob}));
      await this.hako.creditCreationByMember(200, {from: bob});
      //balance of bob's token is 0
      //creditToHako of bob is 500, debToHako of bob is 200
      //creditToMember of bob is 0, debtToMember of bob is 0
      //netAssets of bob is 300
      await utils.shouldThrow(this.hako.registerBorrowValueDuration(500, 60, {from: bob}));
      await this.hako.arrangement(200, {from: bob});
      await this.hako.transferCredit(bob, 200, {from: carol});
      //balance of bob's token is 0
      //creditToHako of bob is 500, debToHako of bob is 0
      //creditToMember of bob is 0, debtToMember of bob is 0
      //netAssets of bob is 500
      await this.hako.registerBorrowValueDuration(500, 60, {from: bob});
    });

    it('should emit a RegisterBorrowValueDuration event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      const {logs} = 
        await this.hako.registerBorrowValueDuration(100, 60, {from: bob});
      const event = await expectEvent.inLogs(logs, 'RegisterBorrowValueDuration');
      assert.equal(event.args.member, bob);
      assert.equal(event.args.value, 100);
    });

  });

  describe('lendCredit', () => {

    it('should allow hako members to lend creditToHako to other members', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      //creditToHako of bob is 200 (= 300 - 100)
      //creditToHako of carol is 300 (= 200 + 100)
      //creditToMember of bob is 100 (bob is a creditor)
      //debtToMember of carol is 100 (carol is a debtor)
      //borrowValue of carol is 0 (= 100 - 100)
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const debtToHakoOfBob = await this.hako.debtToHakoOf(bob);
      const debtToHakoOfCarol = await this.hako.debtToHakoOf(carol);
      const creditToMemberOfBob = await this.hako.creditToMemberOf(bob);
      const creditToMemberOfCarol = await this.hako.creditToMemberOf(carol);
      const debtToMemberOfBob = await this.hako.debtToMemberOf(bob);
      const debtToMemberOfCarol = await this.hako.debtToMemberOf(carol);
      const borrowValueDurationOfCarol = await this.hako.getBorrowValueDurationOf(carol);
      assert.equal(creditToHakoOfBob, 200);
      assert.equal(creditToHakoOfCarol, 300);
      assert.equal(debtToHakoOfBob, 0);
      assert.equal(debtToHakoOfCarol, 0);
      assert.equal(creditToMemberOfBob, 100);
      assert.equal(creditToMemberOfCarol, 0);
      assert.equal(debtToMemberOfBob, 0);
      assert.equal(debtToMemberOfCarol, 100);
      assert.equal(borrowValueDurationOfCarol[0], 0);
      assert.equal(borrowValueDurationOfCarol[1], 60);
    });

    it('should not allow non-hako member accounts to lend creditToHako to non-hako member accounts', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      //bob is not a hako member
      await utils.shouldThrow(this.hako.lendCredit(carol, 100, 60, {from: bob}));
    });

    it('should not allow hako members to lend creditToHako to non-hako member accounts', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      //bob is a hako member, but carol is not a hako member
      await utils.shouldThrow(this.hako.lendCredit(carol, 100, 60, {from: bob}));
    });

    it('should not allow hako members to lend more creditToHako than a debtor member registered', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      //borrowValue of carol is only 100
      await utils.shouldThrow(this.hako.lendCredit(carol, 300, 60, {from: bob}));
    });

    it('should not allow hako members to lend creditToHako for a less duration than a debtor member registered', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      //borrowDuration of carol is 60 second over
      await utils.shouldThrow(this.hako.lendCredit(carol, 100, 30, {from: bob}));
    });

    it('should not allow hako members to lend more creditToHako than a creditor member has', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(0, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      //bob has only 0 creditToHako
      await utils.shouldThrow(this.hako.lendCredit(carol, 100, 60, {from: bob}));
    });

    it('should not allow hako members to lend creditToHako to address(0)', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await utils.shouldThrow(this.hako.lendCredit(0, 100, 60, {from: bob}));
    });

    it('should not allow hako members to lend creditToHako to themselves', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: bob});
      //bob can't lend creditToHako to bob
      await utils.shouldThrow(this.hako.lendCredit(bob, 100, 60, {from: bob}));
    });

    it('should not allow hako members to lend creditToHako to the members who have debtToHako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(100, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      //carol has 100 debtToHako
      await utils.shouldThrow(this.hako.lendCredit(carol, 100, 60, {from: bob}));
      await this.hako.arrangement(100, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.transferCredit(dave, 300, {from: carol});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      await this.hako.withdrawToken(300, {from: dave});
      await this.hako.transfer(carol, 300, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      //carol has 100 debtToHako
      await utils.shouldThrow(this.hako.lendCredit(carol, 100, 60, {from: bob}));
    });

    it('should emit a LendCredit event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      const {logs} = 
        await this.hako.lendCredit(carol, 100, 60, {from: bob});
      const event = await expectEvent.inLogs(logs, 'LendCredit');
      const lendRecords = await this.hako.getLendRecords(1, {from: alice});
      assert.equal(event.args.from, bob);
      assert.equal(event.args.to, carol);
      assert.equal(event.args.value, 100);
      assert.equal(event.args.duration, 60);
      assert.equal(event.args.id, 1);
      lendRecords[5].should.be.bignumber.equal(event.args.time);
    });
      
  });

});
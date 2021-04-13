const { assert } = require('chai');
const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Hako = artifacts.require('./Hako.sol');
const time = require("./helpers/time");

contract.skip('Lend_c', ([alice, bob, carol, dave, ...accounts]) => {
  
  beforeEach(async function () {
    this.hako = await Hako.new(1000, 'HakoExample', 'HKEX', {from: alice});
  });

  describe('getLendRecords', () => {

    it('should get lendRecords information', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      const {logs} = 
        await this.hako.lendCredit(carol, 100, 60, {from: bob});
      const event = await expectEvent.inLogs(logs, 'LendCredit');
      const lendRecords = await this.hako.getLendRecords(1, {from: alice});
      assert.equal(lendRecords[0], 1);
      assert.equal(lendRecords[1], bob);
      assert.equal(lendRecords[2], carol);
      assert.equal(lendRecords[3], 100);
      assert.equal(lendRecords[4], 60);
      lendRecords[5].should.be.bignumber.equal(event.args.time);
      assert.equal(lendRecords[6], 1);
    });
  });

  describe('getCreditToMemberIds and getDebtToMemberIds', () => {

    it('should get creditToMemberIds and debtToMemberIds', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      const creditToMemberIdsOfBob = await this.hako.getCreditToMemberIds({from: bob});
      const debtToMemberIdsOfCarol = await this.hako.getDebtToMemberIds({from: carol});
      assert.equal(creditToMemberIdsOfBob[0], 1);
      assert.equal(debtToMemberIdsOfCarol[0], 1);
    });

    it('should get creditToMemberIds and debtToMemberIds 2', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: bob});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: dave});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.lendCredit(dave, 100, 60, {from: carol});
      await this.hako.lendCredit(bob, 100, 60, {from: dave});
      //bob lends 100 creditToHako to carol (id: 1)
      //carol lends 100 creditToHako to dave (id: 2)
      //dave lends 100 creditToHako to bob (id: 3)
      const creditToMemberIdsOfBob = await this.hako.getCreditToMemberIds({from: bob});
      const creditToMemberIdsOfCarol = await this.hako.getCreditToMemberIds({from: carol});
      const creditToMemberIdsOfDave = await this.hako.getCreditToMemberIds({from: dave});
      const debtToMemberIdsOfBob = await this.hako.getDebtToMemberIds({from: bob});
      const debtToMemberIdsOfCarol = await this.hako.getDebtToMemberIds({from: carol});
      const debtToMemberIdsOfDave = await this.hako.getDebtToMemberIds({from: dave});
      assert.equal(creditToMemberIdsOfBob[0], 1);
      assert.equal(creditToMemberIdsOfCarol[0], 2);
      assert.equal(creditToMemberIdsOfDave[0], 3);
      assert.equal(debtToMemberIdsOfBob[0], 3);
      assert.equal(debtToMemberIdsOfCarol[0], 1);
      assert.equal(debtToMemberIdsOfDave[0], 2);
    });

    it('should get creditToMemberIds and debtToMemberIds 3', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: dave});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.lendCredit(dave, 50, 60, {from: bob});
      await this.hako.lendCredit(dave, 50, 60, {from: carol});
      //bob lends 100 creditToHako to carol (id: 1)
      //bob lends 50 creditToHako to dave (id: 2)
      //carol lends 50 creditToHako to dave (id: 3)
      const creditToMemberIdsOfBob = await this.hako.getCreditToMemberIds({from: bob});
      const creditToMemberIdsOfCarol = await this.hako.getCreditToMemberIds({from: carol});
      const debtToMemberIdsOfCarol = await this.hako.getDebtToMemberIds({from: carol});
      const debtToMemberIdsOfDave = await this.hako.getDebtToMemberIds({from: dave});
      assert.equal(creditToMemberIdsOfBob[0], 1);
      assert.equal(creditToMemberIdsOfBob[1], 2);
      assert.equal(creditToMemberIdsOfCarol[0], 3);
      assert.equal(debtToMemberIdsOfCarol[0], 1);
      assert.equal(debtToMemberIdsOfDave[0], 2);
      assert.equal(debtToMemberIdsOfDave[1], 3);
    });

    it('should get creditToMemberIds and debtToMemberIds 4', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: dave});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.lendCredit(dave, 100, 60, {from: bob});
      await time.increase(time.duration.seconds(60));
      await this.hako.returnDebtTo(bob, 1, {from: carol});
      //bob lends 100 creditToHako to carol (id: 1 → return)
      //bob lends 100 creditToHako to dave (id: 2)
      const creditToMemberIdsOfBob = await this.hako.getCreditToMemberIds({from: bob});
      const debtToMemberIdsOfCarol = await this.hako.getDebtToMemberIds({from: carol});
      const debtToMemberIdsOfDave = await this.hako.getDebtToMemberIds({from: dave});
      assert.equal(creditToMemberIdsOfBob[0], 2);
      assert.equal(creditToMemberIdsOfBob[1], 0);
      assert.equal(debtToMemberIdsOfCarol[0], 0);
      assert.equal(debtToMemberIdsOfDave[0], 2);
    });

  });

});
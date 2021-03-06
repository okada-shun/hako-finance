const { assert } = require('chai');
const expectEvent = require('@openzeppelin/test-helpers/src/expectEvent');

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Hako = artifacts.require('./Hako.sol');
const time = require("@openzeppelin/test-helpers/src/time");

contract('Lend_c', ([alice, bob, carol, dave, ...accounts]) => {
  
  beforeEach(async function () {
    this.hako = await Hako.new(1000, 500, 'HakoTokenExample', 'HTE', 0, {from: alice});
  });

  describe('lendRecordOf', () => {

    it('should get lendRecord data', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowing(100, 60, {from: carol});
      const {logs} = 
        await this.hako.lendCredit(carol, 100, 60, {from: bob});
      const event = await expectEvent.inLogs(logs, 'LendCredit');
      const lendRecords = await this.hako.lendRecordOf(1, {from: alice});
      assert.equal(lendRecords[0], 1);
      assert.equal(lendRecords[1], bob);
      assert.equal(lendRecords[2], carol);
      assert.equal(lendRecords[3], 100);
      assert.equal(lendRecords[4], 60);
      lendRecords[5].toNumber().should.be.bignumber.equal(event.args.time.toNumber());
      assert.equal(lendRecords[6], 1);
    });
    
  });

  describe('lendCount', () => {

    it('should get lending count', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowing(300, 60, {from: bob});
      await this.hako.registerBorrowing(200, 60, {from: carol});
      await this.hako.registerBorrowing(100, 60, {from: dave});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.lendCredit(dave, 50, 60, {from: bob});
      await this.hako.lendCredit(dave, 50, 60, {from: carol});
      await this.hako.lendCredit(bob, 100, 60, {from: carol});
      await this.hako.lendCredit(bob, 50, 60, {from: dave});
      await this.hako.lendCredit(carol, 50, 60, {from: dave});
      const lendCount = await this.hako.lendCount();
      assert.equal(lendCount, 6);
    });
    
  });

});
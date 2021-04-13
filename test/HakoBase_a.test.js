const { assert } = require('chai');
const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');

const Hako = artifacts.require('./Hako.sol');
const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract.skip('HakoBase_a', ([alice, bob, carol, dave, ...accounts]) => {

  beforeEach(async function () {
    this.hako = await Hako.new(1000, 'HakoExample', 'HKEX', {from: alice});
  });

  it('should have correct balanceOf hako', async function () {
    const balanceOfHako = await this.hako.balanceOfHako();
    assert.equal(balanceOfHako, 0);
  });

  describe('joinHako', () => {

    it('should allow an account to join hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      //balance of bob's token is 0 (= 300 - 300)
      //balance of hako's token is 300 (= 0 + 300)
      //creditToHako of bob is 300
      //debtToBob of hako is 300 (bob's credit to hako = hako's debt to bob)
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfHako = await this.hako.balanceOfHako();
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToBobOfHako = await this.hako.debtOfHako();
      const memberCount = await this.hako.memberCount();
      const memberCheckOfBob = await this.hako.memberCheckOf(bob);
      assert.equal(balanceOfBob, 0);
      assert.equal(balanceOfHako, 300);
      assert.equal(creditToHakoOfBob, 300);
      assert.equal(debtToBobOfHako, 300);
      assert.equal(memberCount, 1);
      assert.equal(memberCheckOfBob, 1);
    });

    it('should allow multiple accounts to join hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      //balance of hako's token is 600 (= 0 + 300 + 200 + 100)
      //creditToHako of bob is 300
      //creditToHako of carol is 200
      //creditToHako of dave is 100
      //debtToMembers of hako is 600 (= 300 + 200 + 100)
      //hako's debt to members = bob's, carol's, dave's (members') credit to hako
      const balanceOfHako = await this.hako.balanceOfHako();
      const debtToMembersOfHako = await this.hako.debtOfHako();
      const memberCount = await this.hako.memberCount();
      const memberCheckOfBob = await this.hako.memberCheckOf(bob);
      const memberCheckOfCarol = await this.hako.memberCheckOf(carol);
      const memberCheckOfDave = await this.hako.memberCheckOf(dave);
      assert.equal(balanceOfHako, 600);
      assert.equal(debtToMembersOfHako, 600);
      assert.equal(memberCount, 3);
      assert.equal(memberCheckOfBob, 1);
      assert.equal(memberCheckOfCarol, 1);
      assert.equal(memberCheckOfDave, 1);
    });

    it('should not allow hako members to join hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      //bob has already been a hako member
      await utils.shouldThrow(this.hako.joinHako(300, {from: bob}));  
    });

    it('should not allow accounts to deposit more token than they have when joining hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice}); 
      //bob has only 300 token  
      await utils.shouldThrow(this.hako.joinHako(400, {from: bob}));
    });

    it('should emit a JoinHako event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      const {logs} = 
        await this.hako.joinHako(300, {from: bob});
      const event = await expectEvent.inLogs(logs, 'JoinHako');
      assert.equal(event.args.newMember, bob);
      assert.equal(event.args.value, 300);
    });
  
  });

  describe('leaveHako', () => {

    it('should allow a hako member to leave hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.leaveHako({from: bob});
      //balance of bob's token is 300 (= 300 - 300 + 300)
      //balance of hako's token is 0 (= 0 + 300 - 300)
      //creditToHako of bob is 0 (= 300 - 300)
      //debtToBob of hako is 0 (bob's credit to hako = hako's debt to bob)
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfHako = await this.hako.balanceOfHako();
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const debtToBobOfHako = await this.hako.debtOfHako();
      const memberCount = await this.hako.memberCount();
      const memberCheckOfBob = await this.hako.memberCheckOf(bob);
      assert.equal(balanceOfBob, 300);
      assert.equal(balanceOfHako, 0);
      assert.equal(creditToHakoOfBob, 0);
      assert.equal(debtToBobOfHako, 0);
      assert.equal(memberCount, 0);
      assert.equal(memberCheckOfBob, 0);
    });

    it('should allow multiple hako members to leave hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      //bob and carol leave hako
      await this.hako.leaveHako({from: bob});
      await this.hako.leaveHako({from: carol});
      //balance of bob's token is 300 (= 300 - 300 + 300)
      //balance of carol's token is 200 (= 200 - 200 + 200)
      //balance of dave's token is 0 (bob does not leave hako)
      //balance of hako's token is 100 (= 600 - 300 - 200)
      //creditToHako of bob is 0 (= 300 - 300)
      //creditToHako of carol is 0 (= 200 - 200)
      //creditToHako of dave is 100
      //debtToMembers of hako is 100 (= 0 + 0 + 100)
      //hako's debt to members = bob's, carol's, dave's (members') credit to hako
      const balanceOfBob = await this.hako.balanceOf(bob);
      const balanceOfCarol = await this.hako.balanceOf(carol);
      const balanceOfDave = await this.hako.balanceOf(dave);
      const balanceOfHako = await this.hako.balanceOfHako();
      const creditToHakoOfBob = await this.hako.creditToHakoOf(bob);
      const creditToHakoOfCarol = await this.hako.creditToHakoOf(carol);
      const creditToHakoOfDave = await this.hako.creditToHakoOf(dave);
      const debtToMembersOfHako = await this.hako.debtOfHako();
      const memberCount = await this.hako.memberCount();
      const memberCheckOfBob = await this.hako.memberCheckOf(bob);
      const memberCheckOfCarol = await this.hako.memberCheckOf(carol);
      const memberCheckOfDave = await this.hako.memberCheckOf(dave);
      assert.equal(balanceOfBob, 300);
      assert.equal(balanceOfCarol, 200);
      assert.equal(balanceOfDave, 0);
      assert.equal(balanceOfHako, 100);
      assert.equal(creditToHakoOfBob, 0);
      assert.equal(creditToHakoOfCarol, 0);
      assert.equal(creditToHakoOfDave, 100);
      assert.equal(debtToMembersOfHako, 100);
      assert.equal(memberCount, 1);
      assert.equal(memberCheckOfBob, 0);
      assert.equal(memberCheckOfCarol, 0);
      assert.equal(memberCheckOfDave, 1);
    });

    it('should not allow non-hako member accounts to leave hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(100, {from: bob});
      //carol is not a hako member
      await utils.shouldThrow(this.hako.leaveHako({from: carol}));
      await this.hako.leaveHako({from: bob});
      //bob left hako, so he is not a hako member
      await utils.shouldThrow(this.hako.leaveHako({from: bob}));
    });

    it('should not allow hako members who have debtToHako to leave hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.creditCreationByMember(100, {from: carol});
      //carol has 100 debtToHako
      await utils.shouldThrow(this.hako.leaveHako({from: carol}));
      await this.hako.arrangement(100, {from: carol});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      await this.hako.transferCredit(dave, 300, {from: carol});
      await time.increase(time.duration.seconds(60));
      await this.hako.collectDebtFrom(carol, 1, {from: bob});
      //carol has 100 debtToHako
      await utils.shouldThrow(this.hako.leaveHako({from: carol}));
    });

    it('should not allow hako members who have debtToMember to leave hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      //carol has 100 debtToMember(= debt to bob)
      await utils.shouldThrow(this.hako.leaveHako({from: carol}));
    });

    it('should not allow hako members who have creditToMember to leave hako', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      await this.hako.joinHako(200, {from: carol});
      await this.hako.joinHako(100, {from: dave});
      await this.hako.registerBorrowValueDuration(100, 60, {from: carol});
      await this.hako.lendCredit(carol, 100, 60, {from: bob});
      //bob has 100 creditToMember(= credit to carol)
      await utils.shouldThrow(this.hako.leaveHako({from: bob}));
    });

    it('should emit a LeaveHako event', async function () {
      await this.hako.transfer(bob, 300, {from: alice});
      await this.hako.transfer(carol, 200, {from: alice});
      await this.hako.transfer(dave, 100, {from: alice});
      await this.hako.joinHako(300, {from: bob});
      const {logs} = 
        await this.hako.leaveHako({from: bob});
      const event = await expectEvent.inLogs(logs, 'LeaveHako');
      assert.equal(event.args.member, bob);
    });

  });

});
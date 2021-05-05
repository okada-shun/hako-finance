var hakoAddress;
var hako;
var userAccount;
async function startApp() {
  hakoAddress = "0xc00523a058de5fdebf17ff735d29368e7c9ae114";
  hako = new web3.eth.Contract(hakoABI, hakoAddress);
  userAccount = await web3.eth.getCoinbase();
  appVM.hakoData.hakoAddress = hakoAddress;
  appVM.displayHakoInfo();
  appVM.userData.userAccount = userAccount;
  appVM.displayUserInfo();
}

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(window.ethereum);
    console.log('web3 created!');
  } else {
    alert('install wallet!');
    console.log('install wallet!');
  }
  startApp();
});

var appVM = new Vue({
  el: '#app',
  data: {
    active: 0,
    items: [
      'Hako Information',
      'User Information',
      'Transactions'
    ],
    hakoData: {
      hakoAddress: '',
      totalSupply: '',
      balanceOfHako: '',
      creditOfHako: '',
      debtOfHako: '',
      memberCount: ''
    },
    userData: {
      userAccount: '',
      balanceOfUser: '',
      memberOrNot: '',
      memberCheckOfUser: '',
      creditToHakoOfUser: '',
      debtToHakoOfUser: '',
      creditToMemberOfUser: '',
      debtToMemberOfUser: '',
      netAssetsOfUser: '',
      borrowValueDurationOfUser: '',
      valueDuration: {
        value: '',
        duration: ''
      }
    }
  },
  methods: {
    activate: function(index) {
      this.active = index;
    },
    displayHakoInfo: async function() {
      this.hakoData.totalSupply = await hako.methods.totalSupply().call();
      this.hakoData.balanceOfHako = await hako.methods.balanceOfHako().call();
      this.hakoData.creditOfHako = await hako.methods.creditOfHako().call();
      this.hakoData.debtOfHako = await hako.methods.debtOfHako().call();
      this.hakoData.memberCount = await hako.methods.memberCount().call();
    },
    displayUserInfo: async function() {
      this.userData.balanceOfUser = await hako.methods.balanceOf(userAccount).call();
      this.userData.memberOrNot = await hako.methods.memberCheckOf(userAccount).call();
      await this.memberCheck();
      this.userData.creditToHakoOfUser = await hako.methods.creditToHakoOf(userAccount).call();
      this.userData.debtToHakoOfUser = await hako.methods.debtToHakoOf(userAccount).call();
      this.userData.creditToMemberOfUser = await hako.methods.creditToMemberOf(userAccount).call();
      this.userData.debtToMemberOfUser = await hako.methods.debtToMemberOf(userAccount).call();
      this.userData.netAssetsOfUser = Number(this.userData.balanceOfUser) + Number(this.userData.creditToHakoOfUser)
        - Number(this.userData.debtToHakoOfUser) + Number(this.userData.creditToMemberOfUser) - Number(this.userData.debtToMemberOfUser);
      this.userData.borrowValueDurationOfUser = await hako.methods.getBorrowValueDurationOf(userAccount).call();
      this.userData.valueDuration.value = this.userData.borrowValueDurationOfUser['0'];
      this.userData.valueDuration.duration = this.userData.borrowValueDurationOfUser['1'];
    },
    memberCheck: async function() {
      if (this.userData.memberOrNot === '1') {
        this.userData.memberCheckOfUser = 'You are a Hako Member!';
      } else {
        this.userData.memberCheckOfUser = 'You are NOT a Hako Member!';
      }
    }
  },
  computed: {
    isMember() {
      return this.userData.memberOrNot === '1';
    },
    haveNotDebtToHako() {
      return this.userData.debtToHakoOfUser === '0';
    },
    haveNotDebtToMember() {
      return this.userData.debtToMemberOfUser === '0';
    },
    haveNotCreditToMember() {
      return this.userData.creditToMemberOfUser === '0';
    },
    haveToken() {
      return this.userData.balanceOfUser !== '0';
    },
    haveCredit() {
      return this.userData.creditToHakoOfUser !== '0';
    },
    havePlusNetAssets() {
      return this.userData.netAssetsOfUser > 0;
    }
  }
});
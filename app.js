'use strict';
const dateSpan = document.getElementById('date');
const movementContainer = document.querySelector('.movement');
const totalMoney = document.getElementById('totalMoney');
const income = document.getElementById('income');
const outcome = document.getElementById('outcome');
const interest = document.getElementById('interest');
const loginBtn = document.getElementById('loginBtn');
let userInput = document.getElementById('user');
let pinInput = document.getElementById('pin');
const welcomeLabel = document.getElementById('welcome');
const main = document.querySelector('main');

const textInputTransfer = document.getElementById('textInputTransfer');
const numInputTransfer = document.getElementById('numInputTransfer');
const btnTransfer = document.getElementById('btnTransfer');

const numInputLoan = document.getElementById('numInputLoan');
const btnLoan = document.getElementById('btnLoan');

const textInputClose = document.getElementById('textInputClose');
const numInputClose = document.getElementById('numInputClose');
const btnClose = document.getElementById('btnClose');
const btnSort = document.getElementById('btnSort');
//! accounts
const account1 = {
  owner: 'Alireza Mahmoodi',
  movement: [200, 340, -85, 1247, 2563, -96, 58, -5874],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};
const account2 = {
  owner: 'Sarah Davis',
  movement: [254, 658, 658, 5478, 125, -3654, 874, -2],
  interestRate: 1,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};
const account3 = {
  owner: 'Yanis leonard',
  movement: [124, -1234, -5265, 3654, 8547, 2224, -1203, -1000],
  interestRate: 0.5,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};
const account4 = {
  owner: 'Mike James',
  movement: [3540, 5000, -6200, 6540, 1452, 1247, 2541, -241],
  interestRate: 0.7,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const accounts = [account1, account2, account3, account4];

//! logic
setInterval(todayTime, 1000);
function todayTime() {
  let today = moment().format('DD/MM/YYYY ,HH:mm');
  dateSpan.textContent = today;
}

function showMovement(acc, sort = false) {
  movementContainer.innerHTML = '';
  const movs = sort ? acc.movement.slice().sort((a, b) => a - b) : acc.movement;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'Deposite' : 'Witdraw';

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
    const html = `
    <li class="movementRow">
          <div class="movementType movementType${type}">${i + 1} ${type}</div>
          <div class="movementDate">${displayDate}</div>
          <div class="movementValue">${mov.toFixed(2)}</div>
        </li>
    `;

    movementContainer.insertAdjacentHTML('afterbegin', html);
  });
}
//! balance
const showBalance = function (movement) {
  const balance = movement.reduce((acc, mov) => acc + mov);
  totalMoney.textContent = `${balance.toFixed(2)}`;
};

//! Summary
function calcSummary(acc) {
  const incomes = acc.movement
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  income.innerHTML = `${incomes.toFixed(2)}$`;

  const outcomes = acc.movement
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  outcome.innerHTML = `${Math.abs(outcomes).toFixed(2)}$`;

  const interests = acc.movement
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  interest.innerHTML = `${interests.toFixed(2)}$`;
}
//! Account user maker

const creatUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatUsername(accounts);

//! Upadte UI
function updateUI(acc) {
  // Display movement
  showMovement(acc);
  // Display balance
  showBalance(acc.movement);
  // Display summary
  calcSummary(acc);
}

//! Select diffrent accounts
let currentAccount;
loginBtn.addEventListener('click', function () {
  currentAccount = accounts.find(acc => acc.username === userInput.value);
  if (currentAccount?.pin === Number(pinInput.value)) {
    welcomeLabel.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    main.style.opacity = 100;
    // Clear fields
    userInput.value = pinInput.value = '';
    updateUI(currentAccount);
  }
});

//! Transfer part
btnTransfer.addEventListener('click', function () {
  const amount = Number(numInputTransfer.value);
  const receiverAccount = accounts.find(
    acc => acc.username === textInputTransfer.value
  );

  if (
    amount > 0 &&
    Number(totalMoney.textContent) >= amount &&
    receiverAccount.username !== currentAccount.username &&
    receiverAccount
  ) {
    currentAccount.movement.push(-amount);
    receiverAccount.movement.push(amount);

    // adding date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    // Update
    updateUI(currentAccount);
  }
  numInputTransfer.value = textInputTransfer.value = '';
});
// ! Clsoe
btnClose.addEventListener('click', function () {
  if (
    textInputClose.value === currentAccount.username &&
    Number(numInputClose.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete acc
    accounts.splice(index, 1);
    // Hide acc
    main.style.opacity = 0;
  }

  numInputClose.value = textInputClose.value = '';
});

//! loan PART

btnLoan.addEventListener('click', function () {
  const amount = Math.floor(numInputLoan.value);

  if (amount > 0 && currentAccount.movement.some(mov => mov >= amount * 0.1)) {
    // Adding amount
    currentAccount.movement.push(amount);
    // Adding date
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update
    updateUI(currentAccount);
    // Clear
    numInputLoan.value = '';
  }
});

//! Sorting movements
let sorted = false;
btnSort.addEventListener('click', function () {
  showMovement(currentAccount, !sorted);
  sorted = !sorted;
});

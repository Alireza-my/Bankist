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
const textInputLoan = document.getElementById('textInputLoan');
const btnLoan = document.getElementById('btnLoan');
const textInputClose = document.getElementById('textInputClose');
const numInputClose = document.getElementById('numInputClose');
const btnClose = document.getElementById('btnClose');
//! accounts
const account1 = {
  owner: 'Alireza Mahmoodi',
  movement: [200, 340, -85, -9654, 145, 1247, 2563, -96, 58, -5874, 65],
  interestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: 'Sarah Davis',
  movement: [-45, -859, 325, -987, 254, 658, 658, 5478, 125, -3654, 874, -2],
  interestRate: 1,
  pin: 2222,
};
const account3 = {
  owner: 'Yanis leonard',
  movement: [124, -1234, -5265, 3654, 8547, 2224, -1203, -1000, -2000, 4500],
  interestRate: 0.5,
  pin: 3333,
};
const account4 = {
  owner: 'Mike James',
  movement: [3540, 5000, -6200, 6540, 1452, 1247, 2541, -241, 253, -658, -950],
  interestRate: 0.7,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//! logic
setInterval(todayTime, 1000);
function todayTime() {
  let today = moment().format('DD/MM/YYYY ,HH:mm');
  dateSpan.textContent = today;
}

function showMovement(movement) {
  movementContainer.innerHTML = '';

  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'Deposite' : 'Witdraw';

    const html = `
    <li class="movementRow">
          <div class="movementType movementType${type}">${i + 1} ${type}</div>
          <div class="movementDate">10/12/1222</div>
          <div class="movementValue">${mov}</div>
        </li>
    `;

    movementContainer.insertAdjacentHTML('afterbegin', html);
  });
}
//! balance
const showBalance = function (movement) {
  const balance = movement.reduce((acc, mov) => acc + mov);
  totalMoney.textContent = `${balance}`;
};

//! Summary
function calcSummary(acc) {
  const incomes = acc.movement
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  income.innerHTML = `${incomes}$`;

  const outcomes = acc.movement
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  outcome.innerHTML = `${Math.abs(outcomes)}$`;

  const interests = acc.movement
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  interest.innerHTML = `${interests}$`;
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
  showMovement(acc.movement);
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
    // Update
    updateUI(currentAccount);
  }
  numInputTransfer.value = textInputTransfer.value = '';
});

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

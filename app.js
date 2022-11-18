const dateSpan = document.getElementById('date');
const movementContainer = document.querySelector('.movement');
const totalMoney = document.getElementById('totalMoney');

// accounts
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
  pin: 222,
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

// logic
setInterval(todayTime, 1000);
function todayTime() {
  let today = moment().format('DD/MM/YYYY ,HH:mm');
  dateSpan.textContent = today;
}

// record
let acc1 = [200, -350, 1452, -6523, -3526, 1254, -524, 3658, 69875, 123];

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

  // balance
  const showBalance = function (movement) {
    const balance = movement.reduce((acc, mov) => acc + mov);
    totalMoney.textContent = `${balance} $`;
  };
  showBalance(acc1);
}
showMovement(acc1);

// Account user maker

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

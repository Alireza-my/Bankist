const dateSpan = document.getElementById('date');
const movementContainer = document.querySelector('.movement');

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
}

showMovement(acc1);

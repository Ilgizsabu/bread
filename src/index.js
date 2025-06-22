/* eslint-disable import/no-extraneous-dependencies */
import './index.css';
import 'mini.css/dist/mini-default.min.css';

const tableBody = document.querySelector('.table__body');
const userKey = '81ff8c71311953bcfae63018a5943092';

function populateTable() {
  fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${userKey}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates;
      tableBody.textContent = '';

      Object.entries(rate).forEach(([currency, value]) => {
        const row = document.createElement('tr');
        const cellCurrency = document.createElement('td');

        cellCurrency.textContent = currency;
        row.appendChild(cellCurrency);

        const cellRate = document.createElement('td');
        cellRate.textContent = value;
        row.appendChild(cellRate);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(`Ошибка (${error.message})`);
    });
}

populateTable();

setInterval(() => { populateTable(); }, 60000);

const ctx = document.getElementById('myChart');
const chartData = {
  labels: ['Expense 1', 'Expense 2', 'Expense 3', 'Expense 4', 'Deez Nuts'],
  data: [12, 19, 3, 5, 2, 3],
  borderWidth: 1 
  };

new Chart(ctx, 
  {
    type: 'doughnut',
    data: 
    {
      labels: chartData.labels,
      datasets: 
      [
        {
          label: '$ Value',
          data: chartData.data,
          borderWidth: chartData.borderWidth 
        }
      ]
    },

    options: 
    {
      borderWidth: 10,
      borderRaidus: 6,
      hoverBorderWidth: 0, 
      plugins:
      {
        legend: 
        {
          display: false,
        }
      }
    }
  }
  );
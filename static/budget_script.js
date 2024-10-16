

const ctx = document.getElementById('myChart');


new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Left'],
      datasets: [{
        label: '$ Value',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1 
      }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,  
        scales: {
            y: {
                beginAtZero: true
            }
      }
    }
  });
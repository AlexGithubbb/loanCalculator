// Listen to submit
document.querySelector('#loan-form').addEventListener('submit', function(e){

  // Hide the results
  document.getElementById('results').style.display = 'none';
  // show the loading sign
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});



function calculateResults(){
  // console.log('calculating');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  // principal (本金)
  const principal = parseFloat(amount.value);
  const calcaulatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedMonths = parseFloat(years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calcaulatedInterest, calculatedMonths);
  const monthly = (principal*x*calcaulatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedMonths).toFixed(2);
    totalInterest.value = ((monthly*calculatedMonths) - principal).toFixed(2);
    // Show the results
    document.getElementById('results').style.display = 'block';
    // Hide loading
    document.getElementById('loading').style.display = 'none';
  }else{
    const text = 'Please check your number'
    showError(text);
  }

}

function showError(error){
  // Hide the results
  // document.getElementById('results').style.display = 'none';
  // Hide the loading sign
  document.getElementById('loading').style.display = 'none';
  // Create a div
  const errDiv = document.createElement('div');
  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add class
  errDiv.className = 'alert alert-danger';
  // Create text node and append into error div
  errDiv.appendChild(document.createTextNode(error));
  // Insert error div about heading in form
  card.insertBefore(errDiv, heading);

  // Clear Error after 3 seconds
  setTimeout(clearError, 2000);

  // console.log(errDiv);
  // document.querySelector('#loan-form')
}
// Remove the error
function clearError(){
  document.querySelector('.alert').remove();
}
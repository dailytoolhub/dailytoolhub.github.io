function validateInput(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    const value = input.value.trim();
    
    if (!value || isNaN(parseFloat(value)) {
        input.classList.add('error');
        if (error) error.classList.add('visible');
        return false;
    }
    
    input.classList.remove('error');
    if (error) error.classList.remove('visible');
    return true;
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('visible');
}

function formatCurrency(amount) {
    return '₹' + amount.toFixed(2);
}

function addGST() {
    const amountInput = document.getElementById('amount');
    const gstInput = document.getElementById('gst');
    const resultDiv = document.getElementById('result');
    
    if (!amountInput.value) {
        amountInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter an amount';
        return;
    }
    
    const amount = parseFloat(amountInput.value);
    const gst = parseFloat(gstInput.value);
    
    if (isNaN(amount)) {
        amountInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter a valid amount';
        return;
    }
    
    amountInput.classList.remove('error');
    const tax = amount * gst / 100;
    const total = amount + tax;
    
    resultDiv.innerHTML = 'GST Amount: ' + formatCurrency(tax) + '<br>Total: ' + formatCurrency(total);
}

function removeGST() {
    const amountInput = document.getElementById('amount');
    const gstInput = document.getElementById('gst');
    const resultDiv = document.getElementById('result');
    
    if (!amountInput.value) {
        amountInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter an amount';
        return;
    }
    
    const amount = parseFloat(amountInput.value);
    const gst = parseFloat(gstInput.value);
    
    if (isNaN(amount)) {
        amountInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter a valid amount';
        return;
    }
    
    amountInput.classList.remove('error');
    const base = amount / (1 + gst / 100);
    const tax = amount - base;
    
    resultDiv.innerHTML = 'Base Amount: ' + formatCurrency(base) + '<br>GST Included: ' + formatCurrency(tax);
}

function calculateBMI() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultDiv = document.getElementById('result');
    
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    if (isNaN(weight) || isNaN(height) || height <= 0) {
        if (isNaN(weight) || !weightInput.value) weightInput.classList.add('error');
        if (isNaN(height) || !heightInput.value) heightInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter valid weight and height';
        return;
    }
    
    weightInput.classList.remove('error');
    heightInput.classList.remove('error');
    
    const meter = height / 100;
    const bmi = weight / (meter * meter);
    
    let status = '';
    let color = '';
    
    if (bmi < 18.5) {
        status = 'Underweight';
        color = '#ffc107';
    } else if (bmi < 25) {
        status = 'Normal Weight';
        color = '#198754';
    } else if (bmi < 30) {
        status = 'Overweight';
        color = '#fd7e14';
    } else {
        status = 'Obesity';
        color = '#dc3545';
    }
    
    resultDiv.innerHTML = 'BMI: ' + bmi.toFixed(2) + '<br>Category: <span style="color:' + color + '">' + status + '</span>';
}

function calculateEMI() {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const resultDiv = document.getElementById('result');
    
    const P = parseFloat(amountInput.value);
    const annualRate = parseFloat(rateInput.value);
    const years = parseFloat(yearsInput.value);
    
    if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
        if (isNaN(P) || !amountInput.value) amountInput.classList.add('error');
        if (isNaN(rateInput) || !rateInput.value) rateInput.classList.add('error');
        if (isNaN(years) || !yearsInput.value) yearsInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter valid values';
        return;
    }
    
    amountInput.classList.remove('error');
    rateInput.classList.remove('error');
    yearsInput.classList.remove('error');
    
    const r = annualRate / 12 / 100;
    const n = years * 12;
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    
    resultDiv.innerHTML = 'Monthly EMI: ' + formatCurrency(emi) + '<br>Total Interest: ' + formatCurrency(totalInterest) + '<br>Total Payment: ' + formatCurrency(totalPayment);
}

function calculateDiscount() {
    const priceInput = document.getElementById('price');
    const discountInput = document.getElementById('discount');
    const resultDiv = document.getElementById('result');
    
    const price = parseFloat(priceInput.value);
    const discount = parseFloat(discountInput.value);
    
    if (isNaN(price) || isNaN(discount)) {
        if (isNaN(price) || !priceInput.value) priceInput.classList.add('error');
        if (isNaN(discount) || !discountInput.value) discountInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter valid values';
        return;
    }
    
    priceInput.classList.remove('error');
    discountInput.classList.remove('error');
    
    const savings = (price * discount) / 100;
    const finalPrice = price - savings;
    
    resultDiv.innerHTML = 'Discount Amount: ' + formatCurrency(savings) + '<br>Final Price: ' + formatCurrency(finalPrice);
}

function calculateAge() {
    const dobInput = document.getElementById('dob');
    const resultDiv = document.getElementById('result');
    const dob = dobInput.value;
    
    if (!dob) {
        dobInput.classList.add('error');
        resultDiv.innerHTML = 'Please select your date of birth';
        return;
    }
    
    dobInput.classList.remove('error');
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    resultDiv.innerHTML = years + ' Years<br>' + months + ' Months<br>' + days + ' Days';
}

function calculateSIP() {
    const monthlyInput = document.getElementById('monthly');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const resultDiv = document.getElementById('result');
    
    const monthly = parseFloat(monthlyInput.value);
    const annualRate = parseFloat(rateInput.value);
    const years = parseFloat(yearsInput.value);
    
    if (isNaN(monthly) || isNaN(annualRate) || isNaN(years)) {
        if (isNaN(monthly) || !monthlyInput.value) monthlyInput.classList.add('error');
        if (isNaN(annualRate) || !rateInput.value) rateInput.classList.add('error');
        if (isNaN(years) || !yearsInput.value) yearsInput.classList.add('error');
        resultDiv.innerHTML = 'Please enter valid values';
        return;
    }
    
    monthlyInput.classList.remove('error');
    rateInput.classList.remove('error');
    yearsInput.classList.remove('error');
    
    const r = annualRate / 12 / 100;
    const n = years * 12;
    
    const futureValue = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthly * n;
    const wealth = futureValue - invested;
    
    resultDiv.innerHTML = 'Total Invested: ' + formatCurrency(invested) + '<br>Estimated Returns: ' + formatCurrency(wealth) + '<br>Final Value: ' + formatCurrency(futureValue);
}

function calculatePercent() {
    const numInput = document.getElementById('number');
    const percInput = document.getElementById('percent');
    const resultDiv = document.getElementById('result');
    
    const num = parseFloat(numInput.value);
    const perc = parseFloat(percInput.value);
    
    if (isNaN(num) || isNaN(perc)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const res = (num * perc) / 100;
    resultDiv.innerHTML = perc + '% of ' + num + ' = ' + res.toFixed(2);
}

function calculatePercentOf() {
    const percInput = document.getElementById('percent2');
    const totalInput = document.getElementById('total');
    const resultDiv = document.getElementById('result2');
    
    const perc = parseFloat(percInput.value);
    const total = parseFloat(totalInput.value);
    
    if (isNaN(perc) || isNaN(total)) {
        resultDiv.innerHTML = 'Please enter valid numbers';
        return;
    }
    
    const res = (perc * total) / 100;
    resultDiv.innerHTML = perc + '% of ' + total + ' = ' + res.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});
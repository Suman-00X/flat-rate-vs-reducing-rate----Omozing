function calculateEMI() {
    const principal = parseFloat(document.getElementById('principal').value);
    const fixedRate = parseFloat(document.getElementById('fixedRate').value) / 100;
    const reducingRate = parseFloat(document.getElementById('reducingRate').value) / 100;
    const tenure = parseInt(document.getElementById('tenure').value);
    const emiStartDate = new Date(document.getElementById('emiStartDate').value);

    // Function to format date to dd/mm/yyyy
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Variables to store total payments and interest
    let totalEMIFlat = 0;
    let totalInterestFlat = 0;
    let totalEMIReducing = 0;
    let totalInterestReducing = 0;

    // Calculate flat rate EMI (monthly)
    const flatInterest = principal * fixedRate * tenure;
    const flatEMI = (principal + flatInterest) / tenure;
    const flatRateTable = document.getElementById('flatRateTable').getElementsByTagName('tbody')[0];
    flatRateTable.innerHTML = '';

    let flatRemainingPrincipal = principal;
    for (let i = 1; i <= tenure; i++) {
        const row = flatRateTable.insertRow();
        const dateOfPayment = new Date(emiStartDate);
        dateOfPayment.setMonth(emiStartDate.getMonth() + i - 1);

        const interest = flatInterest / tenure;
        const principalRepaid = flatEMI - interest;
        flatRemainingPrincipal -= principalRepaid;

        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = formatDate(dateOfPayment);
        row.insertCell(2).textContent = flatEMI.toFixed(0);
        row.insertCell(3).textContent = principalRepaid.toFixed(0);
        row.insertCell(4).textContent = interest.toFixed(0);
        row.insertCell(5).textContent = flatRemainingPrincipal.toFixed(0);

        totalEMIFlat += flatEMI;
        totalInterestFlat += interest;
        console.log("total flat interest : ",totalInterestFlat)
    }

    // Calculate reducing rate EMI (monthly)
    const reducingRateTable = document.getElementById('reducingRateTable').getElementsByTagName('tbody')[0];
    reducingRateTable.innerHTML = '';

    let outstandingPrincipal = principal;
    const reducingEMI = (principal * reducingRate * Math.pow(1 + reducingRate, tenure)) / (Math.pow(1 + reducingRate, tenure) - 1);

    for (let i = 1; i <= tenure; i++) {
        const row = reducingRateTable.insertRow();
        const dateOfPayment = new Date(emiStartDate);
        dateOfPayment.setMonth(emiStartDate.getMonth() + i - 1);

        const interest = outstandingPrincipal * reducingRate;
        const principalRepaid = reducingEMI - interest;
        outstandingPrincipal -= principalRepaid;

        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = formatDate(dateOfPayment);
        row.insertCell(2).textContent = reducingEMI.toFixed(0);
        row.insertCell(3).textContent = principalRepaid.toFixed(0);
        row.insertCell(4).textContent = interest.toFixed(0);
        row.insertCell(5).textContent = outstandingPrincipal.toFixed(0);

        totalEMIReducing += reducingEMI;
        totalInterestReducing += interest;
    }

    // Populate the comparison table
    document.getElementById('flatEMIPerMonth').textContent = flatEMI.toFixed(0);
    document.getElementById('totalInterestFlat').textContent = totalInterestFlat.toFixed(0);
    document.getElementById('totalAmountFlat').textContent = (totalEMIFlat).toFixed(0);

    document.getElementById('reducingEMIPerMonth').textContent = reducingEMI.toFixed(0);
    document.getElementById('totalInterestReducing').textContent = totalInterestReducing.toFixed(0);
    document.getElementById('totalAmountReducing').textContent = (totalEMIReducing).toFixed(0);
}

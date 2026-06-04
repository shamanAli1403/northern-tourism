/* 
    Explore Northern Pakistan - Booking Script
    Handles: Dropdown population, Cost Calculation, Form Validation
    Updated: Distance-based dynamic pricing with multi-city pick-up
*/

document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('starting-city');
    const destSelect = document.getElementById('destination');
    const packSelect = document.getElementById('package');
    const transSelect = document.getElementById('transport');
    const travelersInput = document.getElementById('travelers');
    const bookingForm = document.getElementById('booking-form');

    const summaryRate = document.getElementById('summary-rate');
    const summaryTravelers = document.getElementById('summary-travelers');
    const summaryDistance = document.getElementById('summary-distance');
    const summaryTransport = document.getElementById('summary-transport');
    const summaryTotal = document.getElementById('summary-total');

    // Populate Dropdowns
    tourismData.startingCities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.id;
        opt.textContent = city.name;
        citySelect.appendChild(opt);
    });

    tourismData.destinations.forEach(dest => {
        const opt = document.createElement('option');
        opt.value = dest.id;
        opt.textContent = dest.name;
        destSelect.appendChild(opt);
    });

    tourismData.packages.forEach(pack => {
        const opt = document.createElement('option');
        opt.value = pack.id;
        opt.textContent = pack.name;
        packSelect.appendChild(opt);
    });

    tourismData.transport.forEach(trans => {
        const opt = document.createElement('option');
        opt.value = trans.id;
        opt.textContent = `${trans.type} (Rs. ${trans.ratePerKm}/km)`;
        transSelect.appendChild(opt);
    });

    // Check URL parameters for pre-selection
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('dest')) destSelect.value = urlParams.get('dest');
    if (urlParams.has('package')) packSelect.value = urlParams.get('package');

    // Calculation Logic
    function calculateCost() {
        const selectedCityId = citySelect.value;
        const selectedDestId = destSelect.value;
        const selectedPackageId = packSelect.value;
        const selectedTransId = transSelect.value;
        const travelers = parseInt(travelersInput.value) || 0;
        
        const city = tourismData.startingCities.find(c => c.id === selectedCityId);
        const dest = tourismData.destinations.find(d => d.id === selectedDestId);
        const pack = tourismData.packages.find(p => p.id === selectedPackageId);
        const trans = tourismData.transport.find(t => t.id === selectedTransId);

        const stayRate = pack ? pack.price : 0;
        const stayTotal = stayRate * travelers;

        const cityDist = city ? city.baseDistance : 0;
        const destDist = dest ? dest.numericDistance : 0;
        const oneWayDistance = cityDist + destDist;
        const totalDistance = oneWayDistance * 2; // Round trip
        
        const transRate = trans ? trans.ratePerKm : 0;
        const transTotal = totalDistance * transRate;

        const grandTotal = stayTotal + transTotal;

        summaryRate.textContent = `Rs. ${stayRate.toLocaleString()}`;
        summaryTravelers.textContent = travelers;
        summaryDistance.textContent = `${totalDistance.toLocaleString()} km`;
        summaryTransport.textContent = `Rs. ${transTotal.toLocaleString()}`;
        summaryTotal.textContent = `Rs. ${grandTotal.toLocaleString()}`;
    }

    citySelect.addEventListener('change', calculateCost);
    destSelect.addEventListener('change', calculateCost);
    packSelect.addEventListener('change', calculateCost);
    transSelect.addEventListener('change', calculateCost);
    travelersInput.addEventListener('input', calculateCost);

    // Form Validation & Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const cnic = document.getElementById('cnic').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const pickCity = citySelect.options[citySelect.selectedIndex].text;
        const dest = destSelect.options[destSelect.selectedIndex].text;
        const pack = packSelect.options[packSelect.selectedIndex].text;
        const trans = transSelect.options[transSelect.selectedIndex].text;
        const travelers = travelersInput.value;
        const distance = summaryDistance.textContent;
        const transCost = summaryTransport.textContent;
        const stayCost = summaryRate.textContent;
        const date = document.getElementById('date').value;
        const notes = document.getElementById('notes').value;
        const total = summaryTotal.textContent;

        // Identification Validation (Accepts CNIC or Passport)
        const idValue = document.getElementById('cnic').value;
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        // Basic check: if it's not a CNIC, assume it's a passport (at least 6 chars)
        if (!cnicRegex.test(idValue) && idValue.length < 6) {
            alert('Please enter a valid CNIC (xxxxx-xxxxxxx-x) or Passport Number.');
            return;
        }

        // Prepare WhatsApp Message
        const whatsappNumber = '923019413918';
        const message = `*New Booking Request - Explore North*%0A%0A` +
            `*Name:* ${name}%0A` +
            `*ID (CNIC/Pass):* ${idValue}%0A` +
            `*Email:* ${email}%0A` +
            `*Phone:* ${phone}%0A%0A` +
            `*Trip Details:*%0A` +
            `*Pick-up City:* ${pickCity}%0A` +
            `*Destination:* ${dest}%0A` +
            `*Package:* ${pack} (${stayCost}/person)%0A` +
            `*Transport:* ${trans}%0A` +
            `*Total Distance:* ${distance}%0A` +
            `*Travelers:* ${travelers}%0A` +
            `*Travel Date:* ${date}%0A%0A` +
            `*Cost Breakdown:*%0A` +
            `*Stay Total:* Rs. ${(parseInt(stayCost.replace(/\D/g,'')) * travelers).toLocaleString()}%0A` +
            `*Transport Total:* ${transCost}%0A` +
            `*Total Amount:* ${total}%0A%0A` +
            `*Notes:* ${notes}`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

        // Show Modal
        document.getElementById('conf-name').textContent = name;
        document.getElementById('conf-phone').textContent = phone;
        document.getElementById('conf-dest').textContent = dest;
        document.getElementById('confirm-modal').style.display = 'block';

        // Redirect after short delay
        setTimeout(() => {
            // For iPhones/Mobile, window.location.href is often more reliable than window.open
            window.location.href = whatsappUrl;
        }, 1500);
    });

    // Initial calculation
    calculateCost();
});

function closeModal() {
    document.getElementById('confirm-modal').style.display = 'none';
    window.location.href = 'index.html';
}

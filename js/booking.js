/* 
    Explore Northern Pakistan - Booking Script
    Handles: Dropdown population, Cost Calculation, Form Validation
*/

document.addEventListener('DOMContentLoaded', () => {
    const destSelect = document.getElementById('destination');
    const packSelect = document.getElementById('package');
    const travelersInput = document.getElementById('travelers');
    const bookingForm = document.getElementById('booking-form');

    const summaryRate = document.getElementById('summary-rate');
    const summaryTravelers = document.getElementById('summary-travelers');
    const summaryTotal = document.getElementById('summary-total');

    // Populate Dropdowns
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

    // Check URL parameters for pre-selection
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('dest')) destSelect.value = urlParams.get('dest');
    if (urlParams.has('package')) packSelect.value = urlParams.get('package');

    // Calculation Logic
    function calculateCost() {
        const selectedPackageId = packSelect.value;
        const travelers = parseInt(travelersInput.value) || 0;
        
        const selectedPackage = tourismData.packages.find(p => p.id === selectedPackageId);
        const rate = selectedPackage ? selectedPackage.price : 0;
        const total = rate * travelers;

        summaryRate.textContent = `Rs. ${rate.toLocaleString()}`;
        summaryTravelers.textContent = travelers;
        summaryTotal.textContent = `Rs. ${total.toLocaleString()}`;
    }

    packSelect.addEventListener('change', calculateCost);
    travelersInput.addEventListener('input', calculateCost);

    // Form Validation & Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const cnic = document.getElementById('cnic').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;
        const dest = destSelect.options[destSelect.selectedIndex].text;
        const pack = packSelect.options[packSelect.selectedIndex].text;
        const travelers = travelersInput.value;
        const date = document.getElementById('date').value;
        const notes = document.getElementById('notes').value;
        const total = summaryTotal.textContent;

        // CNIC Regex (simplified)
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        if (!cnicRegex.test(cnic)) {
            alert('Please enter a valid CNIC (xxxxx-xxxxxxx-x)');
            return;
        }

        // Prepare WhatsApp Message
        const whatsappNumber = '923019413918';
        const message = `*New Booking Request - Explore North*%0A%0A` +
            `*Name:* ${name}%0A` +
            `*CNIC:* ${cnic}%0A` +
            `*Email:* ${email}%0A` +
            `*Phone:* ${phone}%0A` +
            `*City:* ${city}%0A` +
            `*Destination:* ${dest}%0A` +
            `*Package:* ${pack}%0A` +
            `*Travelers:* ${travelers}%0A` +
            `*Travel Date:* ${date}%0A` +
            `*Total Cost:* ${total}%0A` +
            `*Notes:* ${notes}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Show Modal and then redirect (or just redirect)
        document.getElementById('conf-name').textContent = name;
        document.getElementById('conf-phone').textContent = phone;
        document.getElementById('conf-dest').textContent = dest;
        document.getElementById('confirm-modal').style.display = 'block';

        // Optional: Redirect after a short delay so they see the modal
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);
    });

    // Initial calculation
    calculateCost();
});

function closeModal() {
    document.getElementById('confirm-modal').style.display = 'none';
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shirtsForm');
    const shirtPreview = document.getElementById('shirtPreview');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const location = formData.get('location');
            const size = formData.get('size');
            const comments = formData.get('comments') || '';
            
            let paymentMethod = formData.get('paymentMethod') || '';
            if (paymentMethod === 'Other') {
                const otherPayment = formData.get('paymentOtherText') || '';
                paymentMethod = otherPayment ? `Other: ${otherPayment}` : 'Other';
            }
            
            if (!name || !email || !phone || !location || !size) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const baseURL = 'https://docs.google.com/forms/d/e/1FAIpQLSd3_UvMI3t9Alc6v20-60KgoCborCr9WpuffL5KXi4zsLadrQ/formResponse';
            const params = new URLSearchParams();
            params.append('usp', 'pp_url');
            params.append('entry.1923871093', name);
            params.append('entry.1422581245', email);
            params.append('entry.858591235', phone);
            params.append('entry.770709422', location);
            params.append('entry.751409556', size);
            params.append('entry.856359579', comments);
            params.append('entry.1806219796', paymentMethod);
            
            const redirectURL = `${baseURL}?${params.toString()}`;
            
            window.open(redirectURL, '_blank');
        });
    }
});

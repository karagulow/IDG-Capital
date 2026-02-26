document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contactForm');
	const toaster = document.querySelector('.toaster');
	const toasterClose = document.querySelector('.toaster__close');
	let toasterTimeout;

	function showError(input, message) {
		let errorDiv;
		if (input.type === 'checkbox') {
			errorDiv = document.querySelector(
				'.contact-us__approval + .error-message',
			);
		} else {
			errorDiv = input.parentElement.querySelector('.error-message');
		}
		errorDiv.textContent = message;
		errorDiv.style.display = 'block';
		input.classList.add('error');
	}

	function clearError(input) {
		let errorDiv;
		if (input.type === 'checkbox') {
			errorDiv = document.querySelector(
				'.contact-us__approval + .error-message',
			);
		} else {
			errorDiv = input.parentElement.querySelector('.error-message');
		}
		errorDiv.textContent = '';
		errorDiv.style.display = 'none';
		input.classList.remove('error');
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function isValidPhone(phone) {
		return /^[0-9+\-\s()]{7,20}$/.test(phone);
	}

	function showToaster() {
		toaster.classList.add('active');

		if (toasterTimeout) clearTimeout(toasterTimeout);
		toasterTimeout = setTimeout(hideToaster, 10000);
	}

	function hideToaster() {
		toaster.classList.remove('active');
		if (toasterTimeout) clearTimeout(toasterTimeout);
	}

	toasterClose.addEventListener('click', hideToaster);

	form.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			form.requestSubmit();
		}
	});

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let isValid = true;

		const firstName = form['first-name'];
		const lastName = form['last-name'];
		const email = form['email'];
		const phone = form['phone'];
		const message = form['message'];
		const approval = form['approval'];

		[firstName, lastName, email, phone, message, approval].forEach(clearError);

		if (!firstName.value.trim()) {
			showError(firstName, 'First name is required');
			isValid = false;
		}
		if (!lastName.value.trim()) {
			showError(lastName, 'Last name is required');
			isValid = false;
		}
		if (!email.value.trim() || !isValidEmail(email.value.trim())) {
			showError(email, 'Valid email is required');
			isValid = false;
		}
		if (!phone.value.trim() || !isValidPhone(phone.value.trim())) {
			showError(phone, 'Valid phone is required');
			isValid = false;
		}
		if (!message.value.trim()) {
			showError(message, 'Message is required');
			isValid = false;
		}
		if (!approval.checked) {
			showError(approval, 'You must agree with Privacy Policy');
			isValid = false;
		}

		if (isValid) {
			form.reset();
			showToaster();
		}
	});
});

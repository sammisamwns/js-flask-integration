document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const loading = document.getElementById('loading');
  const response = document.getElementById('response');

  // Validate inputs
  if (!name || !email) {
    showError('Please fill in all fields');
    return;
  }

  if (!isValidEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  loading.style.display = 'block';
  response.classList.remove('show');

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    showSuccess(data);
  })
  .catch(error => {
    console.error('Error:', error);
    showError('Failed to submit data. Please try again.');
  })
  .finally(() => {
    // Reset loading state
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    loading.style.display = 'none';
  });
});

function showSuccess(data) {
  const response = document.getElementById('response');
  response.innerHTML = `
    <h3> Success!</h3>
    <p class="success">${data.message}</p>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Submitted:</strong> ${data.timestamp}</p>
    <p><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">${data.status}</span></p>
    <div style="margin-top: 15px; padding: 10px; background: #e8f4fd; border-radius: 8px; font-size: 0.9rem;">
      <p style="margin: 0; color: #666;"><strong>Details:</strong></p>
      <p style="margin: 5px 0; color: #666;">• Name length: ${data.details.name_length} characters</p>
      <p style="margin: 5px 0; color: #666;">• Email domain: ${data.details.email_domain}</p>
      <p style="margin: 5px 0; color: #666;">• Processed at: ${data.details.submission_time}</p>
    </div>
  `;
  response.className = 'response show';
  response.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showError(message) {
  const response = document.getElementById('response');
  response.innerHTML = `
    <h3>❌ Error</h3>
    <p>${message}</p>
  `;
  response.className = 'response show error';
  response.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add some nice input animations
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
});

// Add form reset functionality
document.getElementById('userForm').addEventListener('reset', function() {
  document.getElementById('response').classList.remove('show');
}); 
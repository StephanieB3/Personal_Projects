document.addEventListener('DOMContentLoaded', () => {
  // ✅ Modal logic
  const modal = document.getElementById('phone-modal');
  const logoutBtn = document.getElementById('logout-btn');
  const savedPhone = localStorage.getItem('userPhone');

  if (modal && logoutBtn) {
    if (!savedPhone) {
      modal.style.display = 'flex';
      logoutBtn.style.display = 'none';
    } else {
      modal.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    }

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('userPhone');
      modal.style.display = 'flex';
      logoutBtn.style.display = 'none';
    });
  }

  // ✅ Dropdown menu logic
  const toggle = document.getElementById('menu-toggle');
  const dropdown = document.getElementById('dropdown');

  if (toggle && dropdown) {
    toggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }

  // ✅ Product image toggle (if applicable)
  const imageBox = document.getElementById('image-box');
  const productImage = document.getElementById('product-image');

  if (imageBox && productImage) {
    const frontView = 'images/rflannelfront.jpg';
    const backView = 'images/rflannelback.jpg';
    let showingFront = true;

    imageBox.addEventListener('click', () => {
      productImage.src = showingFront ? backView : frontView;
      showingFront = !showingFront;
    });
  }
});

// ✅ Submit phone function — uses async/await & full backend URL if needed
async function submitPhone() {
  const input = document.getElementById('phone-input');
  const phone = input.value.trim();
  const regex = /^\d{3}-?\d{3}-?\d{4}$/;

  if (regex.test(phone)) {
    // ✅ Save to localStorage
    localStorage.setItem('userPhone', phone);

    try {
      // 🔑 If your backend is deployed, use its full URL
      // Example: const url = 'https://your-backend-url.onrender.com/api/phone';
      const url = '/api/phone';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: phone })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save phone number');
      }

      console.log('✅ Server response:', data.message);
      document.getElementById('phone-modal').style.display = 'none';
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) logoutBtn.style.display = 'inline-block';
      alert('Thank you for subscribing!');
    } catch (err) {
      console.error('❌ Failed to save phone number:', err);
      alert('There was a problem saving your number. Please try again.');
    }

  } else {
    alert("Please enter a valid phone number (e.g. 123-456-7890)");
  }
}

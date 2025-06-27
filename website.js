document.addEventListener('DOMContentLoaded', () => {
  // Modal logic (phone number)
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

    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('userPhone');
      modal.style.display = 'flex';
      logoutBtn.style.display = 'none';
    });
  }

  // Dropdown menu logic
  const toggle = document.getElementById('menu-toggle');
  const dropdown = document.getElementById('dropdown');

  if (toggle && dropdown) {
    toggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    window.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }

  // Product image toggle logic (front/back)
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

// Submit phone function
function submitPhone() {
  const input = document.getElementById('phone-input');
  const phone = input.value.trim();
  const regex = /^\d{3}-?\d{3}-?\d{4}$/;

  if (regex.test(phone)) {
    localStorage.setItem('userPhone', phone);
    document.getElementById('phone-modal').style.display = 'none';
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    alert("Please enter a valid phone number (e.g. 123-456-7890)");
  }
}


// Submit phone number (contact page)
function submitPhone() {
  const input = document.getElementById('phone-input');
  const phone = input.value.trim();
  const regex = /^\d{3}-?\d{3}-?\d{4}$/;

  if (regex.test(phone)) {
    localStorage.setItem('userPhone', phone);
    document.getElementById('phone-modal').style.display = 'none';
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    alert("Please enter a valid phone number (e.g. 123-456-7890)");
  }
}

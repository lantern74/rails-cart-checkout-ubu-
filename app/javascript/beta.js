document.addEventListener("turbo:load", function() {
  attachToggleSwitchListeners();
});

function attachToggleSwitchListeners() {
  const toggleSwitches = document.querySelectorAll('.toggleSwitch');

  toggleSwitches.forEach(function(toggleSwitch) {
    if (!toggleSwitch.hasListener) {
      toggleSwitch.addEventListener('change', handleToggleChange);
      toggleSwitch.hasListener = true;

    }
  });
}

function handleToggleChange() {

  console.log('Toggle changed');

  const label = this.nextElementSibling;
  const updateUrl = this.dataset.updateUrl;

  // Get the CSRF token from the meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  $.ajax({
    type: 'PATCH',
    url: updateUrl,
    data: { user_beta_update: { enabled: this.checked } },
    headers: {
      'X-CSRF-Token': csrfToken, // Include the CSRF token in the request headers
    },
    success: function(response) {
      // Handle success if needed
    },
    error: function(error) {
      console.error('Error updating:', error);
    }
  });
}

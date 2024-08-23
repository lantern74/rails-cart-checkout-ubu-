document.addEventListener("DOMContentLoaded", function () {
    // Select both radio inputs
    var pricingSwitch = document.getElementById("pricing-switch");
    var pricingSwitchSecond = document.getElementById("pricing-switch-second");

    // Function to update the price content based on the selected billing period
    function updatePriceContent() {
        // Get all elements that need their content updated
        var priceContents = document.querySelectorAll(".toggle-price-content");

        priceContents.forEach(function (element) {
            // Check which billing period is selected and update the content accordingly
            if (pricingSwitch.checked) {
                element.innerText = element.getAttribute("data-price-monthly");
            } else if (pricingSwitchSecond.checked) {
                element.innerText = element.getAttribute("data-price-yearly");
            }
        });
    }

    // Add event listeners to both radio inputs
    pricingSwitch.addEventListener("change", updatePriceContent);
    pricingSwitchSecond.addEventListener("change", updatePriceContent);

    // Initial update in case the initial state needs to reflect a specific selection
    updatePriceContent();
});

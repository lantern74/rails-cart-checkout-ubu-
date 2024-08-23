import { Controller } from "@hotwired/stimulus";

import yearDropdownPlugin from "./flatpickr_year";

// Connects to data-controller="flatpickr"
export default class extends Controller {
  connect () {

    flatpickr(".from_date",{
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d.m.y",
    });

    flatpickr(".to_date",{
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d.m.y",
    });

    flatpickr(".date_of_birth",{
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d.m.y",
          plugins: [
      new yearDropdownPlugin({
        date: this.value,
        yearStart: this.yearStart,
        yearEnd: this.yearEnd
      })
    ]

    });



  console.log ("connected");
  }
}

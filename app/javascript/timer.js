function updateCountdown() {
  const countdownElements = document.querySelectorAll(".realcountdown");

  countdownElements.forEach(function (countdownElement) {
   const targetDateStr = countdownElement.getAttribute("data-date");
   const targetTimestamp = parseInt(countdownElement.getAttribute("data-time")); // Assuming data-time is a timestamp in milliseconds
   const targetTimeZone = countdownElement.getAttribute("data-tz"); // Retrieve target time zone

   const targetDateTime = new Date(targetTimestamp);


   // Convert target date to the specified time zone
   targetDateTime.toLocaleString('en-US', {
     timeZone: targetTimeZone
    });

    if (isNaN(targetDateTime)) {
      countdownElement.innerHTML = "Invalid date and time"; // Handle an invalid date and time
      return;
    }


    const targetHour = targetDateTime.getHours();
    const targetMinute = targetDateTime.getMinutes();
    const targetSecond = targetDateTime.getSeconds();


    // const targetDateTimeStr = `${targetDateStr} ${targetHour}:${targetMinute}:${targetSecond}`;


    targetDateTime.setHours(targetHour, targetMinute, targetSecond);


    const interval = setInterval(function () {



   const currentTime = new Date();
   const options = {
     timeZone: targetTimeZone,
     hour12: false
   };
   const targetTimeInTimeZone = currentTime.toLocaleString('en-US', options);
   const currentDate = new Date(targetTimeInTimeZone);




   const timeLeft = targetDateTime - currentDate;


      if (timeLeft <= 0) {
        clearInterval(interval);
        //  countdownElement.innerHTML = "<div>Countdown expired!</div>";

        const textContainer = document.createElement('div');
        textContainer.textContent = 'Countdown expired!';
        textContainer.style.display = 'flex';
        textContainer.style.justifyContent = 'center';
        textContainer.style.alignItems = 'center';
        textContainer.style.height = '100%';
        textContainer.style.marginTop = '-13px';
        textContainer.style.paddingTop = '20px';
        textContainer.style.paddingBottom = '20px';

        countdownElement.innerHTML = textContainer.outerHTML;


      } else {
        const days = addLeadingZero(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
        const hours = addLeadingZero(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = addLeadingZero(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = addLeadingZero(Math.floor((timeLeft % (1000 * 60)) / 1000));

        // Create a timer div
        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer');

        // Create timer elements
        const timerItems = [{
            number: days,
            word: 'days'
          },
          {
            number: hours,
            word: 'hrs'
          },
          {
            number: minutes,
            word: 'min'
          },
          {
            number: seconds,
            word: 'sec'
          }
        ];

        timerItems.forEach((item) => {
          const timerItem = document.createElement('div');
          timerItem.style.display = 'inline-block';
          timerItem.style.marginRight = '20px';

          const timerNumber = document.createElement('div');
          timerNumber.classList.add('timer-number');
          timerNumber.textContent = item.number;
          timerNumber.style.fontSize = '42px'; // Set font size
          timerNumber.style.lineHeight = '34px'; // Set line height
          timerNumber.style.fontWeight = '1000'; // Set font weight
          timerNumber.style.letterSpacing = '1.66px'; // Set letter spacing
          timerNumber.style.fontFamily = "'Nunito Sans', sans-serif"; // Set font family

          const timerWord = document.createElement('div');
          timerWord.classList.add('timer-word');
          timerWord.textContent = item.word;
          timerWord.style.paddingLeft = '3px'; // Set font size
          timerWord.style.fontSize = '9px'; // Set font size
          timerWord.style.fontWeight = '600'; // Set font weight
          timerWord.style.letterSpacing = '1.26px'; // Set letter spacing
          timerWord.style.textTransform = 'uppercase'; // Set text transform
          timerWord.style.fontFamily = "'Nunito Sans', sans-serif"; // Set font family

          timerItem.appendChild(timerNumber);
          timerItem.appendChild(timerWord);
          timerDiv.appendChild(timerItem);
        });

        countdownElement.innerHTML = ''; // Clear previous content
        countdownElement.appendChild(timerDiv);
      }
    }, 1000);
  });
}

function addLeadingZero(number) {
  // Add a leading zero if the number is less than 10
  return number < 10 ? `0${number}` : `${number}`;
}

updateCountdown();

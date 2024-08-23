import { Controller } from "@hotwired/stimulus";

// Note: You may want to move this code to an external util file to use in other files


const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // This line has changed - allowing us to pass in an actual node
    const node = typeof element === 'string' ? document.querySelector(element) : element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

// the Stimulus controller using the util above

export default class extends Controller {

  connect() {
    const element = this.element;
    element.removeAttribute('hidden');

    animateCSS(element, 'fadeIn').then(() => {
      setTimeout(() => {
        this.dismiss();
      }, 3000);
    });
  }

  dismiss() {
    const element = this.element;
    animateCSS(element, 'fadeOut').then(() => element.remove());
    element.remove();
  }
}

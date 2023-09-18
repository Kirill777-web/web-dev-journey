const slider = document.querySelector('.certificates-slider');
const certificateElement = document.querySelector('.certificate');
const style = window.getComputedStyle(certificateElement);
const certificates = document.querySelector('#img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
let index = 0;

prevBtn.addEventListener('click', function () {
  index = index <= 0 ? certificates.length - 1 : index - 1;
  updateSlider();
});

nextBtn.addEventListener('click', function () {
  index = index >= certificates.length - 1 ? 0 : index + 1;
  updateSlider();
});

dots.forEach((dot, dotIndex) => {
  dot.addEventListener('click', function () {
    index = dotIndex;
    updateSlider();
  });
});

function getOffsetValue() {
  const width = parseFloat(style.width); // Width of certificate without margins
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);
  return width + marginLeft + marginRight;
}

function updateSlider() {
  let offsetValue = getOffsetValue();
  let offset = -index * offsetValue;
  slider.style.transform = `translateX(${offset}px)`;

  dots.forEach((dot) => dot.classList.remove('active'));
  dots[index].classList.add('active');
}
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Debounce the updateSlider function on window resize
window.addEventListener('resize', debounce(updateSlider, 100));

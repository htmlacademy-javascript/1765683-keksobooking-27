import { priceField, priceFieldSlider } from './form-validation.js';

noUiSlider.create(priceFieldSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

priceFieldSlider.noUiSlider.on('update', () => {
  priceField.value = priceFieldSlider.noUiSlider.get();
});

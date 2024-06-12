import './validate-form.js';
const uploadLogo = document.querySelector('#upload-file');
const imageEditor = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview');
const effectsRadio = document.querySelectorAll('.effects__radio');
const fieldHashtags = document.querySelector('.text__hashtags');
const fieldComments = document.querySelector('.text__description');
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_VALUE = 25;


const addEffect = (effect) => `${'effects__preview--'}${effect.value}` ;

const changeScale = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  controlValue.value = `${value}%`;
};

const hiddenWindowPublication = () => {
  imageEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadLogo.value = '';
};

const closeDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hiddenWindowPublication();
  }
};

let currentEffect = '';
effectsRadio.forEach((effect) => {
  effect.addEventListener('click', () => {
    imageElement.classList.remove('effects__preview--chrome');
    imageElement.classList.remove('effects__preview--none');
    imageElement.classList.remove('effects__preview--sepia');
    imageElement.classList.remove('effects__preview--marvin');
    imageElement.classList.remove('effects__preview--phobos');
    imageElement.classList.remove('effects__preview--heat');
    currentEffect = addEffect(effect);
    imageElement.classList.add(currentEffect);
  });
  return currentEffect;
});

const defaultImgElement = () => {
  imageElement.style.transform = 'scale(1)';
  imageElement.classList.remove(currentEffect);
  imageElement.classList.add('effects__preview--none');
};

uploadLogo.addEventListener('change', () => {
  imageEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  defaultImgElement();
});

uploadCancel.addEventListener('click', () => {
  hiddenWindowPublication();
});


controlBigger.addEventListener('click', () => {
  const NumberControlValue = parseInt(controlValue.value, 10);
  let newValue = NumberControlValue + STEP_VALUE;
  if (newValue > MAX_VALUE) {
    newValue = MAX_VALUE;
  }
  changeScale(newValue);
});

controlSmaller.addEventListener('click', () => {
  const NumberControlValue = parseInt(controlValue.value, 10);
  let newValue = NumberControlValue - STEP_VALUE;
  if (newValue < MIN_VALUE) {
    newValue = MIN_VALUE;
  }
  changeScale(newValue);
});


fieldHashtags.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeDocumentKeydown);
});
fieldComments.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeDocumentKeydown);
});

fieldHashtags.addEventListener('blur', () => {
  document.addEventListener('keydown', closeDocumentKeydown);
});
fieldComments.addEventListener('blur', () => {
  document.addEventListener('keydown', closeDocumentKeydown);
});
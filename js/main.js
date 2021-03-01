// Enter your JavaScript for the solution here...

/*jslint browser:true */
// https://stackoverflow.com/questions/7090642/jslint-warns-that-document-is-not-fully-defined-on-jquerydocument-ready

const placeHolder = document.querySelector('img').src;
const form = document.querySelector('.meme-form');
const imgText = document.querySelector('.meme-display img');
const topText = document.querySelector('.top-text');
const bottomText = document.querySelector('.bottom-text');
const errorType = document.querySelector('.error');

function getMemePath(memeImgValue) {
  return `img/${memeImgValue}.png`;
}

function DisplayImage(memeImgValue, altStr) {
  if (memeImgValue === '') {
    imgText.src = placeHolder;
  } else {
    imgText.src = getMemePath(memeImgValue);
  }
  imgText.alt = altStr;
}

function DisplayText(topTextValue, bottomTextValue) {
  topText.innerHTML = topTextValue;
  bottomText.innerHTML = bottomTextValue;
}

function addError(err) {
  errorType.innerHTML += '<li>Error: ' + err + '</li>';
}

function DeleteErrors() {
  errorType.innerHTML = '';
}

function isTextValid(txt) {
  return !txt || !txt.trim();
}

function isImageValid(index) {
  return index === 0;
}

form.addEventListener('change', (event) => {
  let meme = form.elements[0];
  let memeIndex = meme.selectedIndex;

  if (memeIndex === 0) {
    DisplayImage('', 'Placeholder Image');
    DisplayText('', '');
    addError('No image selected');
  } else {
    let memeImgValue = meme.value;
    // https://stackoverflow.com/questions/14262770/javascript-replace-dash-hyphen-with-a-space/14262891
    let memeText = memeImgValue.replace(/-/g, ' ');
    DisplayImage(memeImgValue, memeText);
  }
});

form.addEventListener('submit', (event) => {
  DeleteErrors();

  let topText = form.elements[1].value;
  let bottomText = form.elements[2].value;
  let textValid = true;
  let imageValid = true;

  if (isImageValid(form.elements[0].selectedIndex)) {
    addError('No image selected');
    imageValid = false;
  }
  if (isTextValid(topText)) {
    addError('Top Text cannot be empty');
    textValid = false;
  }

  if (isTextValid(bottomText)) {
    addError('Bottom Text cannot be empty');
    textValid = false;
  }

  if (textValid && imageValid) {
    DisplayText(topText, bottomText);
    DeleteErrors();
  }
  event.preventDefault();
});

form.addEventListener('reset', (event) => {
  DisplayImage('');
  DisplayText('', '');
  DeleteErrors();
});

// eslint-disable-next-line import/extensions
import { keys, auxKeys, specialKeys } from './data.js';

/* Class======================================= */

class Keyboard {
  constructor() {
    this.keys = null;
    this.color = 'rgb(101 104 106)';
    this.headerText = 'Virtual Keyboard';
    this.operSystem = 'Windows';
  }

  createWrapper() {
    const header = document.createElement('header');
    header.classList.add('header');
    const heading = document.createElement('h1');
    heading.classList.add('header__heading');
    heading.textContent = this.headerText;
    header.append(heading);
    document.body.prepend(header);
    const wrapper = document.createElement('main');
    wrapper.classList.add('wrapper');
    header.after(wrapper);
    const content = document.createElement('div');
    content.classList.add('content');
    wrapper.append(content);
    const keyboard = document.createElement('div');
    const textarea = document.createElement('textarea');
    const info = document.createElement('div');
    const operSys = document.createElement('p');
    const language = document.createElement('div');
    const languageCapter = document.createElement('h2');
    const languageShort = document.createElement('span');
    keyboard.classList.add('content__keyboard', 'keyboard');
    textarea.classList.add('content__area');
    info.classList.add('content__info', 'info');
    language.classList.add('info__lang', 'lang');
    languageShort.classList.add('lang__short');
    languageShort.textContent = 'en';
    operSys.textContent = `The keyboard is made for the OS ${this.operSystem}`;
    languageCapter.textContent = 'Language (Click on the language icon or press on the keyboard "Ctrl + Alt"):';
    language.append(languageCapter, languageShort);
    info.append(operSys, language);
    content.append(textarea, keyboard, info);
    this.keys = document.createElement('div');
    this.keys.classList.add('keyboard__keys');
    keyboard.append(this.createKeys(keys.en));
  }

  createKeys(obj) {
    Object.getOwnPropertyNames(obj).forEach((key1) => {
      const key = document.createElement('button');
      key.classList.add('keyboard__key');
      key.setAttribute('data-keyCode', `${key1}`);
      const mainText = document.createElement('span');
      mainText.classList.add('keyboard__key-main');
      key.append(mainText);
      if (
        obj[key1] === 'del' || obj[key1] === 'enter' || obj[key1] === 'backspace' || obj[key1] === 'tab'
      ) {
        mainText.textContent = obj[key1].slice(0, 1).toUpperCase() + obj[key1].slice(1);
      } else {
        mainText.textContent = obj[key1];
      }
      if (obj[key1] === 'backspace' || obj[key1] === 'caps lock' || obj[key1] === 'shift') {
        key.style.flexBasis = `${13}%`;
        key.style.maxWidth = `${10}rem`;
        key.style.background = this.color;
      } else if (obj[key1] === 'enter') {
        key.style.flexBasis = `${11}%`;
        key.style.maxWidth = `${7}rem`;
        key.style.background = this.color;
      } else if (obj[key1] === 'space') {
        key.style.flexGrow = 1;
        key.style.maxWidth = `${37}%`;
        key.textContent = '';
      } else if (obj[key1] === 'ctrl') {
        key.style.flexBasis = `${8}%`;
        key.style.maxWidth = `${5}rem`;
        key.style.background = this.color;
      } else if (obj[key1] === 'arrowup') {
        mainText.textContent = '';
        key.classList.add('arrow__up', 'arrow');
      } else if (obj[key1] === 'arrowdown') {
        mainText.textContent = '';
        key.classList.add('arrow__down', 'arrow');
      } else if (obj[key1] === 'arrowleft') {
        mainText.textContent = '';
        key.classList.add('arrow__left', 'arrow');
      } else if (obj[key1] === 'arrowright') {
        mainText.textContent = '';
        key.classList.add('arrow__right', 'arrow');
      } else if (obj[key1] === '`' || obj[key1] === 'tab' || obj[key1] === 'win' || obj[key1] === 'alt' || obj[key1] === 'del' || obj[key1] === 'shift '
      ) {
        key.style.background = this.color;
      }
      this.keys.append(key);
      Object.getOwnPropertyNames(auxKeys.en).forEach((key2) => {
        if (key2 === key1) {
          const auxText = document.createElement('span');
          auxText.classList.add('keyboard__key-aux');
          key.classList.add('keyboard__key-special');
          auxText.textContent = auxKeys.en[key2];
          key.append(auxText);
        }
      });
    });
    return this.keys;
  }
}
const wrapper = new Keyboard();
wrapper.createWrapper();

/* Vars======================================= */

const textArea = document.querySelector('.content__area');
const langShort = document.querySelector('.lang__short');
const btnCaps = document.querySelector('.keyboard__key[data-keycode="CapsLock"');
const btnShiftLeft = document.querySelector('.keyboard__key[data-keycode="ShiftLeft"');
const btnShiftRight = document.querySelector('.keyboard__key[data-keycode="ShiftRight"');
const btn = document.querySelectorAll('.keyboard__key');
const btnSpecial = document.querySelectorAll('.keyboard__key-special > .keyboard__key-main');
const btnAux = document.querySelectorAll('.keyboard__key-aux');
const keyboard = document.querySelector('.content__keyboard');
let flag = false;
let flagCaps = false;
let lang = 'en';

/* Change Language======================================= */

const changeLanguage = (objMain, objAux) => {
  const transAtr = document.querySelectorAll('[data-keycode]');
  transAtr.forEach((el) => {
    const element = el;
    const valueData = el.dataset.keycode;
    const valueDataSpecial = el.classList.contains('keyboard__key-special');
    if (specialKeys.specialKey.includes(valueData)) {
      // Next iteration
    } else {
      if (valueDataSpecial === true) {
        element.children[1].textContent = objAux[valueData].toString();
      }
      element.children[0].textContent = objMain[valueData].toString();
    }
  });
};

/* Local storage ======================================= */

const setLocalStorage = () => {
  localStorage.setItem('lang', lang);
};
const getLocalStorage = () => {
  if (localStorage.getItem('lang') === null) {
    setLocalStorage();
  }
  if (localStorage.getItem('lang') === 'ru') {
    changeLanguage(keys.ru, auxKeys.ru);
    flag = true;
    langShort.textContent = 'ru';
  }
};
window.addEventListener('load', getLocalStorage);

/* Write in textarea======================================= */

const writeArea = (item, obj, obj2) => {
  let curPosCursor = textArea.selectionStart;
  const start = textArea.value.slice(0, curPosCursor);
  const end = textArea.value.slice(curPosCursor);
  let val;
  const elementVal = item.dataset.keycode;
  if (btnCaps.classList.contains('active') && !specialKeys.specialKey.includes(elementVal)) {
    if (btnShiftLeft.classList.contains('active') || btnShiftRight.classList.contains('active')) {
      val = obj[elementVal].toLowerCase();
    } else {
      val = obj[elementVal].toUpperCase();
    }
  } else if (!btnCaps.classList.contains('active') && !specialKeys.specialKey.includes(elementVal)) {
    if (
      btnShiftLeft.classList.contains('active') || btnShiftRight.classList.contains('active')
    ) {
      val = obj[elementVal].toUpperCase();
    } else {
      val = obj[elementVal].toLowerCase();
    }
  }
  if (
    elementVal === item.dataset.keycode && !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') || btnShiftRight.classList.contains('active')
    ) {
      if (
        item.classList.contains('keyboard__key-special') && btnCaps.classList.contains('active')
      ) {
        val = obj2[elementVal].toLowerCase();
      } else if (
        item.classList.contains('keyboard__key-special') && !btnCaps.classList.contains('active')
      ) {
        val = obj2[elementVal];
      }
    }
    textArea.value = `${start}${val}${end}`;
    curPosCursor += 1;
  }
  if (item.dataset.keycode === 'Tab') {
    textArea.value = `${start}    ${end}`;
    curPosCursor += 4;
  } else if (item.dataset.keycode === 'Space') {
    textArea.value = `${start}  ${end}`;
    curPosCursor += 2;
  } else if (item.dataset.keycode === 'Backspace') {
    if (curPosCursor === 0) {
      // Next iteration
    } else {
      textArea.value = textArea.value.slice(0, curPosCursor - 1) + end;
      curPosCursor -= 1;
    }
  } else if (item.dataset.keycode === 'Delete') {
    textArea.value = start + textArea.value.slice(curPosCursor + 1);
  } else if (item.dataset.keycode === 'Enter') {
    textArea.value = `${start}\n${end}`;
    curPosCursor += 1;
  } else if (item.dataset.keycode === 'ArrowLeft') {
    textArea.focus();
    curPosCursor -= 1;
  } else if (item.dataset.keycode === 'ArrowRight') {
    textArea.focus();
    curPosCursor += 1;
  } else if (item.dataset.keycode === 'ArrowUp') {
    textArea.focus();
    const before = textArea.value.substring(0, curPosCursor).split('\n');
    if (before.length === 1 || before[before.length - 1].length >= 75) {
      curPosCursor -= 75;
    } else if (
      before[before.length - 1].length <= before[before.length - 2].length % 75
    ) {
      curPosCursor -= (before[before.length - 2].length % 75) + 1;
    } else {
      curPosCursor -= before[before.length - 1].length + 1;
    }
    if (curPosCursor < 0) return;
  } else if (item.dataset.keycode === 'ArrowDown') {
    textArea.focus();
    curPosCursor = textArea.selectionEnd;
    const before = textArea.value.substring(0, curPosCursor).split('\n');
    const after = textArea.value.substring(textArea.selectionEnd).split('\n');
    if (after.length === 1 || after[0].length >= 75) {
      curPosCursor += 75;
    } else if (before[before.length - 1].length % 75 > after[1].length) {
      curPosCursor += after[0].length + after[1].length + 1;
    } else if (before[before.length - 1].length + after[0].length > 75) {
      curPosCursor += after[0].length;
    } else {
      curPosCursor += (before[before.length - 1].length % 75) + after[0].length + 1;
    }
  }
  textArea.setSelectionRange(curPosCursor, curPosCursor);
};

/* Add events on keyboard======================================= */

const eventKeyAdd = (event, eventCode) => {
  btn.forEach((el) => {
    if (eventCode === el.dataset.keycode && eventCode === 'CapsLock') {
      if (event.repeat) return;
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
      }
    }
    if (eventCode === el.dataset.keycode && eventCode !== 'CapsLock') {
      event.preventDefault();
      el.classList.add('active');
      if (flag) {
        writeArea(el, keys.ru, auxKeys.ru);
      } else {
        writeArea(el, keys.en, auxKeys.en);
      }
    }
  });
  if (event.altKey && event.ctrlKey && !flag) {
    changeLanguage(keys.ru, auxKeys.ru);
    flag = true;
    lang = 'ru';
    langShort.textContent = lang;
    setLocalStorage();
  } else if (event.altKey && event.ctrlKey) {
    changeLanguage(keys.en, auxKeys.en);
    flag = false;
    lang = 'en';
    langShort.textContent = lang;
    setLocalStorage();
  }
  if (eventCode === 'CapsLock' && !flagCaps) {
    btn.forEach((el) => {
      const valueDataSpecial = el.classList.contains('keyboard__key-special');
      if (event.repeat) return;
      if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
        el.children[0].classList.add('active-Upspecial');
      }
      if (valueDataSpecial === true) {
        el.children[1].classList.add('active-Upspecial');
      }
    });
    flagCaps = true;
  } else if (eventCode === 'CapsLock') {
    btn.forEach((el) => {
      const valueDataSpecial = el.classList.contains('keyboard__key-special');
      if (event.repeat) return;
      if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
        el.children[0].classList.remove('active-Upspecial');
      }
      if (valueDataSpecial === true) {
        el.children[1].classList.remove('active-Upspecial');
      }
    });
    flagCaps = false;
  }
  if (
    btnShiftLeft.classList.contains('active') || btnShiftRight.classList.contains('active')
  ) {
    btnSpecial.forEach((el) => {
      if (!btnCaps.classList.contains('active')) {
        // Next iteration
      } else {
        el.classList.add('active-Upspecial');
      }
      el.classList.add('active-special');
    });
    btnAux.forEach((el) => {
      if (!btnCaps.classList.contains('active')) {
        // Next iteration
      } else {
        el.classList.add('active-Upspecial');
      }
      el.classList.add('active-special');
    });
    btn.forEach((el) => {
      if (
        !specialKeys.specialKey.includes(el.dataset.keycode) && !btnCaps.classList.contains('active')
      ) {
        el.classList.add('active-up');
      } else {
        // Next iteration
      }
    });
  }
  if (btnCaps.classList.contains('active')) {
    if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
      btn.forEach((el) => {
        if (
          !specialKeys.specialKey.includes(el.dataset.keycode) && !el.classList.contains('keyboard__key-special')
        ) {
          el.children[0].classList.remove('active-Upspecial');
        }
      });
    }
  }
};

/* Remove events from keyboard======================================= */

const eventKeyRemove = (eventCode) => {
  btn.forEach((el) => {
    if (eventCode === el.dataset.keycode && eventCode !== 'CapsLock') {
      el.classList.remove('active');
    }
  });
  if (
    btnShiftLeft.classList.contains('active') || btnShiftRight.classList.contains('active')
  ) {
    // Next iteration
  } else {
    btnSpecial.forEach((el) => el.classList.remove('active-special'));
    btnAux.forEach((el) => el.classList.remove('active-special'));
    btn.forEach((el) => el.classList.remove('active-up'));
  }
  if (btnCaps.classList.contains('active')) {
    if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
      btn.forEach((el) => {
        if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
          el.children[0].classList.add('active-Upspecial');
        }
      });
    }
  }
};

/* Events========================================== */

document.addEventListener('keydown', (event) => {
  eventKeyAdd(event, event.code);
});
document.addEventListener('keyup', (event) => {
  eventKeyRemove(event.code);
});
keyboard.addEventListener('click', (event) => {
  textArea.focus();
  const itm = event.target.closest('.keyboard__key');
  if (!itm) return;
  if (!keyboard.contains(itm)) return;
  eventKeyAdd(event, itm.dataset.keycode);
});
keyboard.addEventListener('click', (event) => {
  textArea.focus();
  const itm = event.target.closest('.keyboard__key');
  if (!itm) return;
  if (!keyboard.contains(itm)) return;
  eventKeyRemove(itm.dataset.keycode);
});
langShort.addEventListener('click', () => {
  if (flag === false) {
    changeLanguage(keys.ru, auxKeys.ru);
    flag = true;
    lang = 'ru';
    langShort.textContent = lang;
    setLocalStorage();
  } else {
    changeLanguage(keys.en, auxKeys.en);
    flag = false;
    lang = 'en';
    langShort.textContent = lang;
    setLocalStorage();
  }
});

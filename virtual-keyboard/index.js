import { keys, auxKeys, specialKeys } from './data.js';

class Keyboard {
  constructor(color = 'grey') {
    this.wrapper;
    this.content;
    this.keyboard;
    this.textarea;
    this.keys;
    this.key;
    this.transfer;
    this.span;
    this.color = color;
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    document.body.append(this.wrapper);
    this.content = document.createElement('div');
    this.content.classList.add('content');
    this.wrapper.append(this.content);
    this.keyboard = document.createElement('div');
    this.textarea = document.createElement('textarea');
    this.keyboard.classList.add('content__keyboard', 'keyboard');
    this.textarea.classList.add('content__area');
    this.content.append(this.textarea, this.keyboard);
    this.keys = document.createElement('div');
    this.keys.classList.add('keyboard__keys');
    this.keyboard.append(this.createKeys(keys.en));
  }

  createKeys(obj) {
    for (let [key, value] of Object.entries(obj)) {
      this.key = document.createElement('button');
      this.key.classList.add('keyboard__key');
      this.key.setAttribute('data-keyCode', `${key}`);
      const mainText = document.createElement('span');
      mainText.classList.add('keyboard__key-main');
      this.key.append(mainText);
      if (
        value === 'del' ||
        value === 'enter' ||
        value === 'backspace' ||
        value === 'tab'
      ) {
        mainText.textContent = value.slice(0, 1).toUpperCase() + value.slice(1);
      } else {
        mainText.textContent = value;
      }
      if (value === 'backspace' || value === 'caps lock' || value === 'shift') {
        this.key.style.flexBasis = 13 + '%';
        this.key.style.maxWidth = 10 + 'rem';
        this.key.style.background = this.color;
      } else if (value === 'enter') {
        this.key.style.flexBasis = 11 + '%';
        this.key.style.maxWidth = 7 + 'rem';
        this.key.style.background = this.color;
      } else if (value === 'space') {
        this.key.style.flexGrow = 1;
        this.key.style.maxWidth = 37 + '%';
        this.key.textContent = '';
      } else if (value === 'ctrl') {
        this.key.style.flexBasis = 8 + '%';
        this.key.style.maxWidth = 5 + 'rem';
        this.key.style.background = this.color;
      } else if (value === 'arrowup') {
        mainText.textContent = '';
        this.key.classList.add('arrow__up', 'arrow');
      } else if (value === 'arrowdown') {
        mainText.textContent = '';
        this.key.classList.add('arrow__down', 'arrow');
      } else if (value === 'arrowleft') {
        mainText.textContent = '';
        this.key.classList.add('arrow__left', 'arrow');
      } else if (value === 'arrowright') {
        mainText.textContent = '';
        this.key.classList.add('arrow__right', 'arrow');
      } else if (
        value === '`' ||
        value === 'tab' ||
        value === 'win' ||
        value === 'alt' ||
        value === 'del' ||
        value === 'shift '
      ) {
        this.key.style.background = this.color;
      }
      this.keys.append(this.key);
      for (let [key2, value2] of Object.entries(auxKeys.en)) {
        if (key2 === key) {
          const auxText = document.createElement('span');
          auxText.classList.add('keyboard__key-aux');
          this.key.classList.add('keyboard__key-special');
          auxText.textContent = value2;
          this.key.append(auxText);
        }
      }
    }
    return this.keys;
  }
}
let wrapper = new Keyboard('rgb(101 104 106)');
wrapper.createWrapper();

const content = document.querySelector('.content');
const keyboard = document.querySelector('.content__keyboard');
const textArea = document.querySelector('.content__area');
const btnCaps = document.querySelector(
  '.keyboard__key[data-keycode="CapsLock"'
);
const btnShiftLeft = document.querySelector(
  '.keyboard__key[data-keycode="ShiftLeft"'
);
const btnShiftRight = document.querySelector(
  '.keyboard__key[data-keycode="ShiftRight"'
);
const btn = document.querySelectorAll('.keyboard__key');
const btnSpecial = document.querySelectorAll(
  '.keyboard__key-special > .keyboard__key-main'
);
const btnAux = document.querySelectorAll('.keyboard__key-aux');

/*Text area print========================================*/

const writeArea = (item, obj, obj2) => {
  let curPosCursor = textArea.selectionStart;
  const start = textArea.value.slice(0, curPosCursor);
  const end = textArea.value.slice(curPosCursor);
  let val;
  let elementVal = item.dataset.keycode;
  if (
    btnCaps.classList.contains('active') &&
    !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') ||
      btnShiftRight.classList.contains('active')
    ) {
      val = obj[elementVal].toLowerCase();
    } else {
      val = obj[elementVal].toUpperCase();
    }
  } else if (
    !btnCaps.classList.contains('active') &&
    !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') ||
      btnShiftRight.classList.contains('active')
    ) {
      val = obj[elementVal].toUpperCase();
    } else {
      val = obj[elementVal].toLowerCase();
    }
  }
  if (
    elementVal === item.dataset.keycode &&
    !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') ||
      btnShiftRight.classList.contains('active')
    ) {
      if (
        item.classList.contains('keyboard__key-special') &&
        btnCaps.classList.contains('active')
      ) {
        val = obj2[elementVal].toLowerCase();
      } else if (
        item.classList.contains('keyboard__key-special') &&
        !btnCaps.classList.contains('active')
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
  } else if (item.dataset.keycode === 'ArrowDown') {
  }
  textArea.setSelectionRange(curPosCursor, curPosCursor);
};

/*Language change function==============================================*/

const changeLanguage = (objMain, objAux) => {
  const transAtr = document.querySelectorAll('[data-keycode]');
  transAtr.forEach((el) => {
    let valueData = el.dataset.keycode;
    let valueDataSpecial = el.classList.contains('keyboard__key-special');
    if (specialKeys.specialKey.includes(valueData)) {
    } else {
      if (valueDataSpecial === true) {
        el.children[1].textContent = objAux[valueData].toString();
      }
      el.children[0].textContent = objMain[valueData].toString();
    }
  });
};

/*Add events=======================================*/

let flag = false;
let flagCaps = false;
const eventKeyAdd = (event) => {
  console.log(event);
  btn.forEach((el) => {
    if (event.code === el.dataset.keycode && event.code === 'CapsLock') {
      if (event.repeat) return;
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
      }
    }
    if (event.code === el.dataset.keycode && event.code !== 'CapsLock') {
      event.preventDefault();
      el.classList.add('active');
      flag
        ? writeArea(el, keys.ru, auxKeys.ru)
        : writeArea(el, keys.en, auxKeys.en);
    }
  });
  if (event.altKey && event.ctrlKey && !flag) {
    changeLanguage(keys.ru, auxKeys.ru);
    flag = true;
  } else if (event.altKey && event.ctrlKey) {
    changeLanguage(keys.en, auxKeys.en);
    flag = false;
  }
  if (event.code === 'CapsLock' && !flagCaps) {
    btn.forEach((el) => {
      let valueDataSpecial = el.classList.contains('keyboard__key-special');
      if (event.repeat) return;
      if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
        el.children[0].classList.add('active-Upspecial');
      }
      if (valueDataSpecial === true) {
        el.children[1].classList.add('active-Upspecial');
      }
    });
    flagCaps = true;
  } else if (event.code === 'CapsLock') {
    btn.forEach((el) => {
      let valueDataSpecial = el.classList.contains('keyboard__key-special');
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
    btnShiftLeft.classList.contains('active') ||
    btnShiftRight.classList.contains('active')
  ) {
    btnSpecial.forEach((el) => {
      if (!btnCaps.classList.contains('active')) {
      } else {
        el.classList.add('active-Upspecial');
      }
      el.classList.add('active-special');
    });
    btnAux.forEach((el) => {
      if (!btnCaps.classList.contains('active')) {
      } else {
        el.classList.add('active-Upspecial');
      }
      el.classList.add('active-special');
    });
    btn.forEach((el) => {
      if (
        !specialKeys.specialKey.includes(el.dataset.keycode) &&
        !btnCaps.classList.contains('active')
      ) {
        el.classList.add('active-up');
      } else {
      }
    });
  }
  if (btnCaps.classList.contains('active')) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      btn.forEach((el) => {
        if (
          !specialKeys.specialKey.includes(el.dataset.keycode) &&
          !el.classList.contains('keyboard__key-special')
        ) {
          el.children[0].classList.remove('active-Upspecial');
        }
      });
    }
  }
};

/*Remove events=======================================*/

const eventKeyRemove = (event) => {
  btn.forEach((el) => {
    if (event.code === el.dataset.keycode && event.code !== 'CapsLock') {
      el.classList.remove('active');
    }
  });
  if (
    btnShiftLeft.classList.contains('active') ||
    btnShiftRight.classList.contains('active')
  ) {
  } else {
    btnSpecial.forEach((el) => el.classList.remove('active-special'));
    btnAux.forEach((el) => el.classList.remove('active-special'));
    btn.forEach((el) => el.classList.remove('active-up'));
  }
  if (btnCaps.classList.contains('active')) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      btn.forEach((el) => {
        if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
          el.children[0].classList.add('active-Upspecial');
        }
      });
    }
  }
};

document.addEventListener('keydown', (event) => {
  eventKeyAdd(event);
});
document.addEventListener('keyup', (event) => {
  eventKeyRemove(event);
});
keyboard.addEventListener('mousedown', (event) => {
  eventKeyAdd(event.target);
});
keyboard.addEventListener('mouseup', (event) => {
  eventKeyRemove(event);
});

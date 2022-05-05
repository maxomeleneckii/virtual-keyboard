const keyLayout = {
  mainKey: {
    Backquote: '`',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    Backspace: 'backspace',
    Tab: 'tab',
    KeyQ: 'q',
    KeyW: 'w',
    KeyE: 'e',
    KeyR: 'r',
    KeyT: 't',
    KeyY: 'y',
    KeyU: 'u',
    KeyI: 'i',
    KeyO: 'o',
    KeyP: 'p',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    Delete: 'del',
    CapsLock: 'caps lock',
    KeyA: 'a',
    KeyS: 's',
    KeyD: 'd',
    KeyF: 'f',
    KeyG: 'g',
    KeyH: 'h',
    KeyJ: 'j',
    KeyK: 'k',
    KeyL: 'l',
    Semicolon: ';',
    Quote: "'",
    Enter: 'enter',
    ShiftLeft: 'shift',
    KeyZ: 'z',
    KeyX: 'x',
    KeyC: 'c',
    KeyV: 'v',
    KeyB: 'b',
    KeyN: 'n',
    KeyM: 'm',
    Period: '.',
    Comma: ',',
    Slash: '/',
    ArrowUp: 'arrowup',
    ShiftRight: 'shift ',
    ControlLeft: 'ctrl',
    MetaLeft: 'win',
    AltLeft: 'alt',
    Space: 'space',
    AltRight: 'alt',
    ControlRight: 'ctrl',
    ArrowLeft: 'arrowleft',
    ArrowDown: 'arrowdown',
    ArrowRight: 'arrowright',
  },
  auxiliarySymbols: {
    '`': '~',
    1: '!',
    2: '@',
    3: '#',
    4: '$',
    5: '%',
    6: ':',
    7: '?',
    8: '*',
    9: '(',
    0: ')',
    '-': '_',
    '=': '+',
    '\\': '/',
  },
};
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
    this.keyboard.append(this.createKeys(keyLayout.mainKey));
  }

  createKeys(obj) {
    for (let [key, value] of Object.entries(obj)) {
      this.key = document.createElement('button');
      this.key.classList.add('keyboard__key');
      this.key.setAttribute('data-keyCode', `${key}`);
      if (value === 'del' || value === 'enter') {
        this.key.textContent = value.toUpperCase();
      } else {
        this.key.textContent = value.slice(0, 1).toUpperCase() + value.slice(1);
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
        this.key.textContent = '';
        this.key.classList.add('arrow__up', 'arrow');
      } else if (value === 'arrowdown') {
        this.key.textContent = '';
        this.key.classList.add('arrow__down', 'arrow');
      } else if (value === 'arrowleft') {
        this.key.textContent = '';
        this.key.classList.add('arrow__left', 'arrow');
      } else if (value === 'arrowright') {
        this.key.textContent = '';
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
      for (let [key2, value2] of Object.entries(keyLayout.auxiliarySymbols)) {
        if (key2 === value) {
          this.span = document.createElement('span');
          this.span.classList.add('keyboard__key-aux');
          this.span.textContent = value2;
          this.key.append(this.span);
        }
      }
    }
    return this.keys;
  }
}
const specialKey = [
  'Tab',
  'CapsLock',
  'ShiftLeft',
  'ShiftRight',
  'MetaLeft',
  'AltLeft',
  'AltRight',
  'Space',
  'ControlLeft',
  'ControlRight',
  'Enter',
  'Delete',
  'Backspace',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];
let wrapper = new Keyboard('rgb(101 104 106)');
wrapper.createWrapper();

const textArea = document.querySelector('.content__area');
const btnCaps = document.querySelector(
  '.keyboard__key[data-keycode="CapsLock"'
);
const btn = document.querySelectorAll('.keyboard__key');

const writeArea = (item) => {
  let curPosCursor = textArea.selectionStart;
  const start = textArea.value.slice(0, curPosCursor);
  const end = textArea.value.slice(curPosCursor);
  for (let [key3, value3] of Object.entries(keyLayout.mainKey)) {
    if (btnCaps.classList.contains('active')) {
      value3 = value3.toUpperCase();
    }
    if (key3 === item.dataset.keycode) {
      if (!specialKey.includes(key3)) {
        textArea.value = `${start}${value3}${end}`;
        curPosCursor += 1;
      }
    }
  }
  if (item.dataset.keycode === 'Tab') {
    textArea.value += '    ';
  } else if (item.dataset.keycode === 'Space') {
    textArea.value += '  ';
  } else if (item.dataset.keycode === 'Backspace') {
    // textArea.value = textArea.value.slice(0, -1);
    // console.log(textArea.value);
  }
  textArea.setSelectionRange(curPosCursor, curPosCursor);
};

const eventKeyAdd = (event) => {
  btn.forEach((el) => {
    if (event.code === el.dataset.keycode && event.code === 'CapsLock') {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
      }
    }
    if (event.code === el.dataset.keycode && event.code !== 'CapsLock') {
      event.preventDefault();
      el.classList.add('active');
      writeArea(el, event);
    }
  });
};
const eventKeyRemove = (event) => {
  btn.forEach((el) => {
    if (event.code === el.dataset.keycode && event.code !== 'CapsLock') {
      el.classList.remove('active');
    }
  });
};

document.addEventListener('keydown', (event) => {
  eventKeyAdd(event);
});
document.addEventListener('keyup', (event) => {
  eventKeyRemove(event);
});

const keyLayout = {
  mainKey: [
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'backspace',
    'tab',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    '\\',
    'del',
    'caps lock',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    "'",
    'enter',
    'shift',
    '\\',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    '.',
    ',',
    '/',
    'arrowup',
    'shift ',
    'ctrl',
    'win',
    'alt',
    'space',
    'alt',
    'ctrl',
    'arrowleft',
    'arrowdown',
    'arrowright',
  ],
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
    for (let i = 0; i < obj.length; i++) {
      this.key = document.createElement('button');
      this.key.classList.add('keyboard__key');
      if (obj[i] === 'del' || obj[i] === 'enter') {
        this.key.textContent = obj[i].toUpperCase();
      } else {
        this.key.textContent =
          obj[i].slice(0, 1).toUpperCase() + obj[i].slice(1);
      }
      if (
        obj[i] === 'backspace' ||
        obj[i] === 'caps lock' ||
        obj[i] === 'shift'
      ) {
        this.key.style.flexBasis = 13 + '%';
        this.key.style.maxWidth = 10 + 'rem';
        this.key.style.background = this.color;
      } else if (obj[i] === 'enter') {
        this.key.style.flexBasis = 11 + '%';
        this.key.style.maxWidth = 7 + 'rem';
        this.key.style.background = this.color;
      } else if (obj[i] === 'space') {
        this.key.style.flexGrow = 1;
        this.key.style.maxWidth = 100 + '%';
        this.key.textContent = '';
      } else if (obj[i] === 'ctrl') {
        this.key.style.flexBasis = 8 + '%';
        this.key.style.maxWidth = 5 + 'rem';
        this.key.style.background = this.color;
      } else if (obj[i] === 'arrowup') {
        this.key.textContent = '';
        this.key.classList.add('arrow__up', 'arrow');
      } else if (obj[i] === 'arrowdown') {
        this.key.textContent = '';
        this.key.classList.add('arrow__down', 'arrow');
      } else if (obj[i] === 'arrowleft') {
        this.key.textContent = '';
        this.key.classList.add('arrow__left', 'arrow');
      } else if (obj[i] === 'arrowright') {
        this.key.textContent = '';
        this.key.classList.add('arrow__right', 'arrow');
      } else if (
        obj[i] === '`' ||
        obj[i] === 'tab' ||
        obj[i] === 'win' ||
        obj[i] === 'alt' ||
        obj[i] === 'del' ||
        obj[i] === 'shift '
      ) {
        this.key.style.background = this.color;
      }
      this.keys.append(this.key);
      for (let [key, value] of Object.entries(keyLayout.auxiliarySymbols)) {
        if (key === obj[i]) {
          this.span = document.createElement('span');
          this.span.classList.add('keyboard__key-aux');
          this.span.textContent = value;
          this.key.append(this.span);
        }
      }
    }
    return this.keys;
  }
}
let wrapper = new Keyboard('rgb(101 104 106)');
wrapper.createWrapper();

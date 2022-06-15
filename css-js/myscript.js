class Calculator {
  constructor(prijasnjiText, sadasnjiText) {
    this.prijasnjiText = prijasnjiText
    this.sadasnjiText = sadasnjiText
    this.clear()
  }

  clear() {
    this.sadasnjiRezultat = ''
    this.prijasnjiRezultat = ''
    this.operation = undefined
  }

  delete() {
    this.sadasnjiRezultat = this.sadasnjiRezultat.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.sadasnjiRezultat.includes('.')) return
    this.sadasnjiRezultat = this.sadasnjiRezultat.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.sadasnjiRezultat === '') return
    if (this.prijasnjiRezultat !== '') {
      this.compute()
    }
    this.operation = operation
    this.prijasnjiRezultat = this.sadasnjiRezultat
    this.sadasnjiRezultat = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prijasnjiRezultat)
    const current = parseFloat(this.sadasnjiRezultat)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.sadasnjiRezultat = computation
    this.operation = undefined
    this.prijasnjiRezultat = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.sadasnjiText.innerText =
      this.getDisplayNumber(this.sadasnjiRezultat)
    if (this.operation != null) {
      this.prijasnjiText.innerText =
        `${this.getDisplayNumber(this.prijasnjiRezultat)} ${this.operation}`
    } else {
      this.prijasnjiText.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-jednako]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prijasnjiText = document.querySelector('[data-prijasnji-rezultat]')
const sadasnjiText = document.querySelector('[data-sadasnji-rezultat]')

const calculator = new Calculator(prijasnjiText, sadasnjiText)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }

});

// backspace textarea

Ext.EventManager.on(window, 'keydown', function(e, t) {
    if (e.getKey() == e.BACKSPACE && 
        (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly)) {
        e.stopEvent();
    }
});

// backspace killer

    function killBackSpace(e){
        e = e? e : window.event;
        var t = e.target? e.target : e.srcElement? e.srcElement : null;
        if(t && t.tagName && (t.type && /(password)|(text)|(file)/.test(t.type.toLowerCase())) || t.tagName.toLowerCase() == 'textarea')
            return true;
        var k = e.keyCode? e.keyCode : e.which? e.which : null;
        if (k == 8){
            if (e.preventDefault) {
                e.preventDefault();
                document.${swf}.focus();
            }
            return false;
        };
        return true;
    };
    if(typeof document.addEventListener!='undefined')
        document.addEventListener('keydown', killBackSpace, false);
    else if(typeof document.attachEvent!='undefined')
        document.attachEvent('onkeydown', killBackSpace);
    else
    {
        if(document.onkeydown!=null){
            var oldOnkeydown=document.onkeydown;
            document.onkeydown=function(e){
                oldOnkeydown(e);
                killBackSpace(e);
            };
        }
        else
            document.onkeydown=killBackSpace;
    }

/**
 * Use data attributes instead of classes
 */
const numberbtns = document.querySelectorAll("[data-number]");
const operationbtns = document.querySelectorAll("[data-operation]");
const clearbtns = document.querySelector("[data-all-clear]");
const equalbtns = document.querySelector('[data-equals]');
const previousoperandresult = document.querySelector('[data-previous-operand]');
const currentoperandresult = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(currentoperandresult, previousoperandresult) {
    this.currentoperandresult = currentoperandresult;
    this.previousoperandresult = previousoperandresult;
    this.clear(); //This will be used to reset our inputs
  }
  /**
   * This is my first method
   * it deletes all displayed values
   */
  clear() {
    this.currentoperand = "";
    this.previousoperand = "";
    this.operation = undefined;
  }
  addNumber(number) {
    if (number === "." && this.currentoperand.includes(".")) return;
    this.currentoperand = this.currentoperand.toString() + number.toString();
  }
  /**
   * pass operation using this operation= operation
   * move current opeartion value to previous operation by this.previousoperand = this.currentoperand;
   * clear currentopearnd this.currentoperand = "";
   */
  chooseOperation(operation) {
    if (this.currentoperand === '') return
    if (this.previousoperand !== '') {
      this.compute()
    }
    this.operation = operation;
    this.previousoperand = this.currentoperand;
    this.currentoperand = "";
  }
  calculate() {
    let calculation;
    const previous = parseInt(this.previousoperand);
    const current = parseInt(this.currentoperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        calculation = previous + current;
        break;
      case "-":
        calculation = previous - current;
        break;
      case "*":
        calculation = previous * current;
        break;
      case "÷":
        calculation = previous / current;
        break;
      default:
        return
    }
    this.currentoperand = calculation;
    this.operation = undefined;
    this.previousoperand = '';
  }
  finalDisplay() {
    this.currentoperandresult.innerText = this.currentoperand;
    this.previousoperandresult.innerText = this.previousoperand;
  }
}
const calculator = new Calculator(previousoperandresult, currentoperandresult);

numberbtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.addNumber(button.innerText);
    calculator.finalDisplay();
  });
});

operationbtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.finalDisplay();
  });
});

equalbtns.addEventListener("click", () => {
    calculator.calculate();
    calculator.finalDisplay();
});

clearbtns.addEventListener("click", () => {
  calculator.clear();
  calculator.finalDisplay();
});

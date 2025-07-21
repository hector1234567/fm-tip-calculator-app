import { isDecimalNumber, isIntegerNumber } from "./helpers.js";
import { TipCalculatorStore } from "./store.js";

const tipCalculatorStore = new TipCalculatorStore("tipCalculatorStore");

const App = {
  $: {
    form: document.querySelector("form"),
    bill: document.getElementById("bill"),
    tipPercentages: document.querySelector(".radio-group"),
    people: document.getElementById("people"),
    amount: document.getElementById("amount"),
    custom: document.getElementById("custom"),
    customLabel: document.querySelector('[for="tip--custom"]'),
    total: document.getElementById("total"),
    reset: document.getElementById("reset"),
    setBillValue(value) {
      App.$.bill.value = value ? value : "";
    },
    setPeopleValue(value) {
      App.$.people.value = value ? value : "";
    },
    setTipValue(tip) {
      if (!tip) return;
      App.$.tipPercentages.querySelector(`[value="${tip}"]`).checked = true;
    },
    setCustomValue(value) {
      App.$.custom.value = value ? value : "";
    },
    setTotal(total) {
      App.$.total.innerText = total
        ? "$" + parseFloat(total).toFixed(2)
        : "$0.00";
    },
    setAmount(total, people) {
      if (!people || !total) return (App.$.amount.innerText = "$0.00");
      const totalFloat = parseFloat(total);
      const peopleInt = parseInt(people);
      if (peopleInt === 0) return (App.$.amount.innerText = "");
      App.$.amount.innerText = "$" + (totalFloat / peopleInt).toFixed(2);
    },
    focusCustom() {
      setTimeout(() => {
        App.$.custom.focus();
        App.$.custom.select();
      }, 100);
    },
    showCantBeZero(show) {
      if (show) {
        App.$.people.classList.add("error");
      } else {
        App.$.people.classList.remove("error");
      }
    },
  },
  init() {
    App.$.form.addEventListener("input", () => {
      const formData = new FormData(App.$.form);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      if (this.validateForm(data)) tipCalculatorStore.update({ ...data });
      this.render();
    });
    App.$.reset.addEventListener("click", () => {
      tipCalculatorStore.reset();
      this.render();
    });
    App.$.customLabel.addEventListener("click", App.$.focusCustom);
    this.render();
  },
  validateForm({ bill, custom, people }) {
    if (bill.length && !isDecimalNumber(bill)) return false;
    if (people.length && !isIntegerNumber(people)) return false;
    if (custom.length && !isDecimalNumber(custom)) return false;
    if (custom.length && Number(custom) > 100) return false;
    return true;
  },
  render() {
    const { bill, tip, custom, people, total } = tipCalculatorStore.get();
    App.$.setBillValue(bill);
    App.$.setPeopleValue(people);
    App.$.setTipValue(tip);
    App.$.setCustomValue(custom);
    App.$.setTotal(total);
    App.$.setAmount(total, people);
    App.$.showCantBeZero(Number(people) === 0);
  },
};
App.init();

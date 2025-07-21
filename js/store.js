export const TipCalculatorStore = class extends EventTarget {
  constructor(localStorageKey) {
    super();
    this.localStorageKey = localStorageKey;
    this._readStorage();
    // Getters
    this.get = () => ({ ...this.state, total: this._calculateTotal() });
  }
  _readStorage() {
    this.state = JSON.parse(
      window.localStorage.getItem(this.localStorageKey) || "{}"
    );
  }
  _save() {
    window.localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.state)
    );
    this.dispatchEvent(new CustomEvent("save"));
  }
  _calculateTotal() {
    const { bill, tip, custom } = this.state;
    if (tip === "custom") {
      return Number(bill) * (Number(custom) / 100);
    }
    return Number(bill) * (Number(tip) / 100);
  }
  // MUTATE methods
  update(newState) {
    this.state = { ...this.state, ...newState };
    this._save();
  }
  reset() {
    this.state = {};
    this._save();
  }
};

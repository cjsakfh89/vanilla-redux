import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");
number.innerText = 0;

const ACTION_ADD = "ADD";
const ACTION_MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ACTION_ADD:
      count++;
      break;

    case ACTION_MINUS:
      count--;
      break;

    default:
      break;
  }
  return count;
};

const countStore = createStore(countModifier);
countStore.subscribe(() => {
  number.innerText = countStore.getState();
});
add.addEventListener("click", () => countStore.dispatch({ type: ACTION_ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: ACTION_MINUS }));

import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");
number.innerText = 0;

const countModifier = (count = 0, action) => {
  if (action.type === "ADD") count++;
  if (action.type === "MINUS") count--;
  return count;
};

const countStore = createStore(countModifier);
countStore.subscribe(() => {
  number.innerText = countStore.getState();
});
add.addEventListener("click", () => countStore.dispatch({ type: "ADD" }));
minus.addEventListener("click", () => countStore.dispatch({ type: "MINUS" }));

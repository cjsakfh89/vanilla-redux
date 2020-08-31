import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ACTION_ADD_TODO = "ADD_TODO";
const ACTION_DELETE_TODO = "DELETE_TODO";

const toDos = [];

const addToDo = (text) => {
  return { type: ACTION_ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: ACTION_DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case ACTION_ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case ACTION_DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDo = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "DEL";
    button.addEventListener("click", dispatchDeleteToDo);

    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDo);

const createToDo = (toDo) => {
  const li = document.createElement("li");
  li.innerText = toDo;
  ul.appendChild(li);
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);

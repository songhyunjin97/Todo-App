import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isDone: false },
    { id: 1, content: "코딩 공부하기", isDone: false },
    { id: 2, content: "잠 자기", isDone: false},
  ]);

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue, isDone: false };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);
  const toggleDone = () => {
    setTodoList((prev) => prev.map((el) => el.id === todo.id ? { ...el, isDone: !el.isDone} : el));
  };
  return (
    <li>
      <input type="checkbox" checked={todo.isDone} onChange={toggleDone} />
      {isEdit ? (
        <>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            onClick={() => {
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
                )
              );
              setIsEdit(false);
            }}
          >
            저장
          </button>
        </>  
      ) : (
        <>
          {todo.content}
          <button onClick={() => setIsEdit(true)}>수정</button>
        </>
      )}
      <button
        onClick={() => 
          setTodoList((prev) => 
           prev.filter((el) => el.id !== todo.id))
        }
      >
        삭제
      </button>
    </li>
  );
}

export default App;

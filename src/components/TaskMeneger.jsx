import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));
  const [input, setInput] = useState("");

// сохраняет
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };
// добвляет 
  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;
    saveTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };
// галочки
  const toggle = (i) => {
    const newTasks = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    saveTasks(newTasks);
  };
// удаляет 
  const deleteTask = (i) => {
    saveTasks(tasks.filter((_, index) => index !== i));
  };
// удаляет все
  const clearAll = () => {
    saveTasks([]);
  };

  return (
    <>
      <form onSubmit={addTask}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">добавить</button>
      </form>
      
      <button onClick={clearAll}>Очистить все</button>
      
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
            <input type="checkbox" checked={t.done} onChange={() => toggle(i)} />
            <button onClick={() => deleteTask(i)}>удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}
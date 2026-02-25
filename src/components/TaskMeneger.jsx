import { useState } from "react";
export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggle = (i) => {
    const newTasks = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  return (
    <>
      <form onSubmit={addTask}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">add</button>
      </form>
      
      <button onClick={() => setTasks([])}>Очистить все</button>
      
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
            <input type="checkbox" checked={t.done} onChange={() => toggle(i)} />
          </li>
        ))}
      </ul>
    </>
  );
}
import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));
  const [input, setInput] = useState("");
  const [editingInput, setEditingInput] = useState("");
  const [currentEditTask, setCurrentEditTask] = useState(null)

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;
    saveTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggle = (i) => {
    const newTasks = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    saveTasks(newTasks);
  };

  const deleteTask = (i) => {
    saveTasks(tasks.filter((_, index) => index !== i));
  };

  const clearAll = () => {
    saveTasks([]);
  };

  const changeTask = (i) => {
    const newTasks = tasks.map((t, indx) => {
      if (i === indx) {
        return { ...t, text: editingInput };
      }
      return t;
    });
    saveTasks(newTasks);
    setCurrentEditTask(null);
    setEditingInput("");
  }

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
            {currentEditTask === i ? (
              <>
                <input 
                  type="text" 
                  value={editingInput} 
                  onChange={(e) => setEditingInput(e.target.value)} 
                />
                <button onClick={() => changeTask(i)}>сохранить</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                  {t.text}
                </span>
                <input 
                  type="checkbox" 
                  checked={t.done} 
                  onChange={() => toggle(i)} 
                />
                <button onClick={() => deleteTask(i)}>X
                </button>
                <button onClick={() => {
                  setCurrentEditTask(i);
                  setEditingInput(t.text); 
                }}>
                  изменить
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
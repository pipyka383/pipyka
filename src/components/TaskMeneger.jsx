import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));
  const [input, setInput] = useState("");
  const [editingInput, setEditingInput] = useState("");
  const [currentEditTask, setCurrentEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [deadlineTaskIndex, setDeadlineTaskIndex] = useState(null);
  
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;
    saveTasks([...tasks, { text: input, done: false, deadline: null }]);
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
    setSearchTerm("");
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
  };

  const addDeadline = (i) => {
    if (!deadlineInput) return;
    const newTasks = [...tasks];
    newTasks[i].deadline = deadlineInput;
    saveTasks(newTasks);
    setDeadlineInput("");
    setDeadlineTaskIndex(null);
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date() && !tasks.find(t => t.deadline === deadline)?.done;
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <form onSubmit={addTask}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">добавить</button>
      </form>
      
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")}>X</button>
        )}
      </div>
      
      <button onClick={clearAll}>Очистить все</button>
      
      <ul>
        {filteredTasks.map((t) => {
          const originalIndex = tasks.findIndex(task => task === t);
          const overdue = isOverdue(t.deadline);
          
          return (
            <li key={originalIndex}>
              {currentEditTask === originalIndex ? (
                <>
                  <input 
                    type="text" 
                    value={editingInput} 
                    onChange={(e) => setEditingInput(e.target.value)} 
                  />
                  <button onClick={() => changeTask(originalIndex)}>сохранить</button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                    {t.text}
                  </span>
                  {t.deadline && (
                    <span style={{ fontSize: "12px", marginLeft: "10px", color: overdue ? "red" : "green" }}>
                       {t.deadline}
                    </span>
                  )}
                  <input 
                    type="checkbox" 
                    checked={t.done} 
                    onChange={() => toggle(originalIndex)} 
                  />
                  <button onClick={() => deleteTask(originalIndex)}>X</button>
                  <button onClick={() => {
                    setCurrentEditTask(originalIndex);
                    setEditingInput(t.text);
                  }}>
                    изменить
                  </button>
                  {deadlineTaskIndex === originalIndex ? (
                    <>
                      <input 
                        type="date" 
                        value={deadlineInput} 
                        onChange={(e) => setDeadlineInput(e.target.value)} 
                      />
                      <button onClick={() => addDeadline(originalIndex)}>✔</button>
                    </>
                  ) : (
                    <button onClick={() => setDeadlineTaskIndex(originalIndex)}>📅</button>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
      
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <p style={{ color: "gray" }}>Задачи не найдены</p>
      )}
    </>
  );
}
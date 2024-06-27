import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./components/Todolist";

export type FilterValueType = "all" | "active" | "compeled";

function App() {
  let initialTasks = [
    {
      id: 1,
      title: "HTML",
      isDone: true,
    },
    {
      id: 2,
      title: "CSS",
      isDone: true,
    },
    {
      id: 3,
      title: "JS",
      isDone: false,
    },
  ];

  let [tasks, setTask] = useState(initialTasks);

  function removeTask(id: number) {
    let newTasks = tasks.filter((t) => t.id !== id);
    setTask(newTasks);
  }

  let [filter, setFilter] = useState<FilterValueType>("all");

  let filteredTasks = tasks;

  function filterTask(value: FilterValueType) {
    setFilter(value);
  }

  if(filter === "active") {
    filteredTasks = tasks.filter((t) => t.isDone === false)
  }

  if(filter === "compeled") {
    filteredTasks = tasks.filter((t) => t.isDone === true)
  }

  return (
    <div className="App">
      <Todolist title="What to do?" tasks={filteredTasks} removeTask={removeTask} filterTask={filterTask} />
    </div>
  );
}

export default App;

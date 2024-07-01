import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "compeled";

type TodolistType = {
  id: string,
  title: string,
  filter: FilterValueType,
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let newNewTasks = tasks[todolistId];

    let newTasks = newNewTasks.filter((t) => t.id != id);
    tasks[todolistId] = newTasks;

    setTasks({...tasks});
  }
  

  function filterTask(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if(todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }   
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {
      id: todolistId1, 
      title: "What to learn", 
      filter: "all"
    }, 
    {
      id: todolistId2, 
      title: "What to buy", 
      filter: "compeled"
    }, 
  ]);

  let [tasks, setTasks] = useState({
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
    ],

    [todolistId2]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
    ]


  })

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let newTasks = tasks[todolistId];

    let newNewTasks = [newTask, ...newTasks];
    tasks[todolistId] = newNewTasks;
    setTasks({...tasks});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let newTasks = tasks[todolistId];
    let task = newTasks.find((t) => t.id === taskId);
    if(task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }    
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter((td) => td.id !== todolistId);
    setTodolists(filteredTodolists);  
    delete tasks[todolistId];
    setTasks({...tasks});
  }

  return (
    <div className="App">
      {
        todolists.map((tl) => {
          let filteredTasks = tasks[tl.id];

          if (tl.filter === "active") {
            filteredTasks = tasks[tl.id].filter((t) => t.isDone === false);
          }
        
          if (tl.filter === "compeled") {
            filteredTasks = tasks[tl.id].filter((t) => t.isDone === true);
          }

          return <Todolist
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={filteredTasks}
          removeTask={removeTask}
          filterTask={filterTask}
          addTask={addTask}
          changeStatus={changeStatus}
          filter={tl.filter}
          removeTodolist={removeTodolist}
        />
        })
      }      

    </div>
  );
}

export default App;

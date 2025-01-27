import React, { useState } from "react";

export default function ToDoApp() {
  const initTodos = [
    {
      id: 1,
      title: "Learn React",
      completed: false,
      isEdit: false,
    },
    {
      id: 2,
      title: "Learn Vue",
      completed: true,
      isEdit: false,
    },
    {
      id: 3,
      title: "Learn Angular",
      completed: false,
      isEdit: false,
    },
  ];
  const [todos, setTodos] = useState(initTodos);
  const [todoName, setTodoName] = useState("");

  const addNewTodo = () => {
    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      title: todoName,
      completed: false,
      isEdit: false,
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
  };
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const editTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        // todo.completed = !todo.completed;
        todo.isEdit = true;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        name="todoName"
        onChange={(e) => setTodoName(e.target.value)}
        value={todoName}
        placeholder="Enter new todo"
      />
      <button onClick={addNewTodo}>Add new</button>
      <div className="table">
        <table
          border={1}
          style={{ borderCollapse: "collapse", marginLeft: "20px" }}
        >
          <thead>
            <tr>
              {Object.keys(initTodos[0]).map((key) => {
                if (key !== "isEdit") {
                  return (
                    <th style={{ padding: "5px" }} key={key}>
                      {key}
                    </th>
                  );
                }
                return null;
              })}
              <th style={{ padding: "5px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                {Object.keys(todo).map((key) =>
                  key !== "isEdit" ? (
                    <td style={{ padding: "5px" }} key={key}>
                      {(() => {
                        if (key !== "completed")
                          return !todo["isEdit"] ? todo[key] : "";
                        return todo[key] ? "Yes" : "No";
                      })()}
                    </td>
                  ) : null
                )}
                <td style={{ padding: "5px" }}>
                  <button onClick={(e) => editTodo(todo.id)}>Edit</button>
                  <button onClick={(e) => deleteTodo(todo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

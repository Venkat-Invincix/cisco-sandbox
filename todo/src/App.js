import './App.css';
// importing app.css for using style
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap'; //Component from react-bootstrap we installed
import 'bootstrap/dist/css/bootstrap.min.css';//import bootstrap for enhanced UI

//Component build for a single TODO Item
function Todo({ todo, index, markTodo, removeTodo }) {
  // we can directly get the properties withouting using props
  return (
    <div
      className="todo">
      {/* react does not support class it support className */}
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      {/* if todo.isDone returns true then textDecoration style is added to that element */}
      <div>
        {/* onclick of the button that data is goes to mark as todo  */}
        {/* button is component of react-bootstrap */}
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        {/* onclick of button that data removed from the list */}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}


function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");   //useState for state managment ReactHooks
  //it handles the submit in the form on submit press it sends data to the parent Component using callback
  const handleSubmit = e => {
    // e.preventDefault() is used for preventing reloading
    e.preventDefault();
    if (!value) return;
    // if value is not there then return nothing
    addTodo(value);
    // if value is there then set the value to the state
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* handleSubmit is a function get calls when submit button clicks */}
      <Form.Group>
        <Form.Label><b> Add Todo</b></Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          // value is state used for store input data to that variable
          onChange={e => setValue(e.target.value)}
          // onChange of the input the callback function call updater fuction and update the value state
          placeholder="Add new todo" />
      </Form.Group>

      <Button variant="secondary mt-2 mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}



function App() {

  //This is a sample TODO In a list of TODO
  // in the initial value i put array of objects
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false
    }
  ]);
  //This function handles adding todo in the list
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    // in this i use sprade operator so all the array of objects 
    // convert to only object and add new object in the array
    setTodos(newTodos);
    // then set the new todo
  };

  //once todo is done it updates the list to mark it done
  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    // update the perticular 
    setTodos(newTodos);
  };

  //on delete of a todo this function delete the todo
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    // using splice remove the perticular value and then using setTodos() set the updated array
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        {/* FormTodo component is used here */}
        <FormTodo addTodo={addTodo} />
        {/* map is used for mapping list of elements and key is used for every map element */}
        <div>
          {todos.map((todo, index) => (
            <Card>
              {/* card is a component of react bootstarp */}
              <Card.Body>
                {/* call the TODO component here and pass properties to that component */}
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

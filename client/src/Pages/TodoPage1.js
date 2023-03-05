import {useContext, useEffect, useState} from "react";
//import UserContext from "./UserContext";
import axios from "axios";
import Form from '../Components/Form/form';
import Card from '../Components/Card/Card';
import {Link} from 'react-router-dom';

function TodoPage() {
  //const userInfo = useContext(UserContext);
  const [addToDo, setAddToDo] = useState('');
  const [todos,setTodos] = useState([]);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  async function fetchApiData(){
    let url = "http://127.0.0.1:5000/api";

    try {
      const results = await axios.get(url);
      console.log("results is " + results.data);
      let items = results.data;
      setTodos(items);
      items.map((it, i) => {
        console.log(it.task_name + " " + i );
      });
    } catch(error) {
      console.log("Error is " + error);   
    }   
  }

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleFormSubmit = () => {
    // send data to backend 
    let url = "http://127.0.0.1:5000/api/add";
    let res = {}
    let val = "";
    let task_name = addToDo;
    const addData = async function () {
      console.log("task_name " + addToDo)
      res = await axios.post(url, {task_name} )  
      console.log("res " + res.data['msg'])
      fetchApiData();
    };
    addData();
    setAddToDo('');
    setIsAddedSuccess(true)
    if ( isAddedSuccess === true){
      setIsAddedSuccess(false);
    }
  }

  // user types gets reflected on form field, changes state of addToDo
  const handleFormChange = (inputValue) => {
    setAddToDo(inputValue);
    console.log(addToDo);
  }

 
  // function addTodo(e) {
  //   e.preventDefault();
  //   let url = "http://127.0.0.1:5000/api/add";
  //   console.log("adding")
  //   const addData = async function () {
  //     console.log("task_name " + inputVal)
  //     const res = await axios.post(url, {inputVal} )  
  //     console.log("res " + res.data['msg'])
  //     fetchApiData();
  //   };
    
  //   addData();
   
  //   // axios.post('http://127.0.0.1:5000/api/add', {text:inputVal}, {withCredentials:true})
  //   //   .then(response => {
  //   //     setTodos([...todos, response.data]);
  //   //     setInputVal('');
  //   //   })

  // }

  function updateTodo(t, newState) {
    console.log("updating");
    let url = `http://127.0.0.1:5000/api/update/${t.id}`;
    console.log("task_name " + t.task_name + " id is " + t.id + " state " + newState)
    const data = {id:t.id, complete:newState};
    const updateData = async function () {
      const res = await axios.post(url, {id:t.id, complete:!t.complete} )  
      console.log("res " + res.data['msg'])
      fetchApiData();
    };
    updateData();
    setIsAddedSuccess(true)
    if ( isAddedSuccess === true){
      setIsAddedSuccess(false);
    }
    // axios.post('http://localhost:4000/todos', data, {withCredentials:true})
    //   .then(() => {
    //     const newTodos = todos.map(t => {
    //       if (t._id === todo._id) {
    //         t.done = !t.done;
    //       }
    //       return t;
    //     });
    //     setTodos([...newTodos]);
    //   });
  }

    return (
    <>
      <Form userInput={addToDo} 
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}>      
      </Form>
      { todos.map( t => (
          <ul key={t.id}>
            <li>
              <input type="checkbox"
                defaultChecked={t.complete}
                onClick={() => updateTodo(t, !(t.complete))}
              />
               {/* {t.complete ? <del>{t.task_name}</del> : t.task_name} */}
              <Link to={`${t.id}`}>{t.task_name}</Link>
            </li>
          </ul>
        ))
      }
      {/* <Card listOfTodos={todos}/> */}
    </>
  )
}

export default TodoPage;

  // return <div>
  //   <form onSubmit={e => addTodo(e)}>
  //     <input placeholder={'What do you want to do?'}
  //            value={inputVal}
  //            onChange={e => setInputVal(e.target.value)}/>
  //   </form>
  //   <ul>
  //     {todos.map(todo => (
  //       <li>
  //         <input type={'checkbox'}
  //                checked={todo.complete}
  //                onClick={() => updateTodo(todo)}
  //         />
  //         {todo.complete ? <del>{todo.task_name}</del> : todo.task_name}
  //       </li>
  //     ))}

  //   </ul>
  // </div>




// import React, {useState, useEffect} from 'react';
// import Card from '../Components/Card/Card';
// import Form from '../Components/Form/form';
// import axios from "axios";


// function TodoPage(){
//   const [todo, setTodo] = useState([]);
//   const [addToDo, setAddToDo] = useState('');
//   const [isAddedSuccess, setIsAddedSuccess] = useState(false);

//   async function fetchApiData(){
//     let url = "http://127.0.0.1:5000/api";

//     try {
//       const results = await axios.get(url);
//       console.log("results is " + results.data);
//       let items = results.data;
//       setTodo(items);
//       items.map((it, i) => {
//         console.log(it.task_name + " " + i );
//       });
//     } catch(error) {
//       console.log("Error is " + error);   
//     }   
//   }

//   useEffect(() => { 
//     console.log("UseEffect");
//     fetchApiData();
//     console.log("in use" + isAddedSuccess)
//   }, []);

//   // user types gets reflected on form field, changes state of addToDo
//   const handleFormChange = (inputValue) => {
//     setAddToDo(inputValue);
//     console.log(addToDo);
//   }

//   const handleFormSubmit = () => {
//     // send data to backend 
//     let url = "http://127.0.0.1:5000/api/add";
//     let res = {}
//     let val = "";
//     let task_name = addToDo;
  
//     const addData = async function () {
//       console.log("task_name " + addToDo)
//       res = await axios.post(url, {task_name} )  
//       console.log("res " + res.data['msg'])
//       fetchApiData();
//     };
//     addData();
//     setAddToDo('');
//     setIsAddedSuccess(true)
//     if ( isAddedSuccess === true){
//       setIsAddedSuccess(false);
//     }
//   }


//   return (
//     <>
//       <Form userInput={addToDo} 
//             onFormChange={handleFormChange}
//             onFormSubmit={handleFormSubmit}>      
//       </Form>
//       <Card listOfTodos={todo}/>
//     </>
//   )
// }

// export default TodoPage;
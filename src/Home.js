import React, { useState } from "react";
import { Link } from "react-router-dom";
import Todo from "./Todos";
import CreateTodo from "./Create";
import DoneTodo from "./Done";

function Home() {
    var [getTodo, setTodo] = useState([]);
    var [getDone, setDone] = useState([]);
    var [getBtnState, setBtnState] = useState(1);

    var createBtnState = () => {
        setBtnState(1);
    }

    var todoBtnState = () => {
        setBtnState(2);
    }

    var doneBtnState = () => {
        setBtnState(3);
    }

    if (getBtnState == 1) {
        return (
            <>
                <h1 className="fw-bold text-light pt-3">Todo App</h1>

                <div className="row px-5 mt-5">
                    <Todo items={getTodo} setItems={setTodo} setFinished={setDone} getFinished={getDone} />
                    <div className="fixed-bottom d-flex justify-content-end">
                        <button className="btn btn-success mb-4 me-2 rounded-circle fs-3 fw-bold py-2 px-4" onClick={doneBtnState}>✔</button>  
                        <button className="btn btn-primary mb-4 me-3 rounded-circle fs-3 fw-bold py-2 px-4" onClick={todoBtnState}>+</button>                        
                    </div>
                </div>
            </>
        );
    } else if (getBtnState == 2) {
        return (
            <>
                <h1 className="fw-bold pt-3 text-light">Todo App</h1>

                <div className="row px-5">
                    <CreateTodo btnState={createBtnState} setItems={setTodo} getItems={getTodo} />                    
                </div>
            </>
        );
    } else if (getBtnState == 3) {
        return (
            <>
                <h1 className="fw-bold pt-3 text-light">Finished Task's</h1>

                <div className="row px-5 mt-5">
                    <DoneTodo finished={getDone} setFinished={setDone} />
                    <div className="fixed-bottom d-flex justify-content-start">
                        <button className="btn btn-primary mb-4 ms-5 rounded-circle fs-3 fw-bold py-2 px-4" onClick={createBtnState}>←</button>                          
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
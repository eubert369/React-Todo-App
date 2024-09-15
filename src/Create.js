import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// var index = 0;

function CreateTodo(props) {
    var [getTitle, setTitle] = useState('');
    var [getText, setText] = useState('');
    var date = new Date();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var inputTitle = (e) => {
        setTitle(e.target.value);
    }

    var inputText = (e) => {
        setText(e.target.value);
    }

    var saveButton = async (e) => {
        if (getTitle.length === 0 || getText.length === 0) {
            alert('Nothing to save!');
        } else {
            // props.setItems([...props.getItems, {
            //     id: index++,
            //     title: getTitle,
            //     text: getText,
            //     date_created: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
            // }]);

            try {
                const docRef = await addDoc(collection(db, 'todos'), {
                    title: getTitle,
                    text: getText,
                    date_created: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
                });                
                console.log(docRef);

            } catch (error) {
                console.error(error);
            }

            alert('Your Todo has been finally saved!');
            setTitle('');
            setText('');
        }
    }

    return (
        <>
            <input type="text" className="title-input border-top-0 border-start-0 bg-dark text-light border-end-0 border-2 border-light w-100 mx-5 mx-auto fs-3 px-2 fw-bold mt-3" placeholder="Title" onChange={inputTitle} value={getTitle} />
            <textarea className="w-100 mx-5 mx-auto mt-4 h-100 todo-textarea fs-5 p-3 bg-dark border-0 text-light" rows={13} placeholder="Description" onChange={inputText} value={getText} />
            <div className="row position-absolute bottom-0 start-50 translate-middle-x mx-auto mx-5 px-5 mb-5">
                <button className="btn btn-outline-primary mt-2 fw-bold col mx-4" onClick={() => {
                    props.fetch();
                    props.btnState();                    
                        }}>Back</button>
                <button className="btn btn-outline-warning mt-2 fw-bold col mx-4" onClick={saveButton}>Save</button>
            </div>


        </>
    );
}

export default CreateTodo;
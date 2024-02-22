import React, { useEffect, useState } from "react";
import del_icon from './images/icons8-delete-30.png';
import done_icon from './images/icons8-done-26.png'

function Todo(props) {
    var date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (props.items.length > 0) {
        return (
            <>
                {props.items.map((item) => {
                    return (
                        <div className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark mb-3 position-relative bg-light">
                        <p className="my-0 text-start text-info fw-bold">Status: (Pending)</p>
                            <p className="my-0 text-start fw-bold">{item.date_created}</p>
                            <h3 className="text-start fw-bold">{item.title}</h3>
                            <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
                            <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">                                
                                <button className="btn btn-danger rounded-5 me-1 fw-bold action-btn" onClick={() => {
                                    props.setItems(props.items.filter(a => a.id !== item.id))
                                }}><img src={del_icon} /></button>
                                <button className="btn btn-primary rounded-5 ms-1 fw-bold action-btn" onClick={() => {
                                    props.setFinished([...props.getFinished, {
                                        id: item.id,
                                        title: item.title,
                                        text: item.text,
                                        date_created: item.date_created,
                                        date_finished: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
                                    }]);
                                    props.setItems(props.items.filter(a => a.id !== item.id));
                                }}><img src={done_icon}/></button>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    } else {
        return (
            <>
                <h3 className="text-warning" >No Todo's Available</h3>
            </>
        );
    }
}

export default Todo;
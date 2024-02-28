import React, { useEffect, useState } from "react";
import del_icon from './images/icons8-delete-30.png';
import { db } from "./firebaseConfig";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

function DoneTodo(props) {
    var [getDone, setDone] = useState([]);

    var fetchDone = async () => {
        await getDocs(collection(db, "finished"))
            .then((query) => {
                const newData = query.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setDone(newData);
            })
    };

    useEffect(() => {
        fetchDone();
    }, []);

    var handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'finished', id));
            fetchDone();
        } catch (error) {
            console.error(error);
        }
    }

    if (getDone.length > 0) {
        if (props.searched.length > 0) {
            return (
                <>
                    {getDone.map((item, i) => {
                        if (item.title.includes(props.searched) || item.text.includes(props.searched)) {
                            return (
                                <div key={i} className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark bg-light mb-3 position-relative">
                                    <p className="my-0 text-start text-success fw-bold">Status: (Done)</p>
                                    <p className="my-0 text-start fw-bold">Date Created: {item.date_created}</p>
                                    <p className="my-0 text-start fw-bold">Date Finished: {item.date_finished}</p>
                                    <h3 className="text-start fw-bold">{item.title}</h3>
                                    <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
                                    <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
                                        <button className="btn btn-danger rounded-5 ms-1 fw-bold action-btn" onClick={() => {
                                            // props.setFinished(getDone.filter(a => a.id !== item.id))
                                            handleDelete(item.id)
                                        }} ><img src={del_icon} alt="delete icon" /></button>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </>
            );
        } else {
            return (
                <>
                    {getDone.map((item, i) => {
                        return (
                            <div key={i} className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark bg-light mb-3 position-relative">
                                <p className="my-0 text-start text-success fw-bold">Status: (Done)</p>
                                <p className="my-0 text-start fw-bold">Date Created: {item.date_created}</p>
                                <p className="my-0 text-start fw-bold">Date Finished: {item.date_finished}</p>
                                <h3 className="text-start fw-bold">{item.title}</h3>
                                <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
                                <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
                                    <button className="btn btn-danger rounded-5 ms-1 fw-bold action-btn" onClick={() => {
                                        // props.setFinished(getDone.filter(a => a.id !== item.id))
                                        handleDelete(item.id)
                                    }} ><img src={del_icon} alt="delete icon" /></button>
                                </div>
                            </div>
                        );
                    })}
                </>
            );
        }
    } else {
        return (
            <>
                <h3 className="mt-5 text-danger">No Finished Task's</h3>
            </>
        );
    }


    // if (props.finished.length > 0) {
    //     if (props.searched.length > 0) {
    //         return (
    //             <>
    //                 {props.finished.map((item) => {
    //                     if (item.title.includes(props.searched) || item.text.includes(props.searched)) {
    //                         return (
    //                             <div className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark bg-light mb-3 position-relative">
    //                                 <p className="my-0 text-start text-success fw-bold">Status: (Done)</p>
    //                                 <p className="my-0 text-start fw-bold">Date Created: {item.date_created}</p>
    //                                 <p className="my-0 text-start fw-bold">Date Finished: {item.date_finished}</p>
    //                                 <h3 className="text-start fw-bold">{item.title}</h3>
    //                                 <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
    //                                 <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
    //                                     <button className="btn btn-danger rounded-5 ms-1 fw-bold action-btn" onClick={() => {
    //                                         props.setFinished(props.finished.filter(a => a.id !== item.id))
    //                                     }} ><img src={del_icon} alt="delete icon" /></button>
    //                                 </div>
    //                             </div>
    //                         );
    //                     }
    //                 })}
    //             </>
    //         );
    //     } else {
    //         return (
    //             <>
    //                 {props.finished.map((item) => {
    //                     return (
    //                         <div className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark bg-light mb-3 position-relative">
    //                             <p className="my-0 text-start text-success fw-bold">Status: (Done)</p>
    //                             <p className="my-0 text-start fw-bold">Date Created: {item.date_created}</p>
    //                             <p className="my-0 text-start fw-bold">Date Finished: {item.date_finished}</p>
    //                             <h3 className="text-start fw-bold">{item.title}</h3>
    //                             <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
    //                             <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
    //                                 <button className="btn btn-danger rounded-5 ms-1 fw-bold action-btn" onClick={() => {
    //                                     props.setFinished(props.finished.filter(a => a.id !== item.id))
    //                                 }} ><img src={del_icon} alt="delete icon" /></button>
    //                             </div>
    //                         </div>
    //                     );
    //                 })}
    //             </>
    //         );
    //     }        
    // } else {
    //     return (
    //         <>
    //             <h3 className="mt-5 text-danger">No Finished Task's</h3>
    //         </>
    //     );
    // }
}

export default DoneTodo;
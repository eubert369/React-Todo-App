import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import del_icon from "./images/icons8-delete-30.png";
import done_icon from "./images/icons8-done-26.png";
// import { useEffect, useState } from 'react';

function Todo(props) {
  // var [todo, setTodo] = useState([]);
  var date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleFinished = async (item) => {
    try {
      await addDoc(collection(db, "finished"), {
        title: item.title,
        text: item.text,
        date_created: item.date_created,
        date_finished: `${
          months[date.getMonth()]
        } ${date.getDay()}, ${date.getFullYear()}`,
      });

      await deleteDoc(doc(db, "todos", item.id));
      props.fetch();
    } catch (error) {
      console.error(error);
    }
    console.log(item);
  };

  const handleDelete = async (id) => {
    // try {
    //     await deleteDoc(doc(db, 'todos', id));
    //     props.fetch();
    // } catch (error) {
    //     console.error(error);
    // }

    var delAction = window.confirm("Are you sure you want to delete?");

    if (delAction === true) {
      try {
        await deleteDoc(doc(db, "todos", id));
        props.fetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (props.getTodo.length > 0) {
    if (props.searched.length > 0) {
      return (
        <>
          {props.getTodo.map((item, i) => {
            if (
              item.title.includes(props.searched) ||
              item.text.includes(props.searched)
            ) {
              return (
                <div
                  key={i}
                  className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark mb-3 position-relative bg-light"
                >
                  <p className="my-0 text-start text-info fw-bold">
                    Status: (Pending)
                  </p>
                  <p className="my-0 text-start fw-bold">{item.date_created}</p>
                  <h3 className="text-start fw-bold">{item.title}</h3>
                  <p className="mx-3 fw-bold mb-0 todo-text">
                    {item.text.replace("\n", "<br/>")}
                  </p>
                  <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
                    <button
                      className="btn btn-danger rounded-5 me-1 fw-bold action-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <img src={del_icon} alt="delete icon" />
                    </button>
                    <button
                      className="btn btn-primary rounded-5 ms-1 fw-bold action-btn"
                      onClick={() => {
                        handleFinished(item);
                      }}
                    >
                      <img src={done_icon} alt="done icon" />
                    </button>
                  </div>
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </>
      );
    } else {
      return (
        <>
          {props.getTodo.map((item, i) => {
            return (
              <div
                key={i}
                className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark mb-3 position-relative bg-light"
              >
                <p className="my-0 text-start text-info fw-bold">
                  Status: (Pending)
                </p>
                <p className="my-0 text-start fw-bold">{item.date_created}</p>
                <h3 className="text-start fw-bold">{item.title}</h3>
                <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
                <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
                  <button
                    className="btn btn-danger rounded-5 me-1 fw-bold action-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <img src={del_icon} alt="delete icon" />
                  </button>
                  <button
                    className="btn btn-primary rounded-5 ms-1 fw-bold action-btn"
                    onClick={() => {
                      // props.setFinished([...props.getFinished, {
                      //     id: item.id,
                      //     title: item.title,
                      //     text: item.text,
                      //     date_created: item.date_created,
                      //     date_finished: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
                      // }]);
                      // props.setItems(props.items.filter(a => a.id !== item.id));
                      handleFinished(item);
                    }}
                  >
                    <img src={done_icon} alt="done icon" />
                  </button>
                </div>
              </div>
            );
          })}
          {/* <p>{props.getTodo.length}</p> */}
        </>
      );
    }
  } else {
    return (
      <>
        {/* <h3 className="text-warning mt-5" >No Todo's Available</h3> */}
        <h3 className="text-warning mt-5">{props.textLoad}</h3>
      </>
    );
  }

  // if (props.items.length > 0) {
  //     if (props.searched.length > 0) {
  //         return (
  //             <>
  //                 {props.items.map((item) => {
  //                     if (item.title.includes(props.searched) || item.text.includes(props.searched)) {
  //                         return (
  //                             <div className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark mb-3 position-relative bg-light">
  //                                 <p className="my-0 text-start text-info fw-bold">Status: (Pending)</p>
  //                                 <p className="my-0 text-start fw-bold">{item.date_created}</p>
  //                                 <h3 className="text-start fw-bold">{item.title}</h3>
  //                                 <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
  //                                 <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
  //                                     <button className="btn btn-danger rounded-5 me-1 fw-bold action-btn" onClick={() => {
  //                                         props.setItems(props.items.filter(a => a.id !== item.id))
  //                                     }}><img src={del_icon} alt='delete icon' /></button>
  //                                     <button className="btn btn-primary rounded-5 ms-1 fw-bold action-btn" onClick={() => {
  //                                         props.setFinished([...props.getFinished, {
  //                                             id: item.id,
  //                                             title: item.title,
  //                                             text: item.text,
  //                                             date_created: item.date_created,
  //                                             date_finished: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
  //                                         }]);
  //                                         props.setItems(props.items.filter(a => a.id !== item.id));
  //                                     }}><img src={done_icon} alt='done icon' /></button>
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
  //                 {props.items.map((item) => {
  //                     return (
  //                         <div className="border justify-content-start mx-5 mx-auto px-4 py-3 rounded-4 border-dark mb-3 position-relative bg-light">
  //                             <p className="my-0 text-start text-info fw-bold">Status: (Pending)</p>
  //                             <p className="my-0 text-start fw-bold">{item.date_created}</p>
  //                             <h3 className="text-start fw-bold">{item.title}</h3>
  //                             <p className="mx-3 fw-bold mb-0 todo-text">{item.text}</p>
  //                             <div className="position-absolute top-0 end-0 d-flex mx-3 mt-2">
  //                                 <button className="btn btn-danger rounded-5 me-1 fw-bold action-btn" onClick={() => {
  //                                     props.setItems(props.items.filter(a => a.id !== item.id))
  //                                 }}><img src={del_icon} alt='delete icon' /></button>
  //                                 <button className="btn btn-primary rounded-5 ms-1 fw-bold action-btn" onClick={() => {
  //                                     props.setFinished([...props.getFinished, {
  //                                         id: item.id,
  //                                         title: item.title,
  //                                         text: item.text,
  //                                         date_created: item.date_created,
  //                                         date_finished: `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
  //                                     }]);
  //                                     props.setItems(props.items.filter(a => a.id !== item.id));
  //                                 }}><img src={done_icon} alt='done icon' /></button>
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
  //             <h3 className="text-warning mt-5" >No Todo's Available</h3>
  //         </>
  //     );
  // }
}

export default Todo;

import React, { useEffect, useState } from "react";
import Todo from "./Todos";
import CreateTodo from "./Create";
import DoneTodo from "./Done";
import search_icon from "./images/icons8-search-50.png";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  var [todo, setDbTodo] = useState([]);
  var [getTodo, setTodo] = useState([]);
  var [getDone, setDone] = useState([]);
  var [getBtnState, setBtnState] = useState(1);
  var [search, setSearch] = useState("");
  var [loading, setLoading] = useState("");

  const fetchData = async () => {
    setLoading("Loading ...");
    await getDocs(collection(db, "todos")).then((query) => {
      const newData = query.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDbTodo(newData);
      setLoading("No Todo's Available");
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  var createBtnState = () => {
    setBtnState(1);
  };

  var todoBtnState = () => {
    setBtnState(2);
  };

  var doneBtnState = () => {
    setBtnState(3);
  };

  var searchEvent = (event) => {
    setSearch(event.target.value);
    // if (event.key === 'Enter') {
    //     setSearch(event.target.value);
    // }
  };

  var handleSearchClick = async () => {
    // ZOMBIE DISREGARD
    // Firestore Add Data
    // try {
    //     const docRef = await addDoc(collection(db, 'todos'), {
    //         first_name: 'Marc Eubert',
    //         last_name: 'Contado',
    //         age: 21
    //     });
    //     // console.log("Document written with ID: ", docRef);
    //     console.log(docRef);
    // } catch (error) {
    //     console.error(error);
    // }
    // Firestore Read Data
    // const querySnapshot = await getDocs(collection(db, "todos"));
    // querySnapshot.forEach(async (doc) => {
    //     // console.log(`${doc.id} => ${doc.data()}`);
    //     console.log(doc.data().title);
    //     //     const docRef = doc(db, "cities", doc.id);
    //     //     const docSnap = await getDoc(docRef);
    //     //     if (docSnap.exists()) {
    //     //         console.log("Document data:", docSnap.data());
    //     //     } else {
    //     //         // docSnap.data() will be undefined in this case
    //     //         console.log("No such document!");
    //     //     }
    // });
    // END ZOMBIE
  };

  if (getBtnState === 1) {
    return (
      <>
        <h1 className="fw-bold text-light pt-3">Todo App</h1>

        <div className="row px-5 mt-5">
          <Search searchType={searchEvent} handleClick={handleSearchClick} />
          <Todo
            items={getTodo}
            setItems={setTodo}
            setFinished={setDone}
            getFinished={getDone}
            searched={search}
            getTodo={todo}
            fetch={fetchData}
            textLoad={loading}
          />
          <div className="fixed-bottom d-flex justify-content-end">
            <button
              className="btn btn-success mb-4 me-2 rounded-circle fs-3 fw-bold py-2 px-4"
              onClick={doneBtnState}
            >
              ✔
            </button>
            <button
              className="btn btn-primary mb-4 me-3 rounded-circle fs-3 fw-bold py-2 px-4"
              onClick={todoBtnState}
            >
              +
            </button>
          </div>
        </div>
      </>
    );
  } else if (getBtnState === 2) {
    return (
      <>
        <h1 className="fw-bold pt-3 text-light">Todo App</h1>

        <div className="row px-5">
          <CreateTodo
            btnState={createBtnState}
            setItems={setTodo}
            getItems={getTodo}
            fetch={fetchData}
          />
        </div>
      </>
    );
  } else if (getBtnState === 3) {
    return (
      <>
        <h1 className="fw-bold pt-3 text-light">Finished Task's</h1>

        <div className="row px-5 mt-5">
          <Search searchType={searchEvent} />
          <DoneTodo
            finished={getDone}
            setFinished={setDone}
            searched={search}
          />
          <div className="fixed-bottom d-flex justify-content-start">
            <button
              className="btn btn-primary mb-4 ms-5 rounded-circle fs-3 fw-bold py-2 px-4"
              onClick={createBtnState}
            >
              ←
            </button>
          </div>
        </div>
      </>
    );
  }
}

function Search(props) {
  return (
    <div className="input-group w-10 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search ..."
        onChange={props.searchType}
      />
      <label className="btn btn-primary" onClick={props.handleClick}>
        <img src={search_icon} className="img" alt="search icon" width={30} />{" "}
      </label>
    </div>
  );
}

export default Home;

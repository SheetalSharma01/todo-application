import React, { useState } from "react";
import logo from "../Images/logo.webp";

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please, add an Item!!");
    } else if (inputData && !toggleSubmit) {
        setItems (
            items.map((element) => {
                if (element.id === isEditItem) {
                    return {...element, name: inputData}
                }
                return element;
            })
        )
        setToggleSubmit(true);
        setInputData("");
        setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedData = items.filter((element) => {
      return index !== element.id;
    });
    setItems(updatedData);
  };

  const removeAll = () => {
    setItems([]);
    alert("Your items has been deleted");
  };

  const editItem = (id) => {
    let newEditItem = items.find((element) => {
      return element.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={logo} alt="logo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder=" 📝 Add Items here"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h1> {element.name} </h1>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(element.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Remove Item"
                      onClick={() => deleteItem(element.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECKLIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;

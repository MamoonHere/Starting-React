import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, updateTask,doneTask } from './taskSlice'


const Task = () => {
    const [text, setText] = useState('');
    const [updateCheck, setCheck] = useState(false);
    const [updateText, setUpdate] = useState('');
    const [updateID, setID] = useState(-1);
    const isMounted = useRef(false)

    useEffect(() => {        // Only runs when count2 values changes because that is in our dependency array. 
        if (isMounted.current === false)
        {
            isMounted.current = true;
        }
        else 
        {
            dispatch(updateTask({replacementText : updateText, index: updateID}));
        }
    }, [updateText])


    var count = 0;
    const tasks = useSelector((store) => store.tReducer);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (updateCheck === true)
        {
            setUpdate(text);
            //console.log(text);
            //console.log(updateText);
        }
        else
        {
            dispatch(addTask({taskList: [text]}));
        }
        setText('');
    }
    const handleDelete = (event) => {
        var id = event.target.id;
        id = id - 1 - 5;
        dispatch(deleteTask({index: id}))
    }
    const handleUpdate = (event) => {
        var id = event.target.id;
        id = id - 1 - 4;
        setText(tasks.taskList[id]);
        setCheck(true);
        setID(id);
    } 
    const handleDone = (event) => {
        var id = event.target.id;
        id = id - 1 - 6;
        dispatch(doneTask({index: id}));
        let div = document.getElementById(tasks.completeIndex + 101);
        div.style.cssText = 'border: 1px solid black;'
        id = id + 5
        document.getElementById(id).style.display = "none";
        id = id + 1
        document.getElementById(id).style.display = "none";
        id = id + 1
        document.getElementById(id).style.display = "none";
    }
    return (
        <>
        <form onSubmit={(event)=>handleSubmit(event)} style = {{marginLeft: "2.5%", marginTop:"2.5%"}}>
        <h1>Input Tasks</h1>
        <input type="text" onChange={(event)=>setText(event.target.value)} value = {text}></input>
        <input type="submit" style = {{marginLeft: "10px", marginTop:"10px"}}></input>
        </form>
        <br/>
        <br/>
        <div>
            {
                tasks.taskList.map((item) => 
                <div id = {count + 100} key = {count}>
                <ul key = {count + 1}>
                    <li key = {count + 1}>
                        <h5>Task Number {count = count + 1} : </h5>  <h6>{item}</h6>
                    </li>
                    <div id = {count + 4} className = 'btn btn-primary m-2' onClick={(event)=>handleUpdate(event)}>Update</div>
                    <div id = {count + 5}  className = 'btn btn-danger m-2' onClick={(event)=>handleDelete(event)}>Delete</div>
                    <div id = {count + 6}  className = 'btn btn-success m-2' onClick={(event)=>handleDone(event)}>Mark As Done</div>
                </ul>
                </div>
                )
            }
        </div>
        </>
    );
}

export default Task
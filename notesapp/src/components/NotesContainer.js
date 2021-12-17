import '../index.css';
import DisplayNotes from "./DisplayNotes";
import { useState } from 'react'
import ActionContainer from './ActionContainer';

const NotesContainer = (props) => {
    const [notes, setNotes] = useState([])
    const [viewState, setviewState] = useState("All")


    const onKeyUp = (e) => {
        if (e.key === 'Enter' && e.target.value !== "") {
            const newNote = { id: generateId(), value: e.target.value, activeState: true }
            setNotes([...notes, newNote])
            e.target.value = ""
        }
    }

    const onChkboxChange = (id) => {
        setNotes(notes.map((note) => note.id === id ? { ...note, activeState: !note.activeState } : note))

    }

    const onLabelDoubleClick = (id) => {
        console.log("onLabelDoubleClick", id)

    }

    const onClearComplete = () => {
        setNotes(notes.filter((note) => note.activeState))
    }

    const onAllButton = () => {
        setviewState("All")
    }

    const onActiveButton = () => {
        setviewState("Active")
    }

    const onCompletedButton = () => {
        setviewState("Completed")
    }

    return (
        <header className="notescontainer">
            <input className="inputField" type="text" placeholder="What needs to be done?" onKeyUp={onKeyUp}></input>
            <DisplayNotes notes={notes} viewState={viewState} onChkboxChange={onChkboxChange} onLabelDoubleClick={onLabelDoubleClick} />
            <ActionContainer notes={notes} onAllButton={onAllButton} onActiveButton={onActiveButton} onCompletedButton={onCompletedButton} onClearComplete={onClearComplete} />
        </header>
    )
}

export default NotesContainer;

function generateId() {
    let id = () => {
        return Math.floor((1 + Math.random()) * 0x100000)
            .toString(16)
            .substring(1);
    }
    return id();
}



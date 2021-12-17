import NoteItem from './NoteItem'

const DisplayNotes = ({ notes, viewState, onChkboxChange, onLabelDoubleClick }) => {

    return (
        <>
            {notes.map((note) => (
                <NoteItem key={note.id} note={note} onChkboxChange={onChkboxChange} onLabelDoubleClick={onLabelDoubleClick} style={ (viewState !== "Completed" && note.activeState) || (viewState !== "Active" && !note.activeState) ? { display: 'block' } : { display: 'none' }} />

            ))}

        </>
    )
}



export default DisplayNotes

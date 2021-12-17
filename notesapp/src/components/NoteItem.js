import './NoteItem.css';



const NoteItem = ({ note, style, onChkboxChange, onLabelDoubleClick }) => {
    return (
        <div className='Note' style={style}>
            <input type="checkbox" className="note_checkbox" defaultChecked={!note.activeState} value={note.value} onChange={() => onChkboxChange(note.id)}></input>
            <label className="note_label" type="text" style={note.activeState ? { textDecoration: 'solid' } : { textDecoration: 'line-through' }} onDoubleClick={() => onLabelDoubleClick(note.id)}>{note.value}</label>
            <br />
        </div>
    )
}

export default NoteItem

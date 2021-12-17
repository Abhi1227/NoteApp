import './ActionContainer.css'

const ActionContainer = ({ notes, onAllButton, onActiveButton, onCompletedButton, onClearComplete }) => {

    let activeCount = 0
    let noteCount = 0
    const updateActiveCount = (note) => {
        activeCount = note.activeState ? (activeCount + 1) : activeCount;
        noteCount++
    }
    return (
        <>
            {notes.map((note) => (
                updateActiveCount(note)
            ))}
            <div className='action' style={noteCount > 0 ? { display: 'block' } : { display: 'none' }}>
                <p className="items-left">{activeCount} items left</p>
                <button className="actionbutton" onClick={() => onAllButton()} > All </button>
                <button className="actionbutton" onClick={() => onActiveButton()} > Active </button>
                <button className="actionbutton" onClick={() => onCompletedButton()} > Completed </button>
                <span className="ClearCompleted" style={noteCount > activeCount ? { display: 'inline' } : { display: 'none' }} onClick={() => onClearComplete()}>Clear Completed</span>
            </div>
        </>
    )
}

export default ActionContainer;

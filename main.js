let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
let actionContainer = document.getElementById("actionContainer");
let itemsleft = document.getElementById("items-left");
let allButton = document.getElementById("AllButton");
let activeButton = document.getElementById("ActiveButton");
let completedButton = document.getElementById("CompletedButton");
let clearCompleted = document.getElementById("ClearCompleted");


//var arrayobj = [];
var arrayobj = [];
var buttonSelected = "All"
// Event bubbling  //hash unique identifier  //object storage

document.addEventListener('DOMContentLoaded', function () {
    getValues();
}, false);

addToDoButton.addEventListener('click', function () {
    if (inputField.value != "") {
        insertHTML(inputField.value);
        store(arrayobj);
    }
})

inputField.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addToDo").click();
    }
})


allButton.addEventListener('click', function () {
    buttonSelected = "All";
    refreshNotes(arrayobj);
});

activeButton.addEventListener('click', function () {
    buttonSelected = "Active";
    refreshNotes(arrayobj);
});

completedButton.addEventListener('click', function () {
    buttonSelected = "Completed";
    refreshNotes(arrayobj);
});

clearCompleted.addEventListener('click', function () {
    let i = 0;
    while (i < arrayobj.length) {
        var note_item = arrayobj[i];
        if (note_item.activestate == false) {
            arrayobj.splice(i, 1);
        } else {
            i++;
        }
    };
    store(arrayobj);
    refreshNotes(arrayobj);
});

function refreshNotes(array_notes) {
    toDoContainer.innerHTML = ""
    activeCount = 0
    inactiveCount = 0
    Array.from(array_notes).forEach((note_item, index, array) => {
        if (buttonSelected == "All") {
            displayNotes(note_item);
        } else if (buttonSelected == "Active") {
            if (note_item.activestate == true) {
                displayNotes(note_item);
            }
        } else if (buttonSelected == "Completed") {
            if (note_item.activestate == false) {
                displayNotes(note_item);
            }
        }

        if (note_item.activestate == true) {
            note_item.label.style.textDecoration = "initial";
            note_item.chkbox.checked = false;
            activeCount++;
        } else {
            note_item.label.style.textDecoration = "line-through";
            note_item.chkbox.checked = true;
            inactiveCount++;
        }
    });
    if (Array.from(array_notes).length == 0) {
        actionContainer.style.display = "none";
    } else {
        actionContainer.style.display = "block";
        itemsleft.innerHTML = activeCount + " items left";
        if (inactiveCount > 0) {
            clearCompleted.style.display = "inline-block";
        } else {
            clearCompleted.style.display = "none";
        }
    }
}

function displayNotes(note_item) {

    toDoContainer.appendChild(note_item.chkbox);
    note_item.label.innerHTML = note_item.label_value;
    toDoContainer.appendChild(note_item.label);
    var linebreak = document.createElement('br');
    toDoContainer.appendChild(linebreak);

}

function insertHTML(value, id = 0, state = true) {
    var note_item = {};
    var i = 0;

    var note = document.createElement('input')
    note.classList.add('checkbox-styling');
    note.type = "checkbox";
    note.id = 'note_checkbox';
    note.value = value;
    checkbox_label = document.createElement('label');
    checkbox_label.htmlfor = 'note_checkbox';
    //checkbox_label.innerHTML = value;
    checkbox_label.classList.add('paragraph-styling');



    note.addEventListener('change', function () { //seperate file
        note_item.activestate = !note_item.activestate;
        index = arrayobj.findIndex(x => x.id == note_item.id);
        arrayobj[index] = note_item;
        store(arrayobj);
        refreshNotes(arrayobj);
    })

    checkbox_label.ondblclick = function () {
        var val = this.innerHTML;
        var input = document.createElement("input");
        input.value = val;
        input.onblur = function () {
            var val = this.value;
            this.parentNode.innerHTML = val;
            note_item.label_value = val;
            index = arrayobj.findIndex(x => x.id == note_item.id);
            arrayobj[index] = note_item;
            store(arrayobj);
        }
        this.innerHTML = "";
        this.appendChild(input);

        input.addEventListener('keyup', function (e) {
            if (e.which == 13) input.blur();
        })
        input.focus();
    }
    if (id == 0) {
        note_item.id = generateId();
    } else {
        note_item.id = id;
    }
    note_item.chkbox = note;
    note_item.label = checkbox_label;
    note_item.label_value = value;
    note_item.activestate = state;
    arrayobj.push(note_item);
    refreshNotes(arrayobj)
    inputField.value = ""
}

function store(array_notes) {
    localStorage.setItem("notesData", JSON.stringify(Array.from(array_notes)));
}

//Keep data after page refresh or closing browser

function getValues() {
    var storedArray = Array.from(JSON.parse(localStorage.getItem("notesData") || "[]"));
    if (storedArray) {
        Array.from(storedArray).forEach((note_item, index, array) => {
            insertHTML(note_item.label_value, note_item.id, note_item.activestate);
        });
    }
}


function generateId() {
    let id = () => {
        return Math.floor((1 + Math.random()) * 0x100000)
            .toString(16)
            .substring(1);
    }
    return id();
}
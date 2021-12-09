let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");
let actionContainer = document.getElementById("actionContainer");
let itemsleft = document.getElementById("items-left");
let allButton = document.getElementById("AllButton");
let activeButton = document.getElementById("ActiveButton");
let completedButton = document.getElementById("CompletedButton");
let clearCompleted = document.getElementById("ClearCompleted");


var arrayobj = [];
var buttonSelected = "All"
// Event bubbling  //hash unique identifier  //object storage
addToDoButton.addEventListener('click', function () {
    var note_item = {};
    var i = 0;

    var note = document.createElement('input')
    note.classList.add('checkbox-styling');
    note.type = "checkbox";
    note.id = 'note_checkbox';
    note.value = inputField.value;
    checkbox_label = document.createElement('label');
    checkbox_label.htmlfor = 'note_checkbox';
    checkbox_label.appendChild(document.createTextNode(inputField.value));
    checkbox_label.classList.add('paragraph-styling');



    note.addEventListener('change', function () {

        if (note.checked == true) {
            note_item.activestate = false;
        } else {
            note_item.activestate = true;
        }
        refreshNotes(arrayobj)
    })

    checkbox_label.ondblclick = function () {
        var val = this.innerHTML;
        var input = document.createElement("input");
        input.value = val;
        input.onblur = function () {
            var val = this.value;
            this.parentNode.innerHTML = val;
        }
        this.innerHTML = "";
        this.appendChild(input);
        input.addEventListener('keyup', function (e) {
            if (e.which == 13) input.blur();
        })
        input.focus();
    }
    note_item.chkbox = note;
    note_item.label = checkbox_label;
    note_item.activestate = true;
    arrayobj.push(note_item);
    refreshNotes(arrayobj)
    inputField.value = ""
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
    arrayobj.forEach((note_item, index, array) => {
        if (note_item.activestate == false){
            arrayobj.splice(index,1);
    }
    });
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
            activeCount++;
        } else {
            note_item.label.style.textDecoration = "line-through";
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
    toDoContainer.appendChild(note_item.label);
    var linebreak = document.createElement('br');
    toDoContainer.appendChild(linebreak);
}
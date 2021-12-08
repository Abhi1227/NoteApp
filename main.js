let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField")

addToDoButton.addEventListener('click',function(){
    var note = document.createElement('input')
    note.classList.add('checkbox-styling');
    note.type="checkbox"
    note.id = 'checkbox'
    note.value = inputField.value;
    checkbox_label = document.createElement('checkbox_label')
    checkbox_label.htmlfor = 'checkbox'
    checkbox_label.appendChild(document.createTextNode(inputField.value));
    checkbox_label.classList.add('paragraph-styling');

    toDoContainer.appendChild(note);
    toDoContainer.appendChild(checkbox_label);
    note.addEventListener('change',function(){
        if (this.checked) {
            checkbox_label.style.textDecoration = "line-through";
        } else {
            checkbox_label.style.textDecoration = "initial";
          }
    })
    inputField.value = ""
})

inputField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addToDo").click();
    }
})
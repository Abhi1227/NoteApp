let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField")

addToDoButton.addEventListener('click',function(){
    var note = document.createElement('input')
    note.classList.add('checkbox-styling');
    note.type="checkbox"
    note.id = 'note_checkbox'
    note.value = inputField.value;
    checkbox_label = document.createElement('label')
    checkbox_label.htmlfor = 'note_checkbox'
    checkbox_label.appendChild(document.createTextNode(inputField.value));
    checkbox_label.classList.add('paragraph-styling');


    toDoContainer.appendChild(note);
    toDoContainer.appendChild(checkbox_label);


    var linebreak = document.createElement('br');
    toDoContainer.appendChild(linebreak);
    note.addEventListener('change',function(){
        var label = this.nextSibling
        if (note.checked == true) {
            label.style.textDecoration = "line-through";
        } else {
            label.style.textDecoration = "initial";
          }
    })

    checkbox_label.ondblclick=function(){
		var val=this.innerHTML;
		var input=document.createElement("input");
		input.value=val;
		input.onblur=function(){
			var val=this.value;
			this.parentNode.innerHTML=val;
		}
		this.innerHTML="";
		this.appendChild(input);
        input.addEventListener('keyup',function(e){
            if (e.which == 13) input.blur();
        })
		input.focus();
	}

    inputField.value = ""
})

inputField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("addToDo").click();
    }
})
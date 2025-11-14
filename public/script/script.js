setTimeout(() => {
    allTask = JSON.parse(window.taskArr);
    console.log('allTask', allTask);

    document.getElementById("createForm").style.display = "flex";
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("task-add-btn").style.display = "none";
}, 10);

function detectChanges(ev, type) {
    // console.log('ev', ev.target.value);
    // console.log('type', type);
    if (ev.target.value == '') {
        if(type == 'add'){
            document.getElementById("task-add-btn").style.display = "none";
        } else if(type == 'edit') {
            document.getElementById("task-edit-btn").style.display = "none";
        }
    } else {
        if(type == 'add'){
            document.getElementById("task-add-btn").style.display = "inline";
        } else if(type == 'edit') {
            document.getElementById("task-edit-btn").style.display = "inline";
        }
    }
}

function deleteTodo(currentEle) {
    fetch('/delete-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deletedTask: currentEle })
    }).then(res => Response.json).then(data => {
        console.log(JSON.stringify(data));
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    });
}

function editTodo(currentEle, currentInd) {
    document.getElementById("createForm").style.display = "none";
    document.getElementById("updateForm").style.display = "flex";
    document.getElementById('editTask').value = currentEle;
    document.getElementById('editIndex').value = currentInd;
    document.getElementById('editTask').focus();
}
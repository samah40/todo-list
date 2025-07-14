var newTaskInput = document.getElementById("newTask");
var addBtn = document.getElementById("add");
var updateBtn = document.getElementById("update");

var tasklist = [];
if (localStorage.getItem("taskContainer") != null) {
  tasklist = JSON.parse(localStorage.getItem("taskContainer"));
}
displayTasks();

// console.log(tasklist);

function addTask() {
  if (validation()) {
    var task = {
      taskName: newTaskInput.value,
    };
    tasklist.push(task);
    localStorage.setItem("taskContainer", JSON.stringify(tasklist));

    displayTasks();
    clearInput();
  }
}
addBtn.addEventListener("click", addTask);

function clearInput() {
  newTaskInput.value = null;
}

function displayTasks() {
  var taskItems = "";
  if (tasklist.length == 0) {
    document.getElementById("allTasks").innerHTML = `
              <tr>
                      <td colspan="4" class="fw-bold">Task List is Empty!</td>
                    </tr>
        `;
  } else {
    for (let i = 0; i < tasklist.length; i++) {
      // console.log(tasklist[i].taskName);

      taskItems += `
       <tr class="fw-normal">
                                        <td>${i}</td>
                                        <td>
                                            <span>${tasklist[i].taskName}</span>
                                        </td>
                                        <td>
                                            <a style="cursor: pointer;" class="update" onclick="updateChange(${i})"><i
                                             class="fas fa-pen-nib fa-lg text-warning me-3"></i></a>
                                        </td>
                                        <td>
                                            <a style="cursor: pointer;" class="delete" onclick="removeTask(${i})"><i
                                                    class="fas fa-trash-alt fa-lg text-danger"></i></a>
                                        </td>
                                    </tr>
    `;
    }
    document.getElementById("allTasks").innerHTML = taskItems;
  }
}

function removeTask(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      tasklist.splice(index, 1);
      localStorage.setItem("taskContainer", JSON.stringify(tasklist));

      displayTasks();
    }
  });
}
var currentIndex;
function updateChange(i) {
  currentIndex = i;
  newTaskInput.value = tasklist[i].taskName;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function updateTask() {
  tasklist[currentIndex].taskName = newTaskInput.value;

  localStorage.setItem("taskContainer", JSON.stringify(tasklist));

  displayTasks();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}
updateBtn.addEventListener("click",updateTask)
// regex

 function validation() {
   let text = newTaskInput.value;
   let regex = /^[A-Za-z0-9]{2,50}$/;
   let taskMsgInput = document.getElementById("taskMsg");
   if (regex.test(text)) {
     newTaskInput.classList.add("is-valid");
     newTaskInput.classList.remove("is-invalid");
     taskMsgInput.classList.add("d-none");
     addBtn.disabled = false;
     return true;
   } else {
     newTaskInput.classList.add("is-invalid");
     newTaskInput.classList.remove("is-valid");
     taskMsgInput.classList.remove("d-none");
     addBtn.disabled = true;
     return false;
   }
 }
 newTaskInput.addEventListener("input", validation);
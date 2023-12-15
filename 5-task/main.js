// document.addEventListener("DOMContentLoaded", function () {
//     loadTasks();
// });

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");

function addTask() {
    
    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }
    const task = {
        text: taskInput.value.trim(),
        priority: prioritySelect.value
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    loadTasks();
    taskInput.value = "";
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = getTasks();
    
    tasks.forEach(function (task, index) {
        // taskList.innerHTML = "";

        const li = createTaskElement(task, index);
        // console.log('here', li);
        // taskList.appendChild(li);
        taskList.insertAdjacentElement('afterbegin', li)
        // taskList.insertBefore(li, taskList.firstChild);

    });
}

        // taskList.appendChild(li);

        function createTaskElement (task, index){
            

            const li = document.createElement("li");
            
            li.id = `task-${index}`;
            li.innerHTML = 
            `<span class="text-span">${task.text}</span> <br>
             <span class="priority">${task.priority}</span> 
             <div class="task-icons">
                <svg class="edit-icon" onclick="editTask(${index})" id="edit-btn" xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
                <path d="M22.8859 5.76211L19.074 2.31225C18.8221 2.08658 18.4812 1.9599 18.1259 1.9599C17.7705 1.9599 17.4296 2.08658 17.1777 2.31225L3.66389 14.4628L2.43005 19.2575C2.38748 19.4328 2.38894 19.6144 2.43432 19.7891C2.47969 19.9638 2.56784 20.1272 2.69231 20.2673C2.81679 20.4074 2.97445 20.5206 3.15378 20.5989C3.33311 20.6771 3.52958 20.7182 3.72883 20.7193C3.82167 20.7277 3.91523 20.7277 4.00807 20.7193L9.39153 19.6083L22.8859 7.4695C23.1365 7.24269 23.2772 6.93575 23.2772 6.6158C23.2772 6.29585 23.1365 5.98892 22.8859 5.76211ZM8.74214 18.5558L3.69636 19.5089L4.84579 15.0533L14.9568 5.9843L18.8532 9.49264L8.74214 18.5558ZM19.7234 8.64479L15.827 5.13645L18.0869 3.11332L21.9183 6.62165L19.7234 8.64479Z" fill="#F25F4C"/>
                </svg>
                <svg class="delete-icon" onclick="deleteTask(${index})" id="delete-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                <path d="M13.6996 5.10722C13.6996 4.68851 13.5149 4.28695 13.1861 3.99087C12.8572 3.6948 12.4113 3.52847 11.9462 3.52847C11.4812 3.52847 11.0352 3.6948 10.7064 3.99087C10.3776 4.28695 10.1929 4.68851 10.1929 5.10722H9.02397C9.02397 4.40937 9.33185 3.7401 9.87989 3.24664C10.4279 2.75319 11.1712 2.47597 11.9462 2.47597C12.7213 2.47597 13.4646 2.75319 14.0126 3.24664C14.5606 3.7401 14.8685 4.40937 14.8685 5.10722H20.1286C20.2836 5.10722 20.4322 5.16266 20.5419 5.26135C20.6515 5.36004 20.713 5.4939 20.713 5.63347C20.713 5.77304 20.6515 5.90689 20.5419 6.00558C20.4322 6.10427 20.2836 6.15972 20.1286 6.15972H19.481L17.9661 17.9793C17.9001 18.4923 17.6271 18.9655 17.1988 19.309C16.7706 19.6525 16.217 19.8423 15.6435 19.8422H8.24899C7.67546 19.8423 7.12192 19.6525 6.69366 19.309C6.26541 18.9655 5.99233 18.4923 5.92637 17.9793L4.4103 6.15972H3.7639C3.6271 6.15976 3.49463 6.11659 3.38954 6.03774C3.28446 5.95889 3.21342 5.84935 3.18879 5.72819L3.17944 5.63347C3.17944 5.4939 3.24102 5.36004 3.35063 5.26135C3.46023 5.16266 3.60889 5.10722 3.7639 5.10722H13.6996ZM18.3027 6.15972H5.58856L7.0871 17.8583C7.12009 18.1148 7.25671 18.3515 7.47096 18.5233C7.68521 18.6951 7.96212 18.7899 8.24899 18.7897H15.6435C15.9302 18.7896 16.2068 18.6947 16.4208 18.5229C16.6348 18.3512 16.7712 18.1147 16.8042 17.8583L18.3027 6.15972ZM10.1929 8.79097C10.4793 8.79097 10.7189 8.95411 10.768 9.16882L10.7773 9.25196V15.6985C10.7773 15.9522 10.5155 16.1585 10.1929 16.1585C9.9065 16.1585 9.66687 15.9953 9.61778 15.7806L9.60843 15.6975V9.25302C9.60843 8.99831 9.87026 8.79202 10.1929 8.79202V8.79097ZM13.6996 8.79097C13.986 8.79097 14.2256 8.95411 14.2747 9.16882L14.2841 9.25196V15.6985C14.2841 15.9522 14.0222 16.1585 13.6996 16.1585C13.4132 16.1585 13.1736 15.9953 13.1245 15.7806L13.1151 15.6975V9.25302C13.1151 8.99831 13.377 8.79202 13.6996 8.79202V8.79097Z" fill="#F25F4C"/>
                </svg>
             </div>`;
             
             const taskText = li.querySelector('.text-span');

             taskText.addEventListener('click', function () {
                
                editTask(index);
                
            });
            return li;
        }

function editTask(index) {
    const tasks = getTasks();
    const li = document.getElementById(`task-${index}`);
    const taskText = li.querySelector(`.text-span`);
    // const taskText = document.querySelector(`#taskList li:nth-child(${index + 1}) .text-span`);
    // const updatedText = prompt("Edit task:", tasks[index].text);
    
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskText.textContent;
    input.className='edit_input'


    input.addEventListener('blur', function () {
        tasks[index].text = input.value;
        saveTasks(tasks);
        loadTasks();
    });


    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            input.blur();
        } else if (event.key === 'Escape') {
            loadTasks(); // Отмена редактирования, восстанавливаем предыдущее состояние
        }
    });

    taskText.replaceWith(input);
    input.focus();
}

function deleteTask(index) {
    const tasks = getTasks();
    
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    }
}

function getTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();

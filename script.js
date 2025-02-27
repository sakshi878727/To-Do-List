document.addEventListener("DOMContentLoaded", loadTasks);
        
        // Function to add a new task
        function addTask() {
            let taskInput = document.getElementById("taskInput");
            let taskText = taskInput.value.trim();
            let errorMsg = document.getElementById("error");
            
            if (taskText === "") {
                errorMsg.style.display = "block";
                return;
            } else {
                errorMsg.style.display = "none";
            }
            
            let taskList = document.getElementById("taskList");
            let li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" onchange="toggleComplete(this)"> 
                            <span>${taskText}</span>
                            <button onclick="editTask(this)">Edit</button>
                            <button onclick="removeTask(this)">X</button>`;
            taskList.appendChild(li);
            saveTasks();
            taskInput.value = "";
        }
        
        // Function to remove a task
        function removeTask(button) {
            button.parentElement.remove();
            saveTasks();
        }
        
        // Function to edit an existing task
        function editTask(button) {
            let span = button.previousElementSibling;
            let newText = prompt("Edit task:", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText.trim();
                saveTasks();
            }
        }
        
        // Function to toggle task completion
        function toggleComplete(checkbox) {
            let span = checkbox.nextElementSibling;
            span.classList.toggle("completed", checkbox.checked);
            saveTasks();
        }
        
        // Function to save tasks to local storage
        function saveTasks() {
            let tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                let task = {
                    text: li.children[1].textContent,
                    completed: li.children[0].checked
                };
                tasks.push(task);
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        
        // Function to load tasks from local storage
        function loadTasks() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let taskList = document.getElementById("taskList");
            
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = `<input type="checkbox" onchange="toggleComplete(this)" ${task.completed ? "checked" : ""}>
                                <span class="${task.completed ? "completed" : ""}">${task.text}</span>
                                <button onclick="editTask(this)">Edit</button>
                                <button onclick="removeTask(this)">X</button>`;
                taskList.appendChild(li);
            });
        }
const taskList = document.getElementById("task-list");
        const taskInput = document.getElementById("txtTaskName");
        const addButton = document.getElementById("btnAddNewTask");
        const clearButton = document.getElementById("btnClear");

        addButton.addEventListener("click", function (e) {
            e.preventDefault();
            const taskName = taskInput.value;
            if (taskName.trim() !== "") {
                addTaskToList(taskName);
                taskInput.value = "";
                saveTasksToLocalStorage();
            }
        });

        clearButton.addEventListener("click", function () {
            taskList.innerHTML = "";
            saveTasksToLocalStorage();
        });

        taskList.addEventListener("click", function (e) {
            if (e.target.classList.contains("delete-button")) {
                e.target.closest("li").remove();
                saveTasksToLocalStorage();
            } else if (e.target.classList.contains("edit-button")) {
                const taskItem = e.target.closest("li");
                const taskText = taskItem.querySelector(".task-text");
                const updatedTaskName = prompt("Yeni görev adını girin:", taskText.textContent);
                if (updatedTaskName !== null && updatedTaskName.trim() !== "") {
                    taskText.textContent = updatedTaskName;
                    saveTasksToLocalStorage();
                }
            }
        });

        taskList.addEventListener("change", function (e) {
            if (e.target.classList.contains("form-check-input")) {
                const taskLabel = e.target.nextElementSibling;
                if (e.target.checked) {
                    taskLabel.classList.add("completed-task");
                } else {
                    taskLabel.classList.remove("completed-task");
                }
                saveTasksToLocalStorage();
            }
        });

        function addTaskToList(taskName) {
            const taskItem = document.createElement("li");
            taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
            taskItem.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkbox-${taskName}">
                    <label class="form-check-label task-text" for="checkbox-${taskName}">
                        ${taskName}
                    </label>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary edit-button">Düzenle</button>
                    <button class="btn btn-sm btn-outline-danger delete-button">Sil</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        }

        function loadTasksFromLocalStorage() {
            const savedTasks = localStorage.getItem("tasks");
            if (savedTasks) {
                taskList.innerHTML = savedTasks;
            }
        }

        function saveTasksToLocalStorage() {
            localStorage.setItem("tasks", taskList.innerHTML);
        }

        // Yükleme işlevini çağır
        loadTasksFromLocalStorage();
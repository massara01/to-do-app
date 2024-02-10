document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const buttonsContainer = document.getElementById('buttons-container');
    const allBtn = document.getElementById('allBtn');
    const activeBtn = document.getElementById('activeBtn');
    const completedBtn = document.getElementById('completedBtn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const completeAllBtn = document.getElementById('completeAllBtn');
    const activeTasksCount = document.getElementById('activeTasksCount'); // Element to display active tasks count

    let isInitialTaskAdded = false;

    function addTask(taskText) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        const radioInput = document.createElement('input');
        radioInput.type = 'checkbox';
        radioInput.name = 'taskStatus';
        radioInput.classList.add('task-status');
        radioInput.addEventListener('click', updateActiveTasksCount); // Update active tasks count on checkbox click

        const taskLabel = document.createElement('label');
        taskLabel.textContent = taskText;

        const deleteButton = document.createElement('span');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-task');
        deleteButton.addEventListener('click', function () {
            li.remove();
            updateActiveTasksCount(); // Update active tasks count after task removal
        });

        li.appendChild(radioInput);
        li.appendChild(taskLabel);
        li.appendChild(deleteButton);

        todoList.appendChild(li);

        if (!isInitialTaskAdded) {
            buttonsContainer.style.display = 'flex';
            isInitialTaskAdded = true;
        }
        updateActiveTasksCount(); // Update active tasks count after task addition
        radioInput.addEventListener('change', function () {
            updateTaskList();
        });
    }

    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && this.value.trim() !== '') {
            addTask(this.value.trim());
            this.value = '';
        }
    });

    allBtn.addEventListener('click', function () {
        applyFilter('all');
        highlightButton(allBtn);
    });

    activeBtn.addEventListener('click', function () {
       
        applyFilter('active');
        updateTaskList();
        highlightButton(activeBtn);
    });

    completedBtn.addEventListener('click', function () {
        
        applyFilter('completed');
        updateTaskList();
        highlightButton(completedBtn);
    });

    clearCompletedBtn.addEventListener('click', function () {
        const completedTasks = todoList.querySelectorAll('.todo-item.completed');
        completedTasks.forEach(function (task) {
            const radioInput = task.querySelector('.task-status');
            radioInput.checked = false; // Décocher la case pour marquer la tâche comme active
            task.classList.remove('completed'); // Supprimer la classe 'completed' pour changer l'apparence visuelle
            
        });
        applyFilter('active'); // Appliquer le filtre pour afficher les tâches actives après avoir effacé les tâches complétées
        highlightButton(activeBtn); // Mettre en surbrillance le bouton "Actifs"
    });
    
    
    completeAllBtn.addEventListener('click', function () {
        const tasks = todoList.querySelectorAll('.todo-item .task-status');
        tasks.forEach(function (task) {
            task.checked = true;
        });
        updateActiveTasksCount(); // Update active tasks count after completing all tasks
    });

    function applyFilter(filter) {
        const tasks = todoList.querySelectorAll('.todo-item');
        tasks.forEach(function (task) {
            const radioInput = task.querySelector('.task-status');
            switch (filter) {
                case 'active':
                    task.style.display = radioInput.checked ? 'none' : 'block';
                    break;
                case 'completed':
                    task.style.display = radioInput.checked ? 'block' : 'none';
                    break;
                default:
                    task.style.display = 'block';
                    break;
            }
        });
    }

    function highlightButton(button) {
        allBtn.classList.remove('active');
        activeBtn.classList.remove('active');
        completedBtn.classList.remove('active');
        button.classList.add('active');
    }

    function updateActiveTasksCount() {
        const activeTasks = todoList.querySelectorAll('.todo-item .task-status:not(:checked)');
        const activeTasksCountText = activeTasks.length === 1 ? ' item left' : ' items left';
        activeTasksCount.textContent = activeTasks.length + activeTasksCountText; // Mettre à jour le texte avec le nombre de tâches actives
    }

    function updateTaskList() {
        const activeTasks = document.querySelectorAll('.todo-item:not(.completed)');
        const completedTasks = document.querySelectorAll('.todo-item.completed');
      
        // Afficher ou masquer les tâches en fonction du filtre sélectionné
        if (activeBtn.classList.contains('active')) {
            completedTasks.forEach(task => task.style.display = 'none');
        } else if (completedBtn.classList.contains('active')) {
            activeTasks.forEach(task => task.style.display = 'none');
        }
    }
    

    updateActiveTasksCount(); // Initial update of active tasks count
});

const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showTask = async () => {
    try {
        const response = await axios.get(`/api/v1/task/${id}`);
        console.log('API Response:', response.data); // Log the response

        // Extract the task from the correct property
        const task = response.data.singleTask || response.data.task || response.data.updatedTask;

        if (!task) {
            throw new Error('Task not found in response');
        }

        const {_id: taskID, completed, name} = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        taskCompletedDOM.checked = completed; // Set checked based on the completed status
    } catch (error) {
        console.error('Error fetching task:', error);
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Error fetching task, please try again.';
        formAlertDOM.classList.add('text-danger');
    }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...';
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;

        const response = await axios.patch(`/api/v1/task/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });

        console.log('API Response:', response.data); // Log the response

        // Extract the updated task from the correct property
        const task = response.data.updatedTask;

        if (!task) {
            throw new Error('Task not found in response');
        }

        const {_id: taskID, completed, name} = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        taskCompletedDOM.checked = completed; // Update checked status

        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `Success, edited task`;
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        console.error('Error updating task:', error);
        taskNameDOM.value = tempName; // Restore previous task name
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = `Error, please try again`;
        formAlertDOM.classList.add('text-danger');
    } finally {
        editBtnDOM.textContent = 'Edit'; // Reset button text
        setTimeout(() => {
            formAlertDOM.style.display = 'none';
            formAlertDOM.classList.remove('text-success', 'text-danger');
        }, 3000);
    }
});

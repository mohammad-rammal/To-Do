const tasksDOM = document.querySelector('.tasks');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// Get the popup element
const popup = document.getElementById('popup');
const openPopupButton = document.getElementById('open-popup');
const closePopupButton = document.getElementById('close-popup');

// Function to open the popup
const openPopup = () => {
    popup.style.display = 'block';
};

// Function to close the popup
const closePopup = () => {
    popup.style.display = 'none';
};

// Event listener for opening the popup
openPopupButton.addEventListener('click', openPopup);

// Event listener for closing the popup
closePopupButton.addEventListener('click', closePopup);

// Close the popup if the user clicks anywhere outside of the popup
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup();
    }
});

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible';
    try {
        const response = await axios.get('/api/v1/task');
        // console.log('API Response:', response); // Log the full response object

        const responseData = response.data;
        // console.log('Response Data:', responseData); // Log response data

        // Extract tasks from the response
        const tasks = responseData.allTasks || [];
        if (!Array.isArray(tasks)) {
            throw new Error('Expected allTasks to be an array');
        }

        if (tasks.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
            loadingDOM.style.visibility = 'hidden';
            return;
        }

        const allTasks = tasks
            .map((task) => {
                const {completed, _id: taskID, name} = task;
                return `<div class="single-task ${completed ? 'task-completed' : ''}">
          <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
          <div class="task-links">
            <!-- edit link -->
            <a href="task.html?id=${taskID}" class="edit-link">
              <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
            })
            .join('');
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingDOM.style.visibility = 'hidden';
};

showTasks();

// delete task /api/task/:id

tasksDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible';
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/task/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
    loadingDOM.style.visibility = 'hidden';
});

// form

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInputDOM.value;

    try {
        await axios.post('/api/v1/task', {name});
        showTasks();
        taskInputDOM.value = '';
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `success, task added`;
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = `error, please try again`;
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
});

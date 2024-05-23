<template>
  <div class="todo-container">
    <!-- Header for the Task List -->
    <h2 class="my-4">Task List</h2>

    <!-- Alert Section to Display Messages -->
    <div class="alert-section">
      <div v-if="alert.message" :class="`alert alert-${alert.type}`" role="alert">
        {{ alert.message }}
      </div>
    </div>

    <!-- Input Section for Adding New Tasks -->
    <div class="input-section">
      <input
        v-model="newTask.text"
        @keyup.enter="addTask"
        class="task-input"
        placeholder="Enter a new task"
      />
      <button @click="addTask" class="add-task-button">Add Task</button>
    </div>

    <!-- Table to Display Tasks -->
    <table class="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop Through Tasks and Display Them -->
        <tr v-for="(task, index) in tasks" :key="index">
          <td class="align-middle">
            <!-- Editable Input for Task -->
            <input
              v-if="task.editing"
              v-model="task.text"
              @keyup.enter="saveTask(task)"
              class="edit-input"
            />
            <!-- Display Task Text if Not Editing -->
            <span v-else>{{ task.text }}</span>
          </td>
          <td class="align-middle">
            <!-- Dropdown to Select Task Priority -->
            <select v-model="task.priority" class="priority-select">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </td>
          <td class="align-middle">
            <!-- Buttons for Saving, Editing, and Deleting Tasks -->
            <button v-if="task.editing" @click="saveTask(task)" class="save-button">Save</button>
            <button v-else @click="editTask(task)" class="edit-button">Edit</button>
            <button @click="removeTask(index)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Badges to Display Counters for Added, Done, and Deleted Tasks -->
    <div class="badge-section">
      <span class="badge added-badge">Added: {{ counters.added }}</span>
      <span class="badge done-badge">Done: {{ counters.done }}</span>
      <span class="badge deleted-badge">Deleted: {{ counters.deleted }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: { text: '', priority: 'low' }, // New task object
      tasks: [], // Array to hold tasks
      alert: {
        message: '', // Alert message
        type: '' // Alert type (primary, success, warning)
      },
      counters: {
        added: 0, // Counter for added tasks
        done: 0, // Counter for completed tasks
        deleted: 0 // Counter for deleted tasks
      }
    };
  },
  methods: {
    // Method to add a new task
    addTask() {
      if (this.newTask.text.trim() !== '') {
        this.tasks.push({ ...this.newTask, editing: false });
        this.alert.message = `Task "${this.newTask.text}" added!`;
        this.alert.type = 'primary';
        this.counters.added++;
        this.newTask.text = ''; // Clear the input
        setTimeout(() => {
          this.alert.message = '';
        }, 3000);
      }
    },
    // Method to enable task editing
    editTask(task) {
      task.editing = true;
    },
    // Method to save the edited task
    saveTask(task) {
      task.editing = false;
      this.alert.message = `Task "${task.text}" updated!`;
      this.alert.type = 'success';
      setTimeout(() => {
        this.alert.message = '';
      }, 3000);
    },
    // Method to remove a task
    removeTask(index) {
      this.alert.message = `Task "${this.tasks[index].text}" removed!`;
      this.alert.type = 'warning';
      this.counters.deleted++;
      setTimeout(() => {
        this.alert.message = '';
      }, 3000);
      this.tasks.splice(index, 1); // Remove the task from the array
    },
  },
};
</script>

<style scoped>
/* Container for the to-do list */
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #282c34;
  color: white;
  border-radius: 10px;
  text-align: center;
}

/* Styles for the input fields */
.task-input, .priority-select, .edit-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
}

/* Styles for the buttons */
.add-task-button, .save-button, .edit-button, .delete-button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-task-button {
  background-color: #61dafb;
  color: #282c34;
  width: 100%;
}

.save-button {
  background-color: #28a745;
  color: white;
}

.edit-button {
  background-color: #ffc107;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

/* Styles for the task table */
.task-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.task-table th, .task-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.task-table th {
  background-color: #444;
}

.align-middle {
  vertical-align: middle;
}

/* Styles for the alert messages */
.alert {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.alert-primary {
  background-color: #61dafb;
  color: #282c34;
}

.alert-success {
  background-color: #28a745;
  color: white;
}

.alert-warning {
  background-color: #ffc107;
  color: white;
}

/* Styles for the badges */
.badge-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.badge {
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
}

.added-badge {
  background-color: #61dafb;
  color: #282c34;
}

.done-badge {
  background-color: #28a745;
  color: white;
}

.deleted-badge {
  background-color: #dc3545;
  color: white;
}
</style>
h

<template>
  <div class="todo-container">
    <h2 class="my-4">Task List</h2>
    <div class="alert-section">
      <div v-if="alert.message" :class="`alert alert-${alert.type}`" role="alert">
        {{ alert.message }}
      </div>
    </div>
    <div class="input-section">
      <input
        v-model="newTask.text"
        @keyup.enter="addTask"
        class="task-input"
        placeholder="Enter a new task"
      />
      <button @click="addTask" class="add-task-button">Add Task</button>
    </div>
    <table class="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td class="align-middle">
            <input
              v-if="task.editing"
              v-model="task.text"
              @keyup.enter="saveTask(task)"
              class="edit-input"
            />
            <span v-else>{{ task.text }}</span>
          </td>
          <td class="align-middle">
            <select v-model="task.priority" class="priority-select">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </td>
          <td class="align-middle">
            <button v-if="task.editing" @click="saveTask(task)" class="save-button">Save</button>
            <button v-else @click="editTask(task)" class="edit-button">Edit</button>
            <button @click="removeTask(index)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
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
      newTask: { text: '', priority: 'low' },
      tasks: [],
      alert: {
        message: '',
        type: ''
      },
      counters: {
        added: 0,
        done: 0,
        deleted: 0
      }
    };
  },
  methods: {
    addTask() {
      if (this.newTask.text.trim() !== '') {
        this.tasks.push({ ...this.newTask, editing: false });
        this.alert.message = `Task "${this.newTask.text}" added!`;
        this.alert.type = 'primary';
        this.counters.added++;
        this.newTask.text = '';
        setTimeout(() => {
          this.alert.message = '';
        }, 3000);
      }
    },
    editTask(task) {
      task.editing = true;
    },
    saveTask(task) {
      task.editing = false;
      this.alert.message = `Task "${task.text}" updated!`;
      this.alert.type = 'success';
      setTimeout(() => {
        this.alert.message = '';
      }, 3000);
    },
    removeTask(index) {
      this.alert.message = `Task "${this.tasks[index].text}" removed!`;
      this.alert.type = 'warning';
      this.counters.deleted++;
      setTimeout(() => {
        this.alert.message = '';
      }, 3000);
      this.tasks.splice(index, 1);
    },
  },
};
</script>

<style scoped>
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

/* Responsive styles */
@media (max-width: 768px) {
  .todo-container {
    padding: 15px;
  }

  .task-table th, .task-table td {
    padding: 8px;
  }

  .add-task-button, .save-button, .edit-button, .delete-button {
    padding: 8px 16px;
    font-size: 14px;
  }

  .task-input, .priority-select, .edit-input {
    padding: 8px;
  }

  .badge {
    padding: 8px 16px;
    margin: 5px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .todo-container {
    padding: 10px;
  }

  .task-table th, .task-table td {
    padding: 5px;
    font-size: 12px;
  }

  .add-task-button, .save-button, .edit-button, .delete-button {
    padding: 5px 10px;
    font-size: 12px;
  }

  .task-input, .priority-select, .edit-input {
    padding: 5px;
    font-size: 12px;
  }

  .badge {
    padding: 5px 10px;
    margin: 3px;
    font-size: 12px;
  }
}
</style>

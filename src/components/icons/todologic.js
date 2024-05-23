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

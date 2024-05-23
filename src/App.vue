<template>
  <section class="vh-100 gradient-custom-2">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-xl-10">
          <TodoList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TodoList from './components/todolist.vue';

export default {
  name: 'App',
  components: {
    TodoList,

  },
}
</script>

<style>
/* Global styles */
.vh-100 {
  height: 100vh;
}

.gradient-custom-2 {
  background: linear-gradient(to right, #43faf1, #ff7eb3);
}
</style>

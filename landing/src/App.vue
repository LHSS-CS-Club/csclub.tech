<template>
  <div :class="{ 'dark': isDarkMode }">
  <div class="grid place-items-center h-screen bg-light dark:bg-dark">
      <div class="flex flex-col justify-center text-center max-w-[60rem] text-dark dark:text-light">
        <button @click="toggleDark" class="cursor-default">
          <img src="./assets/cs.jpeg" class="logo h-[40vh] mx-auto rounded-3xl mb-12 cursor-pointer" alt="logo" />
        </button>
        <h3 class="text-4xl font-bold mb-2">Laurel Heights Computer Science Club</h3>
        <p class="text-sm">
          A group of students from Laurel Heights Secondary School dedicated to creating opportunities for students to learn more about computer science and technology.
        </p>
        <div class="flex gap-4 text-xl justify-center mt-2">
          <button class="flex items-center gap-2 hover:opacity-60 transition-opacity">
            <img src="./assets/icons/File.svg" class="w-6 h-6" alt="File icon" />
            Google Classroom
          </button>
          <button class="flex items-center gap-2 hover:opacity-60 transition-opacity">
            <img src="./assets/icons/GitHub Logo.svg" class="w-6 h-6 " alt="GitHub icon" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleDark() {
      this.isDarkMode = !this.isDarkMode;
    },
  }
}
</script>

<style scoped>
.logo {
  will-change: filter;
  transition: all 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  height: 41vh;
}
</style>

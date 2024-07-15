<template>
  <div class="container">
    <header>
      <div class="title">
        Crypto Apps
      </div>
      <div class="btn-edit">
        <RouterLink 
          v-if="$route.name === 'home'"
          to="/edit"
        >
          <button type="button" class="btn btn-dark">Edit</button>
        </RouterLink>
        <RouterLink 
          v-if="$route.name === 'edit'"
          to="/"
        >
          <button type="button" class="btn btn-dark">Back</button>
        </RouterLink>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  // padding: 10px;
}

header {
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  .title {
    display: flex;
    font-size: 45px;
    align-items: center;
    font-weight: 500;
  }
  .btn-edit {
    display: flex;
    align-items: center;
    button {
      width: 15vw;
      padding: 10px;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    .btn-edit {
      button {
        width: 5vw;
        padding: 10px;
      }
    }
  }
}
</style>

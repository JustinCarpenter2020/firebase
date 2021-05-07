<template>
  <div class="container-fluid">
    <div class="row">
      <form @submit.prevent="createPost">
        <div class="col">
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   name=""
                   id=""
                   aria-describedby="helpId"
                   placeholder="new post..."
                   v-model="state.newPost.body"
            >
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   name=""
                   id=""
                   aria-describedby="helpId"
                   placeholder="image..."
                   v-model="state.newPost.imgUrl"
            >
          </div>
        </div>
        <div class="col">
          <button type="submit" class="btn btn-success">
            creeate yay
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state
      // TODO create post function
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>

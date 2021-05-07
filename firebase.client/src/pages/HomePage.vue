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
    <div class="card-columns mt-5">
      <PostComponent v-for="post in state.posts" :key="post.id" :post-prop="post" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newPost: {},
      posts: computed(() => AppState.posts)
    })
    onMounted(async() => {
      try {
        await postsService.getAll()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async createPost() {
        try {
          await postsService.create(state.newPost)
          state.newPost = {}
        } catch (error) {
          logger.error(error)
        }
      }
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

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
            <input type="file" ref="fileInput" @click="onFileOpen" accept="image/*" @change="filePicked">
          </div>
        </div>
        <div class="col">
          <div v-if="state.image">
            <img :src="state.imageUrl" alt="">
          </div>
          <button type="submit" class="btn btn-success">
            creeate yay
          </button>
        </div>
      </form>
    </div>
    <div class="wrapper mt-5">
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
      imageUrl: '',
      image: null,
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
          if (!state.image) {
            return 'no image selected'
          }
          state.newPost.imageUrl = state.image
          await postsService.create(state.newPost)
          state.newPost = {}
        } catch (error) {
          logger.error(error)
        }
      },
      onFileOpen() {
        this.$refs.fileInput.click()
      },
      filePicked(event) {
        const files = event.target.files
        const fileName = files[0].name
        if (fileName.lastIndexOf('.') <= 0) {
          return 'Pleaseprovide a valid file'
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          state.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        state.image = files[0]
      }
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

.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}
</style>

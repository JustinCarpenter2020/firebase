<template>
  <div class="container-fluid">
    <div class="row">
      <form @submit.prevent="createPost">
        <div class="col">
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   name=""
                   id="title"
                   aria-describedby="helpId"
                   placeholder="new post..."
                   v-model="state.newPost.body"
            >
            <button v-if="state.uploadReady" type="submit" class="btn btn-success">
              Create post
            </button>
            <button v-if="state.selected" class="btn btn-danger" type="button" @click="upload">
              Upload
            </button>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input type="file" ref="fileInput" accept="image/*" @change="filePicked">
          </div>
        </div>
        <div class="col">
          <div v-if="state.image">
            <img :src="state.imageUrl" alt="">
          </div>
          <div v-else>
            <img id="img" class="selected" alt="">
          </div>
        </div>
      </form>
    </div>
    <div class="row text-center mt-5">
      <div class=" col animate__animated animate__bounce">
        <img class="camera" src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6317/6317527_sd.jpg" alt="">
      </div>
    </div>
    <div class="row justify-content-center mt-1" v-if="state.printing">
      <div class="col-3 animate__animated animate__slideInDown">
        <div>
          <div class="card shadow ">
            <div class="card-body">
              <img id="printing" :src="state.printImg" class="print img-fluid" />
            </div>
          </div>
        </div>
      </div>
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
import { fireBaseLogic } from '../services/FireBaseLogic'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newPost: {},
      selected: false,
      uploadReady: false,
      printing: false,
      printImg: '',
      files: [],
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
          state.printImg = state.newPost.imgUrl
          this.print()
          state.newPost = {}
          document.getElementById('img').src = ''
          state.uploadReady = false
        } catch (error) {
          logger.error(error)
        }
      },

      // <----------------------File Selection proccess----------------------------------------------------->
      filePicked(e) {
        state.files = e.target.files

        // NOTE establish a reader to read the file that we pulled, it waits for the reader to load and then grabs the id and replaces it with our img
        const reader = new FileReader()

        reader.onload = function() {
          document.getElementById('img').src = reader.result
        }

        // NOTE this method is very particular it must be readAsDataURL, it's also a built in js method with readers, it allows us to return the contents of a file as a base64 encoded string
        reader.readAsDataURL(state.files[0])
        state.selected = true
      },

      // <----------------------upload proccess----------------------------------------------------->
      async upload() {
        const imgName = state.newPost.body
        const res = await fireBaseLogic.upload(imgName, state.files[0])
        state.newPost.imgUrl = res.url

        state.selected = false
        state.uploadReady = true
      },

      // <----------------------extra css----------------------------------------------------->
      print() {
        state.printing = true
        setTimeout(function() {
          state.printing = false
        }, 2000)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}
.camera{
  height: 30vh;
}

.selected{
  height: 20vh;
  width: 30vh;
}

.print{
  height: 30vh;
}
</style>

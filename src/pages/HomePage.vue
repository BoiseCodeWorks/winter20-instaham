<template>
  <div class="home flex-grow-1 d-flex flex-column container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col-4">
        <img class="img-fluid" src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo">
        <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
          <span class="mx-2 text-white">Welcome to InstaHam</span>
        </h1>
      </div>
    </div>
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
          Create a Ham
        </button>
        <QuickModal />
      </div>
    </div>
    <div class="row mt-3">
      <PostComponent v-for="post in state.posts" :key="post.id" :post-prop="post" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { postService } from '../services/PostService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await postService.getPosts()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
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

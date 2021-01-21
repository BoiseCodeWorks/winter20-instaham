<template>
  <div class="PostComponent col-3">
    <div class="card text-left">
      <img class="card-img-top" :src="postProp.imgUrl" alt="">
      <div class="card-body">
        <h4 class="card-title" :contenteditable="state.editPost" @blur="editPost">
          {{ postProp.title }}
        </h4>
        <i class="fa fa-pencil" aria-hidden="true" v-if="state.account.id == postProp.creatorId" @click="state.editPost = !state.editPost"></i>
        <i class="fa fa-trash text-danger" aria-hidden="true" v-if="state.account.id == postProp.creatorId" @click="deletePost"></i>
        <p class="card-text" v-if="postProp.creator">
          Created By : {{ postProp.creator.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'
export default {
  name: 'PostComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editPost: false
    })
    return {
      state,
      deletePost() {
        try {
          postService.deletePost(props.postProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editPost(e) {
        logger.log('editing post', e.target.innerText)
        try {
          postService.editPost(props.postProp.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

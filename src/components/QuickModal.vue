<template>
  <div class="QuickModal">
    <!-- Modal -->
    <div class="modal fade"
         id="modelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modal title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createPost">
              <div class="form-group">
                <input type="text"
                       name="title"
                       id="title"
                       class="form-control"
                       placeholder="Enter post Title"
                       aria-describedby="helpId"
                       v-model="state.newPost.title"
                >
                <input type="text"
                       name="imgUrl"
                       id="imgUrl"
                       class="form-control"
                       placeholder="Enter img url"
                       aria-describedby="helpId"
                       v-model="state.newPost.imgUrl"
                >
                <button class="btn btn-success" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger'
import { reactive } from 'vue'
import { postService } from '../services/PostService'
export default {
  name: 'QuickModal',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      async createPost() {
        try {
          await postService.createPost(state.newPost)
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

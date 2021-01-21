import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    const res = await api.get('api/posts')
    console.log(res)
    AppState.posts = res.data
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    console.log(res)
    // AppState.posts.push(res.data)
    this.getPosts()
  }

  async deletePost(postId) {
    await api.delete('api/posts/' + postId)
    // this.getPosts()
    const postInd = AppState.posts.findIndex(p => p.id === postId)
    AppState.posts.splice(postInd, 1)
  }

  async editPost(postId, newTitle) {
    const postData = { title: newTitle }
    const res = await api.put('api/posts/' + postId, postData)
    // this.getPosts()
    const postInd = AppState.posts.findIndex(p => p.id === postId)
    AppState.posts.splice(postInd, 1, res.data)
  }
}

export const postService = new PostService()

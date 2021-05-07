import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
    logger.log(AppState.posts)
  }

  async create(body) {
    await api.post('api/posts', body)
    this.getAll()
  }
}

export const postsService = new PostsService()

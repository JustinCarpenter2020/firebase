import { storage } from '../firebaseconfig'
import { logger } from '../utils/Logger'
class FireBaseLogic {
  async upload(imgName, data) {
    const collection = storage.ref('Images/' + imgName + '.png')
    const snapshot = await collection.put(data)
    const url = await snapshot.ref.getDownloadURL()
    logger.log(url)
    return { url }
  }
}

export const fireBaseLogic = new FireBaseLogic()

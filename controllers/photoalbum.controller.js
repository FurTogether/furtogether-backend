import HttpException from '../exceptions/HttpException.js';
import { Op } from 'sequelize'

class PhotoAlbumController {
  constructor(db){
    this.db = db;
  }

  getTestProfile = async (req,res,next) => {
    try {
      console.log('test')

      res.status(200).json({
        success: true
      })

    } catch (error){
      console.log(error)
    }
  };

  uploadMultipleImages = async (req, res, next) => {
    try {
      // Request to accept array of urls
      const { listOfFileName, dogUpload } = req.body

      const dogId = dogUpload[0]
      // Take user_id from the cookies
      const { userId } = req.cookies
      // Take dog_id from the request.body

      const resultList = []
      for (const index in listOfFileName) {

        const createUpload = await this.db.Photo.create(
          {
            user_id : userId,
            url : listOfFileName[index],
            dog_id: dogId,
          }
        )
        const created_JSON = createUpload.toJSON()
        resultList.push(created_JSON)
        
      }
      res.status(200).json({
        code: '0',
        success: true,
        data: {
          resultList,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  retrieveMultipleImages = async(req,res,next) => {
    try {

      const { userId } = req.cookies
      const { filter } = req.body
      console.log(req.body)

      const result = await this.db.Photo.findAll({
        attributes : ['dog_id','url', 'updated_at'],
        order: [['updated_at', 'DESC']],
        limit: 30,
        where : {
          user_id : userId,
          dog_id : {
            [Op.or] : filter
          }
        },
      })

      // console.log(result)

      res.status(200).json({
        code: '0',
        success: true,
        data : result
      })

    } catch (error) {
      console.log(error)
    }
  }
  retrieveMultipleImagesFilterTest = async(req,res,next) => {
    try {

      const { userId } = req.cookies
      // const { listOfDog } = req.body
      // const dogId = listOfDog
      const listOfDog = ["c82e67e0-2cf1-48b9-a38e-e592f3b44c35","ed9fa2c2-89c5-4f15-ab89-bcc7a0986820"]
      // console.log(listOfDog)
      // const dogId = listOfDog[0]
      // console.log(dogId)
      // const userId = '114a76a0-d623-44ba-af60-c664fda316a5'
      const dogId = 'c82e67e0-2cf1-48b9-a38e-e592f3b44c35'

      const result = await this.db.Photo.findAll({
        attributes : ['user_id','dog_id','url', 'updated_at'],
        order: [['updated_at', 'DESC']],
        limit: 30,
        where : {
          user_id : userId,
          dog_id : {
            [Op.or] : listOfDog
          }
        },
      })

      // console.log(result)

      res.status(200).json({
        code: '0',
        success: true,
        data : result
      })

    } catch (error) {
      console.log(error)
    }
  }

  retrieveAllDogs = async(req, res,next) => {
    
    try {
      const { userId } = req.cookies


      const result = await this.db.Dog.findAll({
        attributes: ['id','dog','breed'],
        order: [['updated_at', 'DESC']],
        where: {
          user_id : userId
        }
      })
      
      console.log(result)

      res.status(200).json({
        code: '0',
        success: true,
        data : {
          dogList: result
        }
      })
    } catch (error) {
      console.log(error)
    }
  }


}

export default PhotoAlbumController
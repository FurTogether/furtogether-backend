import { Op } from 'sequelize';
import HttpException from '../exceptions/HttpException.js';

class ProfileController {
  constructor(db) {
    this.db = db;
  }

  // Retrieve user profile information using userId
  getHumanProfile = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      console.log(userId);
      const userProfile = await this.db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
        include: {
          as: 'dogs',
          model: this.db.Dog,
          required: false,
        },
        timeStamp: false,
      });
      // No user found throw error
      if (!userProfile) {
        throw new HttpException(500, 30001, 'User not found');
      }
      res.status(200).json({
        success: true,
        data: {
          userProfile,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Create New Dog Profile information
  createDogProfile = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const { dogArr } = req.body;
      const updatedDogArr = [];
      dogArr.forEach(async (dogProfile) => {
        const newDog = await this.db.Dog.create({
          userId,
          dog: dogProfile.dog,
          breed: dogProfile.breed,
          age: dogProfile.age,
          gender: dogProfile.gender,
          weight: dogProfile.weight,
        });
        updatedDogArr.push(newDog);
      });
      res.status(200).json({
        success: true,
        data: {
          dogArr: updatedDogArr,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Update dog profile based on userId and dogId
  // Create New Dog Profile information
  updateDogProfile = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const dogProfile = req.body;
      const [isUpdated, updatedDogProfile] = await this.db.Dog.update(
        {
          dog: dogProfile.dog,
          breed: dogProfile.breed,
          age: dogProfile.age,
          gender: dogProfile.gender,
          weight: dogProfile.weight,
        },
        {
          where: {
            [Op.and]: [{ userId }, { id: dogProfile.id }],
          },
          returning: true,
        }
      );
      if (!isUpdated) {
        throw new HttpException(500, 30001, 'Profile not saved');
      }
      res.status(200).json({
        success: true,
        data: {
          updatedDogProfile,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Update profile details for both human and dog based on userId
  updateHumanProfile = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const { name, email, postal, address, gender } = req.body;
      const updatedUser = await this.db.User.update(
        {
          // Cols to be updated
          name,
          email,
          postal,
          address,
          gender,
          updatedAt: Date.now(),
        },
        {
          // Identifier for row to update
          where: {
            id: userId,
          },
        }
      );
      // Dogs if exist will come in an array to cater for more than one dog
      updatedUser.dogs = [];
      if (req.body.dogsArr) {
        const { dogsArr } = req.body;
        console.log('dog', dogsArr);
        dogsArr.forEach(async (dogProfile) => {
          const updatedDog = await this.db.Dog.update(
            {
              dog: dogProfile.dog,
              breed: dogProfile.breed,
              age: dogProfile.age,
              gender: dogProfile.gender,
              weight: dogProfile.weight,
              updatedAt: Date.now(),
            },
            {
              where: {
                [Op.and]: [{ id: dogProfile.id }, { userId }],
              },
            }
          );
          updatedUser.dogs.push(updatedDog);
        });
      }
      res.status(200).json({
        success: true,
        data: {
          userProfile: updatedUser,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Delete dog profile
  deleteDogProfile = async (req, res, next) => {
    try {
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default ProfileController;

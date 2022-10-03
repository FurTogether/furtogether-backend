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
      const dogProfile = req.body;
      const newDog = await this.db.Dog.create({
        userId,
        dog: dogProfile.dog,
        breed: dogProfile.breed,
        age: dogProfile.age,
        gender: dogProfile.gender,
        weight: dogProfile.weight,
      });

      res.status(200).json({
        success: true,
        data: {
          newDog,
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
      // Save Failed
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
  updateUserProfile = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const userProfile = req.body;
      const [isUpdated, updatedUserProfile] = await this.db.User.update(
        {
          // Cols to be updated
          name: userProfile.name,
          email: userProfile.email,
          postal: userProfile.postal,
          address: userProfile.address,
          gender: userProfile.gender,
          updatedAt: Date.now(),
        },
        {
          // Identifier for row to update
          where: {
            id: userId,
          },
          returning: true,
        }
      );
      // Save Failed
      if (!isUpdated) {
        throw new HttpException(500, 30001, 'Profile not saved');
      }
      res.status(200).json({
        success: true,
        data: {
          userProfile: updatedUserProfile,
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
      const { userId } = req.cookies;
      const dogId = req.body;
      const isDeleted = await this.db.Dog.destroy({
        where: {
          userId,
          id: dogId,
        },
      });
      // Save Failed
      if (!isDeleted) {
        throw new HttpException(500, 30001, 'Profile not deleted');
      }
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default ProfileController;

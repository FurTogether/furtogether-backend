import { Op } from 'sequelize';
import HttpException from '../exceptions/HttpException.js';

class RoutineUserController {
  constructor(db) {
    this.db = db;
  }

  // Create a new routine
  createRoutines = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const routineDetails = req.body;
      // Create new routine_user for the routineId
      const newRoutine = await this.db.RoutineUser.create(
        {
          userId,
        },
        { returning: true }
      );
      // Create an entry for each dog tagged for the routine
      const createdRoutines = await routineDetails.dogs.forEach((dog) => {
        this.db.Routine.create(
          {
            dogId: dog.id,
            userId,
            name: routineDetails.name,
            locationId: routineDetails.locationId,
            routineId: newRoutine.id,
            startTime: routineDetails.startTime,
            endTime: routineDetails.endTime,
          },
          { returning: true }
        );
      });
      res.status(200).json({
        success: true,
        data: { newRoutine, createdRoutines },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Get all routines of the user using userId
  getRoutines = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const unformatedData = await this.db.RoutineUser.findAll({
        where: {
          userId,
        },
        include: {
          as: 'routines',
          model: this.db.Routine,
          include: this.db.Dog,
          required: false,
        },
        timeStamp: false,
      });

      const userRoutines = unformatedData.map((entry) => {
        const formatedEntry = {
          id: entry.id,
          dogs: [],
        };
        entry.routines.forEach((routine) => {
          formatedEntry.locationId = routine.locationId;
          formatedEntry.name = routine.name;
          formatedEntry.startTime = routine.start_time;
          formatedEntry.endTime = routine.end_time;
          formatedEntry.dogs.push({
            id: routine.dog.id,
            name: routine.dog.dog,
          });
        });
        return formatedEntry;
      });
      res.status(200).json({
        success: true,
        data: {
          userRoutines,
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

export default RoutineUserController;

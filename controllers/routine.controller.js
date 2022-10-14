import { Op } from 'sequelize';
import HttpException from '../exceptions/HttpException.js';

class RoutineController {
  constructor(db) {
    this.db = db;
  }

  // Create a new routine
  createRoutines = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const routineDetails = req.body;
      // Create new routine_user for the routineId
      console.log({ routineDetails });
      const newRoutine = await this.db.Routine.create(
        {
          userId,
          name: routineDetails.name,
          locationId: routineDetails.locationId,
          start_time: routineDetails.start_time,
          end_time: routineDetails.end_time,
          days: daysToString(routineDetails.days),
        },
        { returning: true }
      );
      // Create a routineDogs entry for each dog tagged for the routine
      const newRoutineDogs = await routineDetails.dogs.forEach((dog) => {
        this.db.RoutineDog.create(
          {
            dogId: dog.id,
            routineId: newRoutine.id,
          },
          { returning: true }
        );
      });
      res.status(200).json({
        success: true,
        data: { newRoutine },
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
      const results = await this.db.Routine.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: this.db.RoutineDog,
            include: this.db.Dog,
            required: false,
          },
          { model: this.db.Location, required: false },
        ],
        timeStamp: false,
      });
      // For formating the eager loading for dogs and location postal for easier access
      const userRoutines = results.map((entry) => {
        const formatedEntry = {
          id: entry.id,
          name: entry.name,
          days: daysToArray(entry.days),
          locationId: entry.locationId,
          position: { lat: entry.location.latitude, lng: entry.location.longitude },
          locationPostal: entry.location.postal,
          start_time: entry.start_time,
          end_time: entry.end_time,
        };
        const routine_dogs = entry.routine_dogs.map((routineDog) => {
          return {
            id: routineDog.dog.id,
            name: routineDog.dog.dog,
          };
        });
        formatedEntry.routineDogs = routine_dogs;
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
  updateRoutine = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const newRoutine = req.body;
      // Update details within the routine
      const updatedRoutine = await this.db.Routine.update(
        {
          name: newRoutine.name,
          locationId: newRoutine.locationId,
          start_time: newRoutine.start_time,
          end_time: newRoutine.end_time,
          days: daysToString(newRoutine.days),
        },
        {
          where: {
            id: newRoutine.id,
          },
          returning: true,
        }
      );

      // Destroy all exisiting routine dogs then recreate the newly submitted ones
      const routineDogs = await this.db.RoutineDog.destroy({
        where: { routineId: newRoutine.id },
      });
      // Create the newly submitted dogs
      const newRoutineDogs = await newRoutine.routineDogs.forEach((dog) => {
        this.db.RoutineDog.create(
          {
            dogId: dog.id,
            routineId: newRoutine.id,
          },
          { returning: true }
        );
      });
      // Save Failed
      res.status(200).json({
        success: true,
        data: {
          updatedRoutine,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Delete dog profile
  deleteRoutine = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const { routineId } = req.body;
      console.log({ routineId });
      const deleteRoutineDogs = await this.db.RoutineDog.destroy({
        where: {
          routineId: routineId,
        },
      });
      const deleteRoutine = await this.db.Routine.destroy({
        where: {
          id: routineId,
        },
      });
      // Save Failed
      if (!deleteRoutine || !deleteRoutineDogs) {
        throw new HttpException(500, 30001, 'Routine not deleted');
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

export default RoutineController;

// Converts days from string to array vice versa
function daysToArray(stringDays) {
  const arrayDays = stringDays.split(' ');
  return arrayDays;
}

function daysToString(arrayDays) {
  const stringDays = arrayDays.join(' ');
  return stringDays;
}

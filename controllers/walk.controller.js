export default class WalkController {
  constructor(db) {
    this.db = db;
  }

  getUserDaily = async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const userDaily = await this.db.Daily.findOne({
        where: {
          userId,
        },
        include: {
          model: this.db.Location,
          require: false,
        },
      });
      res.status(200).json({ userDaily });
    } catch (error) {
      next(err);
    }
  };

  deleteDaily = async (req, res, next) => {
    try {
      const { userId } = req.cookies;

      const isDeleted = await this.db.Daily.destroy({
        where: {
          userId,
        },
      });

      if (isDeleted) {
        res.status(200).json({ success: true });
      } else {
        throw new HttpException(500, 30006, 'Could not delete daily record.');
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  changeHeadCount = async (req, res, next) => {
    try {
      const { newStartTime, locationId } = req.body;
      const { userId } = req.cookies;
      // Search for existing record
      const userDaily = await this.db.Daily.findOne({
        where: {
          userId,
        },
      });
      // If record exist update else create new record
      if (userDaily) {
        const updatedRows = await this.db.Daily.update(
          {
            locationId,
            start_time: newStartTime,
          },
          {
            where: {
              userId,
            },
          }
        );
      } else {
        const newUserFaily = await this.db.Daily.create({
          locationId,
          start_time: newStartTime,
          userId,
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };

  getSameTimingMarkers = async (req, res, next) => {
    try {
      const { timeFilter } = req.body;
      const convertedFilter = Number(timeFilter.replace(':', ''));
      // Finds all daily routines
      const locations = await this.db.Location.findAll({
        include: {
          as: 'dailies',
          model: this.db.Daily,
        },
      });
      if (!locations) {
        throw new HttpException(500, 30001, 'Locations not found');
      }
      res.status(200).json({ locations });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

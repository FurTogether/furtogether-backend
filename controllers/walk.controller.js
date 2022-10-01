import db from "../db/models/index.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

const getHeadCount = async (req, res) => {
  try {
    const { markerIndex } = req.params;
    // 1. get time of user
    // const user_id = req.cookie("userId");
    const person = await db.Routine.findOne({
      where: {
        user_id: "1cc23a76-0b3d-41e3-a9f6-0ea3d1cb5017", // user_id,
      },
    });

    console.log(`the user`, person.dataValues);
    const start = person.dataValues.start_time
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // 2. get headcount that match start time
    const similarRoutines = await db.Routine.findAll({
      where: {
        [Op.and]: [
          // {
          //   start_time: {
          //     [Op.lte]: [start],
          //   },
          // },
          {
            end_time: {
              [Op.gte]: [start],
            },
          },
          {
            location_id: markerIndex,
          },
        ],
      },
    });
    const similarRoutinesCount = similarRoutines.length;
    res.status(200).json(similarRoutinesCount);
    // res.status(200).json(start)
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getAllMarkers = async (req, res) => {
  const array = [];
  const place = {};
  try {
    const results = await db.Location.findAll({
      include: { as: "routines", model: db.Routine, required: false },
    });
    // console.log(`the markers`, result.length);
    const formattedResults = results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        postal: result.postal,
        position: {
          lat: result.latitude,
          lng: result.longitude,
        },
        headCount: result.routines.length,
      };
    });
    console.log("aaaaa", formattedResults);
    res.status(200).json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { getHeadCount, getAllMarkers };

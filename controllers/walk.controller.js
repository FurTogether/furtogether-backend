import db from "../db/models/index.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

const getHeadCount = async (req, res) => {
  try {
    // const { markerIndex } = req.params;
    // 1. get time of user
    const { userId } = req.cookies;
    const person = await db.Routine.findOne({
      where: {
        userId, //"1cc23a76-0b3d-41e3-a9f6-0ea3d1cb5017",
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
  // const array = [];
  // const place = {};
  try {
    const results = await db.Location.findAll({
      include: { as: "routines", model: db.Routine, required: false },
    });
    console.log(`the markers`, results);
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

const changeHeadCount = async (req, res) => {
  try {
    const { markerIndex } = req.params;
    const { st } = req.query;
    // const { startInt } = req.params;
    console.log(req.params, typeof st);
    console.log(
      `>>>>>>>>>>>>>>>>>>>>>>> the markerindex`,
      parseInt(markerIndex),
      "start_time",
      st + ":00",
      "end_time",
      (parseInt(st) + 1).toString() + ":00"
    );

    console.log("all cookies", req.cookies);
    const { userId } = req.cookies;

    console.log(`the userId`, userId, markerIndex, st);

    const updatedRows = await db.Routine.update(
      {
        location_id: parseInt(markerIndex),
        start_time: `${st}:00`,
        end_time: `${(Number(st) + 1).toString()}:00`,
      },
      {
        where: {
          userId, //: "e726585c-efa6-4f07-96fb-0deb6b2c6ebd", //userId
        },
      }
    );
    console.log(`updated info`, updatedRows);

    res.status(200).json(updatedRows);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getSameTimingMarkers = async (req, res) => {
  try {
    const { start_int } = req.query;
    console.log('startInt', start_int)
    const results = await db.Routine.findAll({
      include: [
        {
          as: "location",
          model: db.Location,
        },
      ],
    });
 console.log(results.dataValues)
    const changeToInt = results.map((result) => {
      return {
        id: result.location_id,
        start: parseInt(result.start_time.split(":")[0]),
        end: parseInt(result.end_time.split(":")[0]),
        name: result.location.name,
        position: {
          lat: result.location.latitude,
          lng: result.location.longitude,
        },
      };
    });
    const matchTimings = changeToInt.map((result) => {
      console.log(`result.start`, result.start)
      console.log(`start_int`, start_int, typeof(start_int), Number(start_int))
      if (result.start <= Number(start_int)) {
        //startInt)
        return {
          id: result.id,
          name: result.name,
          position: {
            lat: result.position.lat,
            lng: result.position.lng,
          },
        };
      }
    });

    console.log("matchTimings", matchTimings.length, matchTimings);
    matchTimings.forEach((item) => {
      if (!matchTimings[item.name]) {
        matchTimings[item.name] = {
          id: item.id,
          name: item.name,
          position: item.position,
          headCount: 1,
        };
      } else {
        matchTimings[item.name].headCount++;
      }
    });
    const testA = [];
    for (const key in matchTimings) {
      testA.push(matchTimings[key]);
    }
    const markers = [];
    for (let i = 0; i < testA.length; i++) {
      if ("headCount" in testA[i]) {
        markers.push(testA[i]);
      }
    }
    console.log("markers", markers, markers.length);
    res.status(200).json(markers);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { getHeadCount, getAllMarkers, changeHeadCount, getSameTimingMarkers };

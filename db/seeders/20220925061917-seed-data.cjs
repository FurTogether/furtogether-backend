/* eslint-disable linebreak-style */
const { faker } = require("@faker-js/faker");
// npm install uuid
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userAccountList = [];
    const dogList = [];
    // const locations = [];
    const routines = [];
    const locations = [
      {
        id: 0,
        name: "ACSJ",
        latitude: 1.3092704692453194,
        longitude: 103.84171357848649,
        postal: 227988,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 1,
        name: "Teachers Network",
        latitude: 1.2983567346608644,
        longitude: 103.82811403272059,
        postal: 249564,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Botanic Gardens",
        latitude: 1.3120259209221141,
        longitude: 103.81481877874702,
        postal: 259569,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "Irwell Bank",
        latitude: 1.2979640772346543,
        longitude: 103.83103939668233,
        postal: 239200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: "Chatsworth Park",
        latitude: 1.3018063725719684,
        longitude: 103.82199634420073,
        postal: 249767,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (let i = 0; i < 10; i += 1) {
      const accountOwnerUserId = uuidv4();
      const dogId = uuidv4();
      // const locationId = uuidv4();
      const username = faker.internet.userName();

      // Create 1 same guy with 2 dog
      if (i === 3) {
        dogList.push({
          id: uuidv4(),
          dog: faker.name.firstName(),
          age: faker.datatype.number({ max: 30 }),
          breed: faker.animal.dog(),
          gender: faker.helpers.arrayElement(["M", "F"]),
          weight: faker.datatype.number({
            min: 10,
            max: 50,
          }),
          created_at: new Date(),
          updated_at: new Date(),
          user_id: accountOwnerUserId,
        });
      }

      // Main bulk of the seeder data for userAccount, routines, location and dog
      userAccountList.push({
        id: accountOwnerUserId,
        name: username,
        password: 'testing', // faker.internet.password(),
        postal: faker.address.zipCode(),
        address: faker.address.city(),
        gender: faker.helpers.arrayElement(["M", "F"]),
        created_at: new Date(),
        updated_at: new Date(),
        email: faker.internet.email(),
      });
      dogList.push({
        id: dogId,
        dog: faker.name.firstName(),
        age: faker.datatype.number({ max: 30 }),
        breed: faker.animal.dog(),
        gender: faker.helpers.arrayElement(["M", "F"]),
        weight: faker.datatype.number({
          min: 10,
          max: 50,
        }),
        created_at: new Date(),
        updated_at: new Date(),
        user_id: accountOwnerUserId,
      });
      // locations.push({
      //   id: locationId,
      //   // longitude: faker.helpers.arrayElement([30, 50, 90]),
      //   // latitude: faker.helpers.arrayElement([20, 55, 100]),
      //   postal: faker.helpers.arrayElement([
      //     227988, 249564, 257494, 239200, 249767,
      //   ]),
      //   address: faker.helpers.arrayElement([
      //     "ACSJ",
      //     "Teachers Network",
      //     "Botanic Gardens",
      //     "Irwell Bank",
      //     "Chatsworth Park",
      //   ]),
      //   // name: username,
      // created_at: new Date(),
      // updated_at: new Date(),
      // });
      routines.push({
        id: uuidv4(),
        dog_id: dogId,
        user_id: accountOwnerUserId,
        location_id: Math.floor(Math.random() * 4) + 1, //locationId,
        start_time:
          Math.floor(Math.random() * 2) + ":" + Math.floor(Math.random() * 60), //new Date(),
        end_time: Math.floor(Math.random() * 24) + ":" + Math.floor(Math.random() * 60), //faker.date.soon(1, new Date()),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      const resultUser = await queryInterface.bulkInsert(
        "users",
        userAccountList
      );
      const resultDog = await queryInterface.bulkInsert("dogs", dogList);
      const resultlocations = await queryInterface.bulkInsert(
        "locations",
        locations
      );
      const resultRoutines = await queryInterface.bulkInsert(
        "routines",
        routines
      );
    } catch (error) {
      console.log(error);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("dogs", null, {});
    await queryInterface.bulkDelete("locations", null, {});
    await queryInterface.bulkDelete("resultRoutines", null, {});
  },
};

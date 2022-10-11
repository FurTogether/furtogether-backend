const { faker } = require('@faker-js/faker');
// npm install uuid
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userAccountList = [];
    const dogList = [];
    const routines = [];
    const routine_dogs = [];
    const daily = [];
    const locations = [
      {
        id: uuidv4(),
        name: 'ACSJ',
        latitude: 1.3092704692453194,
        longitude: 103.84171357848649,
        postal: 227988,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Teachers Network',
        latitude: 1.2983567346608644,
        longitude: 103.82811403272059,
        postal: 249564,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Botanic Gardens',
        latitude: 1.3120259209221141,
        longitude: 103.81481877874702,
        postal: 259569,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Irwell Bank',
        latitude: 1.2979640772346543,
        longitude: 103.83103939668233,
        postal: 239200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Chatsworth Park',
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
      const username = faker.internet.userName();
      const routineId = uuidv4();

      // Create 1 same guy with 2 dog
      if (i === 3) {
        dogList.push({
          id: uuidv4(),
          dog: faker.name.firstName(),
          age: faker.datatype.number({ max: 30 }),
          breed: faker.animal.dog(),
          gender: faker.helpers.arrayElement(['M', 'F']),
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
        password:
          '521b9ccefbcd14d179e7a1bb877752870a6d620938b28a66a107eac6e6805b9d0989f45b5730508041aa5e710847d439ea74cd312c9355f1f2dae08d40e41d50', // Password is 'testing',
        postal: faker.address.zipCode(),
        address: faker.address.city(),
        gender: faker.helpers.arrayElement(['M', 'F']),
        created_at: new Date(),
        updated_at: new Date(),
        email: faker.internet.email(),
      });
      dogList.push({
        id: dogId,
        dog: faker.name.firstName(),
        age: faker.datatype.number({ max: 30 }),
        breed: faker.animal.dog(),
        gender: faker.helpers.arrayElement(['M', 'F']),
        weight: faker.datatype.number({
          min: 10,
          max: 50,
        }),
        created_at: new Date(),
        updated_at: new Date(),
        user_id: accountOwnerUserId,
      });

      routines.push({
        id: routineId,
        user_id: accountOwnerUserId,
        name: 'Walkwalk',
        location_id: locations[faker.datatype.number({ min: 0, max: 4 })].id,
        start_time:
          String(
            faker.datatype.number({
              min: 0,
              max: 23,
            })
          ) +
          ':' +
          String(faker.datatype.number({ min: 0, max: 5 })) +
          String(faker.datatype.number({ min: 0, max: 9 })),
        end_time: '23:00',
        days: 'mon',
        created_at: new Date(),
        updated_at: new Date(),
      });

      routine_dogs.push({
        id: uuidv4(),
        dog_id: dogId,
        routine_id: routineId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      daily.push({
        id: uuidv4(),
        location_id: locations[faker.datatype.number({ min: 0, max: 4 })].id,
        user_id: accountOwnerUserId,
        start_time:
          String(
            faker.datatype.number({
              min: 0,
              max: 18,
            })
          ) +
          ':' +
          String(faker.datatype.number({ min: 0, max: 5 })) +
          String(faker.datatype.number({ min: 0, max: 9 })),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      const resultUser = await queryInterface.bulkInsert('users', userAccountList);
      const resultDog = await queryInterface.bulkInsert('dogs', dogList);
      const resultlocations = await queryInterface.bulkInsert('locations', locations);
      const resultRoutines = await queryInterface.bulkInsert('routines', routines);
      const resultRoutineDogs = await queryInterface.bulkInsert('routine_dogs', routine_dogs);
      const resultDaily = await queryInterface.bulkInsert('daily', daily);
    } catch (error) {
      console.log(error);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('daily', null, {});
    await queryInterface.bulkDelete('routine_dogs', null, {});
    await queryInterface.bulkDelete('routines', null, {});
    await queryInterface.bulkDelete('locations', null, {});
    await queryInterface.bulkDelete('dogs', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};

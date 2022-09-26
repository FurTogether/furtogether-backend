/* eslint-disable linebreak-style */
const faker = require('faker');
// npm install uuid
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userAccountList = [];
    const dogList = [];
    const locations = [];
    const routines = [];

    for (let i = 0; i < 10; i += 1) {
      const accountOwnerUserId = uuidv4();
      const dogId = uuidv4();
      const locationId = uuidv4();
      const username = faker.internet.userName();

      // Create 1 same guy with 2 dog
      if (i === 3) {
        dogList.push({
          id: uuidv4(),
          dog: faker.name.firstName(),
          age: faker.datatype.number({ max: 30 }),
          breed: faker.animal.dog(),
          gender: faker.random.arrayElement(['M', 'F']),
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
        password: faker.internet.password(),
        postal: faker.address.zipCode(),
        address: faker.address.city(),
        gender: faker.random.arrayElement(['M', 'F']),
        created_at: new Date(),
        updated_at: new Date(),
        email: faker.internet.email(),
      });
      dogList.push({
        id: dogId,
        dog: faker.name.firstName(),
        age: faker.datatype.number({ max: 30 }),
        breed: faker.animal.dog(),
        gender: faker.random.arrayElement(['M', 'F']),
        weight: faker.datatype.number({
          min: 10,
          max: 50,
        }),
        created_at: new Date(),
        updated_at: new Date(),
        user_id: accountOwnerUserId,
      });
      locations.push({
        id: locationId,
        longitude: faker.random.arrayElement([30, 50, 90]),
        latitude: faker.random.arrayElement([20, 55, 100]),
        postal: faker.random.arrayElement([520321, 510231, 532013, 142345, 563213]),
        address: faker.random.arrayElement(['Bedok', 'Simei', 'Novena', 'Botanic Gardens']),
        name: username,
        created_at: new Date(),
        updated_at: new Date(),
      });
      routines.push({
        id: uuidv4(),
        dog_id: dogId,
        user_id: accountOwnerUserId,
        location_id: locationId,
        start_time: new Date(),
        end_time: faker.date.soon(1, new Date()),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      const resultUser = await queryInterface.bulkInsert('users', userAccountList);
      const resultDog = await queryInterface.bulkInsert('dogs', dogList);
      const resultlocations = await queryInterface.bulkInsert('locations', locations);
      const resultRoutines = await queryInterface.bulkInsert('routines', routines);
    } catch (error) {
      console.log(error);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('dogs', null, {});
    await queryInterface.bulkDelete('locations', null, {});
    await queryInterface.bulkDelete('resultRoutines', null, {});
  },
};

module.exports = {
  async up(queryInterface, Sequelize) {
    // USERS TABLE
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postal: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // DOGS TABLE
    await queryInterface.createTable('dogs', {
      id: {
        allowNullL: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      dog: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      breed: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      age: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // GATHERING LOCATIONS TABLE
    await queryInterface.createTable('locations', {
      id: {
        allowNullL: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      latitude: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      longitude: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      postal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // ROUTINES TABLE
    await queryInterface.createTable('routines', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      location_id: {
        type: Sequelize.UUID,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      days: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_time: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      end_time: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // ROUTINE DOGS TABLE
    await queryInterface.createTable('routine_dogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      dog_id: {
        type: Sequelize.UUID,
        references: {
          model: 'dogs',
          key: 'id',
        },
      },
      routine_id: {
        type: Sequelize.UUID,
        references: {
          model: 'routines',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        // type: Sequelize.DATE,
        type: Sequelize.STRING,
      },
      updated_at: {
        allowNull: false,
        // type: Sequelize.DATE,
        type: Sequelize.STRING,
      },
    });

    // DAILY TABLE
    await queryInterface.createTable('dailies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      location_id: {
        type: Sequelize.UUID,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      start_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('daily');
    await queryInterface.dropTable('routine_dogs');
    await queryInterface.dropTable('routines');
    await queryInterface.dropTable('locations');
    await queryInterface.dropTable('dogs');
    await queryInterface.dropTable('users');
  },
};

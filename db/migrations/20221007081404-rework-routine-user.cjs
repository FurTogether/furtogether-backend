'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Added Routine_user table so that one created routine will only have 1 ref id
    // Routines table will now be routines for each dog
    await queryInterface.createTable('routine_users', {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add routineId column in routines table
    await queryInterface.addColumn('routines', 'routine_user_id', {
      type: Sequelize.UUID,
      references: {
        model: 'routine_users',
        key: 'id',
      },
    });
    await queryInterface.addColumn('routines', 'name', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('routines', 'routine_user_id');
    queryInterface.removeColumn('routines', 'name');
    await queryInterface.dropTable('routine_users');
  },
};


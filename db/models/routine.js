export default function initRoutineModel(sequelize, DataTypes) {
  return sequelize.define(
    'routine',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      location_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      dog_id: {
        type: DataTypes.UUID,
        references: {
          model: 'dogs',
          key: 'id',
        },
      },
      routine_user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'routine_users',
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { underscored: true, timestamp: true }
  );
}

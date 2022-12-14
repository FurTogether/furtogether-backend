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
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      location_id: {
        type: DataTypes.UUID,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      days: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start_time: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      end_time: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { underscored: true, timestamp: true }
  );
}

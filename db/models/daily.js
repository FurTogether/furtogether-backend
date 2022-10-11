export default function initDailyModel(sequelize, DataTypes) {
  return sequelize.define(
    'daily',
    {
      id: {
        allowNullL: false,
        primaryKey: true,
        autoIncrement: true,
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
      start_time: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { underscored: true, timestamp: true }
  );
}

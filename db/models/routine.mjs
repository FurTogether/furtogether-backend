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

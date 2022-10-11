export default function initRoutineDogModel(sequelize, DataTypes) {
  return sequelize.define(
    'routine_dogs',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      routine_id: {
        type: DataTypes.UUID,
        references: {
          model: 'routines',
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
    },
    { underscored: true, timestamp: true }
  );
}

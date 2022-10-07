export default function initRoutineUserModel(sequelize, DataTypes) {
  return sequelize.define(
    'routine_user',
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
    },
    { underscored: true, timestamp: true }
  );
}

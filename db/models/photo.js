export default function initPhotoModel(sequelize, DataTypes) {
  return sequelize.define(
    'photo',
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
      dog_id: {
        type: DataTypes.UUID,
        references: {
          model: 'dogs',
          key: 'id',
        },
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start_time: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'UnNeeded but lazy delete'
      }
    },
    { underscored: true, timestamp: true }
  );
}

export default function initDogModel(sequelize, DataTypes) {
  return sequelize.define(
    'dog',
    {
      id: {
        allowNullL: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      dog: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      breed: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
      timestamp: true,
    }
  );
}

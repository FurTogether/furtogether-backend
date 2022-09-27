export default function initUserModel(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      postal: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { underscored: true, timestamp: true }
  );
}

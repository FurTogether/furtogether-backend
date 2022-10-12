export default function initLocationModel(sequelize, DataTypes) {
  return sequelize.define(
    'location',
    {
      id: {
        allowNullL: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      latitude: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      longitude: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      postal: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { underscored: true, timestamp: true }
  );
}

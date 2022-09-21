export default function initLocationModel(sequelize, DataTypes) {
  return sequelize.define(
    'location',
    {
      id: {
        allowNullL: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      longitude: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      latitude: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      postal: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { underscored: true, timestamp: true }
  );
}

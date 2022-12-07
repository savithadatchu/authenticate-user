module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("role", {
    type: {
      type: DataTypes.STRING
    }
  });

  return Roles;
};

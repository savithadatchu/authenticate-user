module.exports = (sequelize, DataTypes) => {
    const Permissions = sequelize.define("permission", {
        permissions: {
            type: DataTypes.STRING
        }
    });

    return Permissions;
};

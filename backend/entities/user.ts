import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface IUserAttributes {
    UserID: string;
    Email: string;
    ArtistName?: string;
    Country?: string;
    City?: string;
    ProfileImg?: string;
    CreatedAt?: Date;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, 'UserID'> { }

class UserModel extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public UserID!: string;
    public Email!: string;
    public ArtistName?: string;
    public Country?: string;
    public City?: string;
    public ProfileImg?: string;
    public CreatedAt?: Date;
}

UserModel.init(
    {
        UserID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        ArtistName: {
            type: DataTypes.STRING,
        },
        Country: {
            type: DataTypes.STRING,
        },
        City: {
            type: DataTypes.STRING,
        },
        ProfileImg: {
            type: DataTypes.STRING,
        },
        CreatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'users',
    }
);

sequelize.sync();

export default UserModel;

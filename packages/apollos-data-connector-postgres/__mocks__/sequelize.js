// import SequelizeMock from 'sequelize-mock';

const sequelizeReal = jest.requireActual('sequelize');

module.exports = {
  ...sequelizeReal,
  // Sequelize: SequelizeMock,
};

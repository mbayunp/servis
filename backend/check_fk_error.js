import sequelize from './src/config/database.js';

const check = async () => {
  try {
    const [results] = await sequelize.query(`SHOW ENGINE INNODB STATUS;`);
    const status = results[0]['Status'];
    const fkIndex = status.indexOf('LATEST FOREIGN KEY ERROR');
    if (fkIndex !== -1) {
      console.log(status.substring(fkIndex, fkIndex + 1000));
    } else {
      console.log('No recent FK error found.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();

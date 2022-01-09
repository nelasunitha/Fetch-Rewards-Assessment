// Seeded the given data for convinence.
const db = require('./server/db/db');
const User = require('./server/db/User');
// const { blue, cyan, green, red } = require('chalk');

const seed = async () => {
  try {
    await db.sync({ force: true });


    const payer1 = await User.create({payer:"dannon",points:1000,timestamp: "2020-11-02 06:00:00-08"});

    const payer2 = await User.create({payer:"uniliver",points:200,timestamp: "2020-10-31 04:00:00-07"});
    const payer3 = await User.create({payer:"dannon",points:-200,timestamp: "2020-10-31 08:00:00-07"});
    const payer4 =await User.create({payer:"miller",points:10000,timestamp: "2020-11-01 07:00:00-08"});
    const payer5 = await User.create({payer:"dannon",points:300,timestamp: "2020-10-31 03:00:00-07"});

  } catch (err) {
    console.log(('🔥 An error occured!!'));
    console.error(err);

  }
}
module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}

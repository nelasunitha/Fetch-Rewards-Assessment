
const router = require('express').Router();
// const { ne } = require('sequelize/types/lib/operators');
const {
  models: { User },
} = require('../db');

// Adding  routes here:
//for convinience these are declared as global varibles
let deductedPointsObj = {};
let deductedPointsArr = [];
let spendPoints = [];
let deductedPoints;

// This is the the RESTful api route, the user can enter details by enter details of payer, points and time
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

// This is the RESTful api route, the user can use his points following the conditions
//1 Oldest points(by date and time to be spent first)
//2 No payer should go negative
// Update user points using User.update after spnding
router.put('/spend/:points', async (req, res, next) => {
  try {
    let payerPoints;
    let payerTime;
    let payerName;
    let updatedPoints = [];
    let points = req.params['points'];
    let data = await User.findAll({
      attributes: ['payer', 'points', 'timestamp'],
    });
    points = Number(points.slice(1));
    data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
    for (let i = 0; i < data.length, points > 0; i++) {
      let obj = data[i];
      payerPoints = obj['points'];

      //As the time format in Sequelize and Postman/json response is different, formated date with '.toISOString()';
      payerTime = obj['timestamp'].toISOString();
      payerName = obj['payer'];

      if (points < payerPoints) {
        deductedPoints = points;
        payerPoints = payerPoints - deductedPoints;
      } else {
        deductedPoints = payerPoints;
        payerPoints = payerPoints - deductedPoints;
      }
      updatedPoints.push([payerTime, payerPoints]);
      points = points - deductedPoints;
      deductedPointsArr.push([payerName, -1 * deductedPoints]);
    }
   // Array of the only payers whose points are spent.
    for (let i = 0; i < updatedPoints.length; i++) {
      let elem = updatedPoints[i];
      //update the point attribute after spending points
      await User.update({ points: elem[1] }, { where: { timestamp: elem[0] } });
    }
   // the response to the request.
    for (let i = 0; i < deductedPointsArr.length; i++) {
      let elem = deductedPointsArr[i];
      if (deductedPointsObj[elem[0]] === undefined)
        deductedPointsObj[elem[0]] = elem[1];
      else deductedPointsObj[elem[0]] = deductedPointsObj[elem[0]] + elem[1];
    }
    for (let result in deductedPointsObj) {
      spendPoints.push({ payer: result, points: deductedPointsObj[result] });
    }

    res.json(spendPoints);
  } catch (err) {
    next(err);
  }
});

// This is the RESTful API route to check the balance after subsequent  spend call
router.get('/balance', async (req, res, next) => {
  try {
    const data = await User.findAll({ attributes: ['payer', 'points'] });

    let balAmt = {};
    for (let i = 0; i < data.length; i++) {
      let payerObj = data[i];
      let payerName = payerObj['payer'];
      let payerPoints = payerObj['points'];
      balAmt[payerName] = (balAmt[payerName] || 0) + payerPoints;
    }
    res.json(balAmt);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

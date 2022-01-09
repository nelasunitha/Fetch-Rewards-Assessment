// const router = require('express').Router();
// // const { ne } = require('sequelize/types/lib/operators');
// const {
//   models: { User },
// } = require('../db');

// /**
//  * All of the routes in this are mounted on /api/users
//  * For instance:
//  *
//  * router.get('/hello', () => {...})
//  *
//  * would be accessible on the browser at http://localhost:3000/api/users/hello
//  *
//  * These route tests depend on the User Sequelize Model tests. However, it is
//  * possible to pass the bulk of these tests after having properly configured
//  * the User model's name and userType fields.
//  */

// // Add your routes here:

// let  deductedPointsObj = {};
// let  deductedPointsArr = [];
// let  spendPoints = [];
// let deductedPoints;

// const balanceAmt = function balancePoints(data) {
//   let balAmt = {};
//   for (let i = 0; i < data.length; i++) {
//     let payerObj = data[i];
//     let payerName = payerObj['payer'];
//     let payerPoints = payerObj['points'];
//     balAmt[payerName] = (balAmt[payerName] || 0) + payerPoints;
//   }
//   return balAmt;
// };

// router.post('/', async (req, res, next) => {
//   try {
//     res.status(201).send(await User.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

// router.put('/spend/:points',  async (req, res, next) => {
//   try {
//     let obj;
//     let payerPoints;
//     let payerTime;
//     let payerName;
//     let updatedPoints = [];
//     let actualPoints = [];
//     let actualPayerPoints;
//     let actualPayerTime;
//     let remainingPoints = [];
//     let actualPayer;
//      let balPoints;
//     let points = req.params['points'];

//   let data = await User.findAll({
//     attributes: ['payer', 'points', 'timestamp'],

//     });

//     // console.log('line 84', req.params.payer)
//     points = Number(points.slice(1));
//     data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
//     // console.log('data',data)
//     for (let i = 0; i < data.length; i++) {
//       obj = data[i];
//       actualPayer = obj['payer']
//       actualPayerPoints = (obj['points']);
//       actualPayerTime = obj['timestamp'].toISOString();
//       // console.log(typeof(actualPayerPoints));
//       actualPoints.push([actualPayer, actualPayerTime,actualPayerPoints])
//     }
//     console.log('act',actualPoints);

//     for (let i = 0; i < data.length; i++) {
//       if(points < 0) break;
//       obj = data[i];
//       // console.log('obj', obj)
//       // console.log('id',obj['uniqno'])
//       payerPoints = obj['points'];
//       payerTime = obj['timestamp'].toISOString();

//       // console.log('time',payerTime)
//       payerName = obj['payer'];
//       // console.log(payerPoints)
//       if (points < payerPoints) {
//         deductedPoints = points;
//         payerPoints = payerPoints - deductedPoints;

//       // }else if(payerPoints < 0) {

//       //   deductedPoints = payerPoints;
//       //   payerPoints = payerPoints + deductedPoints;

//       // }
//       }
//       else {
//         deductedPoints = payerPoints;
//         payerPoints = payerPoints - deductedPoints;
//       }
//       updatedPoints.push([payerName, payerTime, payerPoints])
//       points = points - deductedPoints;
//       deductedPointsArr.push([payerName, -1 * deductedPoints]);
//     }
//     console.log('up',updatedPoints );
//         for(let i = 0; i< updatedPoints.length; i++) {
//       let elem = updatedPoints[i];
//        await User.update({points : elem[1]}, {where: {timestamp : elem[0]}})

//     }
//     // await User.update({payer : 'dannon'},{where:{payer : 'hello'},})
//     // //  console.log('userPoints',userPoints)
//     for(let i = 0; i< updatedPoints.length; i++) {
//       let elem1 = actualPoints[i][1];
//       let elem2 = updatedPoints[i][1];
//       if(elem1 !== elem2 ) {
//         balPoints = elem1 - elem2
//         console.log('bal',balPoints);
//       }
//     }

//     for (let i = 0; i < deductedPointsArr.length; i++) {
//       let elem = deductedPointsArr[i];
//       if (deductedPointsObj[elem[0]] === undefined)
//         deductedPointsObj[elem[0]] = elem[1];
//       else deductedPointsObj[elem[0]] = deductedPointsObj[elem[0]] + elem[1];
//     }
//     for (let result in deductedPointsObj) {
//       spendPoints.push({ payer: result, points: deductedPointsObj[result] });
//     }

//     res.json(spendPoints);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/balance', async (req, res, next) => {
//   try {
//     // console.log(deductedPointsArr);
//     const userPoints = await User.findAll({ attributes: ['payer', 'points'] });
//     res.json(balanceAmt(userPoints));
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
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

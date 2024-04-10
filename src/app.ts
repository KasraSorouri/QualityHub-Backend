import express from 'express';
import cors from 'cors';

// *** Import Routers 
// import Authentication and User Routes
import userRouter from './modules/usersAndAuthentication/routes/users';
import roleRouter from './modules/usersAndAuthentication/routes/roles';
import rightRouter from './modules/usersAndAuthentication/routes/rights';
import loginRouter from './modules/usersAndAuthentication/routes/login';

// import Quality hub Routes
import productRouter from './modules/qualityHub/routes/product';
import productGrpRouter from './modules/qualityHub/routes/productGrps';
import workShiftRouter from './modules/qualityHub/routes/workShifts';
import stationRouter from './modules/qualityHub/routes/stations';
import materialRouter from './modules/qualityHub/routes/materials';
import machineRouter from './modules/qualityHub/routes/machines';
import recipeRouter from './modules/qualityHub/routes/recipes';
import rework from './modules/qualityHub/routes/reworks';

import nokGrpRouter from './modules/qualityHub/routes/nokGrps';
import nokCodeRouter from './modules/qualityHub/routes/nokCodes';
import rcaCodeRouter from './modules/qualityHub/routes/rcaCodes';
import classCodeRouter from './modules/qualityHub/routes/classCodes';

import nokDetectRouter from './modules/qualityHub/routes/nokDetect';


const app = express();
app.use(express.json(), cors());

// Authentication and User Routes
app.use('/api/auth/users', userRouter);
app.use('/api/auth/roles', roleRouter);
app.use('/api/auth/rights', rightRouter);
app.use('/api/auth/login', loginRouter);

// Quality hub Routes
app.use('/api/quality/products', productRouter);
app.use('/api/quality/product_grps', productGrpRouter);
app.use('/api/quality/shifts', workShiftRouter);
app.use('/api/quality/stations', stationRouter);
app.use('/api/quality/materials', materialRouter);
app.use('/api/quality/recipes', recipeRouter);
app.use('/api/quality/machines', machineRouter);
app.use('/api/quality/reworks', rework);

app.use('/api/quality/nok_grps', nokGrpRouter);
app.use('/api/quality/nok_codes', nokCodeRouter);
app.use('/api/quality/rca_codes', rcaCodeRouter);
app.use('/api/quality/class_codes', classCodeRouter);

app.use('/api/quality/nok_detect', nokDetectRouter);

app.get('/api/ping',(_req,res) => {
  res.send('Pong!');
});

export default app;
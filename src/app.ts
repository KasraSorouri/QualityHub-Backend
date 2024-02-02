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
import recipeRouter from './modules/qualityHub/routes/recipes';

const app = express();
app.use(express.json(), cors());

// Authentication and User Routes
app.use('/api/auth/users', userRouter);
app.use('/api/auth/roles', roleRouter);
app.use('/api/auth/rights', rightRouter);
app.use('/api/auth/login', loginRouter);

// Quality hub Routes
app.use('/api/quality/products', productRouter);
app.use('/api/quality/proproductsduct_grps', productGrpRouter);
app.use('/api/quality/shifts', workShiftRouter);
app.use('/api/quality/stations', stationRouter);
app.use('/api/quality/materials', materialRouter);
app.use('/api/quality/recipes', recipeRouter);
 
app.get('/api/ping',(_req,res) => {
  res.send('Pong!');
});

export default app;
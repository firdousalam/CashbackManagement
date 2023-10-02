const express = require('express');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const fs = require('fs-extra');
var cors = require('cors')
const swaggerDocument = require('./swagger.json');


const accessRoute           = require("./route/accessRoute");
const adminRoute            = require("./route/adminRoute");
const adminTypeRoute        = require("./route/adminTypeRoute");
const loginRoute            = require("./route/loginRoute");
const otpRoute              = require("./route/otpRoute");
const reports               = require("./route/reports");
const regionRoute           = require("./route/regionManagementRoute");
const userRoute             = require("./route/userRoute");
const rateRoute             = require("./route/rateRoute");
const rewardsRoute          = require("./route/rewardRoute");
const walletRoute           = require("./route/walletRoute");
const pinRoute              = require("./route/pinManagementRoute");
const languageRoute         = require("./route/languageRoute");
const app = express();
app.use(cors({
  origin: '*'
}));
const port = process.env.PORT;
const environment = process.env.environment;

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
console.log("environment",environment);
if(environment != 'production'){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
}

app.get('/Home', (req, res) => {
  res.send('Welcome to ABC365 App')
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/access",accessRoute);
app.use("/admin",adminRoute);
app.use("/adminType",adminTypeRoute);
app.use("/otp",otpRoute);
app.use("/reports",reports);
app.use("/region",regionRoute);
app.use("/user",userRoute);
app.use("/rate",rateRoute);
app.use("/rewards",rewardsRoute);
app.use("/wallet",walletRoute);
app.use("/login",loginRoute);
app.use("/pin",pinRoute);
app.use("/language",languageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
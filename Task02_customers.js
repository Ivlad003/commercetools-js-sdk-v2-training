const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerKeyVerfiedEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");
const { log } = require("./logger.js");

const customerSampleData = {
  firstName: "test2",
  lastName: "test",
  email: "test2@test.com",
  password: "123",
  key: "test1233",
  countryCode: "DE",
};

// createCustomer(customerSampleData).then(log).catch(log);

// getCustomerByKey('test1233').then(log).catch(log);

// getCustomerById("817328d0-c05d-41f1-a61b-2b7a96f3e807").then(log).catch(log);

// createCustomerKeyVerfiedEmail(customerSampleData).then(log).catch(log);

assignCustomerToCustomerGroup('test1233','testCustomerGroup123').then(log).catch(log);

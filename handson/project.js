const { apiRoot, projectKey } = require("./client.js");

module.exports.getProject = () =>{
    return apiRoot.withProjectKey({projectKey: projectKey}).get().execute();
}

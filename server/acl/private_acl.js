/*
TEMPLATE =
      "ROLE": {
          resource: '',    //  name of resource       ( names of module)
         operations: []       //  permitted operations   (GET, POST, PUT, DELETE, *)
          }
*/


const ACL = {
    "ADMIN": [{
        resource: "user",
        operations: ["*"]
    },{
        resource: "projects",
        operations: ["*"]
    }],
    "SUPER_ADMIN": [{
        resource: "*",
        operations: ["*"]
    }],
    "NEWER": [{
        resource: "projects",
        operations: ["GET"]     // user can only subscribe to feeds.
    }],
    "AP1":{
        resource: "projects",
        operations:["GET","POST"]
    },
    "AP2":{
        resource: "projects",
        operations:["GET","POST"]
    }
};

module.exports = ACL;
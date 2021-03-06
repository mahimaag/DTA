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
        resource: "user",
        operations: ["GET"]
    },{
        resource: "projects",
        operations: ["GET"]
    }],
    "AP1":[{
        resource: "projects",
        operations:["GET","POST"]
    }],
    "AP2":[{
        resource: "projects",
        operations:["GET","POST"]
    }]
};

module.exports = ACL;
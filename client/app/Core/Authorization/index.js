import React from 'react';

const Authorization = (WrappedComponent, allowedRoles) => {
  //get user role.
  //check if the role of user is present in allowed roles.
  //if user is authorized, return the wrapped component
  //if user is not authorized, return null/some message.

  //return WrappedComponent;
  /*return class extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      let user_role = 'a';
      if(!allowedRoles.includes(user_role)) {
        return null;
      }
      return (<WrappedComponent  {...this.props} />);
    }
  }*/
  let user_roles = 'admin';
  return allowedRoles == user_roles ? WrappedComponent : null;
}



const Authorization2 = (props) =>  {
  let allowedRoles = props.allowedRoles;
  //get user role.
  let userRole = props.user.role || "user";
  if(allowedRoles.includes(userRole)){
    return (
      {...props.children}
    );
  }
  return null;
}

export {Authorization, Authorization2};

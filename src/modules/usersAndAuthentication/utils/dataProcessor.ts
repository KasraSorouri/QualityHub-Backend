import bcrypt from 'bcrypt';

import { NewUser, UserData, Credential, NewRole, NewRight, UserWithRights, User, Role, RoleWithRights } from '../types';
import { isString, isNumber, isBoolean, stringLengthCheck } from '../../../utils/dataValidator';

const parseUsername = (username: unknown): string => {
  if (!isString(username) || !stringLengthCheck(username,3, 'username')) {
    throw new Error('Incorrect username!');
  }
  return username;
};

const parseFirstName = (firstName: unknown): string => {
  if (!isString(firstName)) {
    throw new Error('Incorrect firstName!');
  }
  return firstName;
};

const parseLastName = (lastName: unknown): string => {
  if (!isString(lastName)) {
    throw new Error('Incorrect lastName!');
  }
  return lastName;
};

const parseEmail = (email: unknown): string => {
  if (!isString(email) || !stringLengthCheck(email, 3, 'email')) {
    throw new Error('Incorrect email!');
  }
  return email;
}

const parsePhone = (phone: unknown): string => {
  if (!isString(phone) || !stringLengthCheck(phone, 3, 'phone')) {
    throw new Error('Incorrect phone!');
  }
  return phone;
}

const parseActive = (active: unknown): boolean => {
  if (!active || !isBoolean(active)) {
    throw new Error('Incorrect or missing data!');
  }
  return active;
};

const parsePassword = (password: unknown): string => {
  if(!password || !isString(password) || !stringLengthCheck(password, 6, 'password')) {
    throw new Error('Incorrect password!');
  }
  return password;
};

const passwordHashMaker = async (password: string): Promise<string> => {
  const saltRound = 10;
  const passwordhash = bcrypt.hash(password, saltRound);
  return passwordhash;
};

const parseRoleName = (roleName: unknown): string => {
  if (!isString(roleName)) {
    throw new Error('Incorrect firstName!');
  }
  return roleName;
};

const parseRightName = (right: unknown): string => {
  if (!isString(right)) {
    throw new Error('Incorrect firstName!');
  }
  return right;
};

const parseRelatedModule = (module: unknown): string => {
  if (!isString(module)) {
    throw new Error('Incorrect firstName!');
  }
  return module;
};

const parseRoles = (array:unknown): number[] => {
  if (!Array.isArray(array)) {
    throw new Error('Roles should be Array!');
  }
  if(!array || typeof array !== 'object') {
   throw new Error('Incorrect or Missing data!');  
  } 
  const roles: number[] = [];
  array.forEach(element => {
   isNumber(element) ? roles.push(element) : null ;  
  });
  return roles;
};

const userProcessor = async(userData: unknown): Promise<NewUser | UserData> => {
  if (!userData || typeof userData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('username' in userData && 'firstName' in userData && 'lastName' in userData) {
    const newUser: NewUser | UserData = {
      username: parseUsername(userData.username),
      firstName: parseFirstName(userData.firstName),
      lastName: parseLastName(userData.lastName),
      email: 'email' in userData ? parseEmail(userData.email) : '',
      phone: 'phone' in userData ? parsePhone(userData.phone) : '',
      active: 'active' in userData ? parseActive(userData.active) : false,
  };
    if ('password' in userData) {
      newUser.password = await passwordHashMaker(parsePassword(userData.password));
    }
    if ('roles' in userData) {
      newUser.roles = parseRoles(userData.roles);
    }
    return newUser;
  } else {
    throw new Error('Data is missing');
  }
};

const credentialsProcessor = (object: unknown): Credential => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect username or password!');
  }
  if ('username' in object && 'password' in object && isString(object.username) && isString(object.password)) {
    const credential = {
      username: object.username,
      password: object.password
    };    
    return credential;
  }
  throw new Error('Incorrect username or password!');
};

const roleProcessor = (roleData: unknown): NewRole => {
  if (!roleData || typeof roleData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('roleName' in roleData) {
    const newRole: NewRole = {
      roleName: parseRoleName(roleData.roleName),
      active: 'active' in roleData ? parseActive(roleData.active) : false,
  };
    if ('rights' in roleData) {
      newRole.rights = parseRoles(roleData.rights);
    }
    return newRole;
  } else {
    throw new Error('Data is missing');
  }
};

const rightProcessor = (rightData: unknown): NewRight => {
  if (!rightData || typeof rightData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('right' in rightData && 'relatedModule' in rightData) {
    const newRight: NewRight = {
      right: parseRightName(rightData.right),
      relatedModule: parseRelatedModule(rightData.relatedModule)
  };
    return newRight;
  } else {
    throw new Error('Data is missing');
  }
};

const parseUserResponse = (userData: User): UserWithRights => {
  return ({
    id: userData.id,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    active: userData.active,
    roles: userData.roles ? userData.roles.map(role => role.roleName) : [],
    rights: (userData.roles?.flatMap(role => role.rights?.map(right => right.right))?? []).filter((right): right is string => typeof right === 'string')
  });
};

const parseRoleResponse = (roleData: Role): RoleWithRights => {
  return ({
    id: roleData.id,
    roleName: roleData.roleName,
    active: roleData.active,
    rights: roleData.rights ? roleData.rights.map(role => role.right) : [],
  });
};

export {
  userProcessor,
  roleProcessor,
  rightProcessor,
  parseUserResponse,
  parseRoleResponse,
  credentialsProcessor,
  passwordHashMaker
};
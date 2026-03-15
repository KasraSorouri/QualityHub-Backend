import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SECRET } from '../../../configs/config';

import { User, Role, Right } from '../../../models';

import { UserCredentials } from '../types';

type Credentials = {
  username: string;
  password: string;
};

interface IUserPlain {
  id: number;
  username: string;
  password?: string;
  roles?: {
    roleName: string;
    rights?: { right: string }[];
  }[];
}

const login = async ({ username, password }: Credentials): Promise<UserCredentials> => {
  if (!username || !password) {
    throw new Error('username and password are required!');
  }

  const user = await User.findOne({
    where: {
      username: username,
    },
    include: [
      {
        model: Role,
        attributes: ['roleName'],
        through: { attributes: [] },
        include: [
          {
            model: Right,
            attributes: ['right'],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new Error('invalid username or password!');
  }
  const plainUser = user.get({ plain: true }) as IUserPlain;

  const passwordCorrect =
    user === null || !plainUser.password ? false : await bcrypt.compare(password, plainUser.password);

  if (!user || !passwordCorrect) {
    throw new Error('invalid username or password!');
  }
  /*
  const roles = user.roles?.map((role) => role.roleName);
  const rights = user.roles?.flatMap((role) => role.rights?.map((right) => right.right));

  const userForToken = {
    username: plainUser.username,
    roles,
    rights,
    id: user.id,
  };
*/
  // Extract User Roles
  const roles = (plainUser.roles ?? []).map((r) => r.roleName);

  // Extract User Rights
  const rights = (plainUser.roles ?? []).flatMap((role) => (role.rights ?? []).map((r) => r.right));

  // Remove duplicate Rights
  const uniqueRights = [...new Set(rights)];

  const userForToken = {
    id: plainUser.id,
    username: plainUser.username,
    roles: roles,
    rights: uniqueRights,
  };

  const token = jwt.sign(userForToken, SECRET);

  return {
    token,
    user: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    roles,
  };
};

export default {
  login,
};

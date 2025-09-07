import { Role, Right, RoleQuery } from '../../../models';
import { RoleWithRights, updateRole } from '../types';
import { roleProcessor } from '../utils/dataProcessor';

// Define role query
const query: RoleQuery = {
  include: [
    {
      model: Right,
      as: 'rights',
      attributes: ['id', 'right', 'relatedModule'],
      through: {
        attributes: [],
      },
    },
  ],
  attributes: {
    exclude: [],
  },
};

// Get All roles
const getAllRoles = async (): Promise<Role[]> => {
  const roles = await Role.findAll(query);
  return roles;
};

// Get a role based on ID
const getRole = async (id: number): Promise<RoleWithRights> => {
  const role = await Role.findByPk(id, query);
  if (!role) {
    throw new Error('the role not found');
  }

  const result: RoleWithRights = {
    id: role.id,
    roleName: role.roleName,
    active: role.active,
    rights: role.rights?.map((right) => right.right),
  };
  return result;
};

// Create a new role
const createRole = async (roleData: unknown): Promise<Role> => {
  const newRoleData = roleProcessor(roleData);

  const { roleName, active } = newRoleData;
  try {
    const newRole = await Role.create({ roleName, active });
    return newRole;
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update a Role
const updateRole = async (id: number, roleData: unknown): Promise<Role> => {
  const newRoleData = roleProcessor(roleData);

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      throw new Error('Role not found!');
    }
    // update Role
    await role.update(newRoleData);
    // update rights

    const updatedRole = await updateRoleRights(id, newRoleData.rights);
    return updatedRole;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

const updateRoleRights = async (id: number, rights: number[]): Promise<Role> => {
  const role = await Role.findByPk(id);

  const okRights = await Right.findAll({ where: { id: [...rights] } });

  if (!role) {
    throw new Error('role not found');
  }
  // remove old rights from role
  await role.setRights([]);

  try {
    await role.setRights(okRights);
    const updatedRole = await Role.findByPk(id, {
      include: [
        {
          model: Right,
          attributes: ['id', 'right', 'relatedModule'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!updatedRole) {
      throw new Error('role not found');
    }

    return updatedRole;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
};

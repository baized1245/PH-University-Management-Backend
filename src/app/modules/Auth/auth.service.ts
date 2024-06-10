import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.models';
import { TLoginUser } from './auth.interface';
import config from '../../config';

const loginUser = async (payLoad: TLoginUser) => {
  //checking if the user is exist

  const user = await User.isUserExistsByCustomId(payLoad.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payLoad?.password, user?.password)))
    // Access Granted: send AccessToken, RefreshToken
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // create token and send o the client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '90d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = (user: { userId: string; role: string }, payLoad) => {
  const result = await User.findOneAndUpdate({
    id: user.userId,
    role: user.role,
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
};

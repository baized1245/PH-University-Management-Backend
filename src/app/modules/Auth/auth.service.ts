import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.models';
import { TLoginUser } from './auth.interface';

const loginUser = async (payLoad: TLoginUser) => {
  //checking if the user is exist

  const user = await User.isUserExistsByCustomId(payLoad.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is already deleted

  //   const isDeleted = isUserExists?.isDeleted;

  //   if (isDeleted) {
  //     throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
  //   }

  // checking if the user is blocked

  //   const userStatus = isUserExists?.status;

  //   if (userStatus === 'blocked') {
  //     throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked!');
  //   }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payLoad?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // Access Granted: send AccessToken, RefreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};

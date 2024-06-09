import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.models';
import { TLoginUser } from './auth.interface';

const loginUser = async (payLoad: TLoginUser) => {
  //checking if the user is exist
  const isUserExists = await User.findOne({ id: payLoad?.id });
  console.log(isUserExists);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is already deleted

  const isDeleted = isUserExists?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
  }

  // checking if the user is blocked

  const userStatus = isUserExists?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked!');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payLoad?.password,
    isUserExists.password,
  );

  console.log({ isPasswordMatched });

  // Access Granted: send AccessToken, RefreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};

import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  //   Create a user object
  const userData: Partial<TUser> = {};

  //   if password not given , use default password
  userData.password = password || (config.default_password as string);

  //  set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //   set genarated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //   create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }

    // set id , _id as user
    payload.id = newUser[0].id; // embading id
    payload.user = newUser[0]._id; //referance _id

    // create a student (transection-2)
    const newstudent = await Student.create([payload], { session });

    if (!newstudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newstudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDb,
};

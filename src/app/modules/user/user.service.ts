import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';

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

  //   set genarated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // create a user
  const newUser = await User.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id; // embading id
    payload.user = newUser._id; //referance _id

    const newstudent = await Student.create(payload);
    return newstudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};

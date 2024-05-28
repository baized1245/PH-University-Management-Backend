import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.models';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  //2030 01 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year, semester code, 4 degit number
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString(); //0000 by default

  const lastStudentId = await findLastStudentId();
  //2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030

  const currentSemesterCode = payLoad.code;
  const currentYear = payLoad.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;

  return incrementId;
};

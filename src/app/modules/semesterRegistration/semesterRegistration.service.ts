import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if the semester is exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }
  // check if the semester is already registred
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic semester is already registrad',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async () => {};

const getSingleSemesterRegistrationFromDB = async () => {};

const updateSemesterRegistrationIntoDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};

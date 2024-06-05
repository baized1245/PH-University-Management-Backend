import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
// import sendResponse from "../../utils/sendResponse";
// import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // const result =
    // sendResponse(res,{
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Semester Registration is created successfully!",
    //     data:result
    // })
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    // const result =
    // sendResponse(res,{
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Semester Registration is created successfully!",
    //     data:result
    // })
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // const result =

    // sendResponse(res,{
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Semester Registration is created successfully!",
    //     data:result
    // })
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // const result =

    // sendResponse(res,{
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Semester Registration is created successfully!",
    //     data:result
    // })
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};

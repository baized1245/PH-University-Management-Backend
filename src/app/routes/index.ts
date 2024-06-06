import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

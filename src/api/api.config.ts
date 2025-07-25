export const FRAPPE_APIS = {
  GET_ALL_CLASS_FEED: {
    METHOD_STRING: 'parent_portal.api.sis_feed.class_feed.get_all_class_feed',
    SWR_KEY: 'get_all_class_feed',
  },
  GET_CLASS_FEED_BY_ID: {
    METHOD_STRING: 'parent_portal.api.sis_feed.class_feed.get_class_feed_by_id',
    SWR_KEY: `get_class_feed_by_id`,
  },
  GET_ALL_SCHOOL_FEED: {
    METHOD_STRING: 'parent_portal.api.sis_feed.school_feed.get_all_school_feed',
    SWR_KEY: 'get_all_school_feed',
  },
  GET_ALL_SCHOOL_FEED_HIGHLIGHT: {
    METHOD_STRING: 'parent_portal.api.sis_feed.school_feed.get_all_school_feed',
    SWR_KEY: 'get_all_school_feed_highlight',
  },
  GET_SCHOOL_FEED_BY_ID: {
    METHOD_STRING:
      'parent_portal.api.sis_feed.school_feed.get_school_feed_by_id',
    SWR_KEY: `get_school_feed_by_id`,
  },
  TOGGLE_LIKE: {
    METHOD_STRING: 'parent_portal.api.toggle_like.toggle_like',
  },
  UPLOAD_CLASS_FEED_PHOTO: {
    METHOD_STRING:
      'parent_portal.api.sis_feed.class_feed.upload_class_feed_photo',
  },
  CREATE_CLASS_FEED: {
    METHOD_STRING: 'parent_portal.api.sis_feed.class_feed.create_class_feed',
  },
  GET_TIMETABLE: {
    METHOD_STRING:
      'parent_portal.api.sis_timetable.timetable.get_individual_timetable',
    SWR_KEY: 'get_timetable',
  },
  GET_SCHOOL_CLASSES_BY_USER: {
    METHOD_STRING:
      'parent_portal.api.sis_school_year.school_class.get_all_school_class_of_current_user',
    SWR_KEY: 'get_school_classes_by_user',
  },
  GET_SCHOOL_CLASS_BY_ID: {
    METHOD_STRING:
      'parent_portal.api.sis_school_year.school_class.get_school_class_by_id',
    SWR_KEY: 'get_school_class_by_id',
  },
  GET_COURSE_CLASS_BY_ID: {
    METHOD_STRING:
      'parent_portal.api.sis_course.course_class.get_course_class_by_id',
    SWR_KEY: 'get_course_class_by_id',
  },
  GET_COURSE_CLASSES_BY_USER: {
    METHOD_STRING:
      'parent_portal.api.sis_course.course_class.get_all_course_class_of_current_user',
    SWR_KEY: 'get_course_classes_by_user',
  },
  GET_ATTENDANCE_SCHOOL_CLASS_RECORDS: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.get_attendance_log_school_class_by_date',
    SWR_KEY: 'get_attendance_school_class_records',
  },
  GET_ATTENDANCE_COURSE_CLASS_RECORDS: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.get_attendance_log_course_class_by_date',
    SWR_KEY: 'get_attendance_course_class_records',
  },
  CREATE_ATTENDANCE_SCHOOL_CLASS: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.create_attendance_log_school_class',
  },
  CREATE_ATTENDANCE_COURSE_CLASS: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.create_attendance_log_course_class',
  },
  GET_ATTENDANCE_STUDENT_SUMMARY: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.get_attendance_student_summary',
    SWR_KEY: 'get_attendance_student_summary',
  },
  GET_ATTENDANCE_STUDENT_CALENDAR: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.get_student_attendance_report',
    SWR_KEY: 'get_attendance_student_calendar',
  },
  GET_ATTENDANCE_STUDENT_TIMELINE: {
    METHOD_STRING:
      'parent_portal.api.sis_attendance.attendance.get_individual_attendance_history_by_date',
    SWR_KEY: 'get_attendance_student_timeline',
  },
  GET_CURRENT_SCHOOL_YEAR: {
    METHOD_STRING:
      'parent_portal.api.sis_school_year.school_year.get_current_school_year',
    SWR_KEY: 'get_current_school_year',
  },
  GET_UPCOMING_EVENTS: {
    METHOD_STRING:
      'parent_portal.api.sis_school_year.school_year.get_all_academic_year_events',
    SWR_KEY: 'get_upcoming_events',
  },
  GET_PROVINCES: {
    METHOD_STRING: '/p',
    SWR_KEY: 'get_provinces',
  },
  GET_PROVINCE: {
    METHOD_STRING: '/p/{{code}}?depth=2',
    SWR_KEY: 'get_province',
  },
  GET_DISTRICT: {
    METHOD_STRING: '/d/{{code}}?depth=2',
    SWR_KEY: 'get_district',
  },
  GET_STUDENTS_IN_FAMILY_BY_CODE: {
    METHOD_STRING: 'parent_portal.api.sis_student.student.get_student_infamily',
    SWR_KEY: 'get_students_in_family_by_code',
  },
  GET_STUDENT_BY_ID: {
    METHOD_STRING: 'parent_portal.api.sis_student.student.get_student_info',
    SWR_KEY: 'get_student_by_id',
  },
  REGISTRATION: {
    METHOD_STRING: 'parent_portal.api.sis_guardian.registration.input_guardian_registration',
    SWR_KEY: 'registration',
  },
  VALIDATE_EMAIL: {
    METHOD_STRING: 'parent_portal.api.sis_guardian.registration.check_exists_email',
    SWR_KEY: 'validate_email',
  },
}

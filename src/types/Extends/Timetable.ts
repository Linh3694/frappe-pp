export type Period = {
  ttDayID: string
  ttDayTitle: string
  ttDayWeekday: string
  ttColumnRowID: string
  ttDayRowClassID: string
  ttColumnRowType: "Lesson" | "Break" | "Service" | "Other" | "Snack"
  rowTitle: string
  rowShortTitle: string
  timeStart: string
  timeEnd: string
  date: string
  courseClassID:string
  courseID: string
  courseTitle: string
  courseShortTitle: string
  courseClassTitle: string
  courseClassShorTitle: string
}

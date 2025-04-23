/** @format */

export const apisUrl = "https://eduquest.azurewebsites.net/v1/";

export const endPoints = {
  signin: "auth/sign-in",
  signInPassword: "auth/sign-in/password",
  validateOtp: "auth/validate-otp",
  refresh: "auth/refresh",
  changePassword: "auth/change-password",
  resetPassword: "auth/reset-password",
  signout: "auth/sign-out",

  cart: "cart",
  addToCart: "cart/add-cartItem",

  course: "course",
  searchCourse: "course/searchCourse",
  getRecommendedCourse: "course/recommendedCourse",
  getCourseById: "course/byCourseId",
  getStudyingCourse: "course/studying",
  getCourseByStatus: "course/status",

  material: "material",
  getMaterialDetails: "material/materialById",

  couponLearner: "coupon/learner",

  searchCertificate: "certificate/filter",
  certificate: "certificate",

  getAllUser: "user/all",
  getMyInfo: "user/me",

  userProgress: "userMeta/userProgress",

  quest: "quest",
  getQuestOfUser: "quest/user",
  rewardQuest: "quest/learner/claim",

  submitQuiz: "course/quiz/attemt",
  submitAssignment: "course/assignment/attemt",
  getAssignment: "course/assignment/attempt",
};

import validator from "validator";

export const signupValidator = (req) => {
  const { firstName, lastName, password, email } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

export const profileEditValidator = (req) => {
  const AllowEditOptions = [
    "firstName",
    "lastName",
    "gender",
    "about",
    "skills",
  ];

  const isVaildEdit = Object.keys(req.body).every((field) =>
    AllowEditOptions.includes(field)
  );

  return isVaildEdit;
}
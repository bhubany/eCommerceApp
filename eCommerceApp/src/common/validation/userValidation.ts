import * as Yup from 'yup';

export const signInSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().min(3).max(25).required('Please Enter first name'),
  middleName: Yup.string().min(3).max(25).nullable('Please Enter middle name'),
  lastName: Yup.string().min(3).max(25).required('Please Enter last name'),
  address: Yup.string().min(5).required('Please Enter Your Full address'),
  email: Yup.string()
    .email('Please Enter Valid Email')
    .required('Email is required'),
  password: Yup.string().min(5).max(25).required('Please Enter Valid Password'),
  confPassword: Yup.string()
    .required('Please Confirm Valid Password')
    .test(
      'password-match',
      'Confirm Password does not match',
      function (value) {
        return this.parent.password === value;
      },
    ),
  tnc: Yup.bool().oneOf([true], 'Please accept our terms and conditions'),
});

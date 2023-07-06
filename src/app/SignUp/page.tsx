
import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './SignUp.scss';

type Inputs = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true })} placeholder="First Name" />
      {errors.firstName && <p>This field is required</p>}

      <input {...register('lastName', { required: true })} placeholder="Last Name" />
      {errors.lastName && <p>This field is required</p>}

      <input {...register('company', { required: true })} placeholder="Company/Organization" />
      {errors.company && <p>This field is required</p>}

      <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email Address" />
      {errors.email && <p>This field is required</p>}

      <input {...register('password', { required: true, minLength: 8 })} placeholder="Set Password" type="password" />
      {errors.password && <p>Password is required (minimum 8 characters)</p>}

      <input {...register('confirmPassword', {
        required: true,
        validate: value =>
          value === password.current || "The passwords do not match"
      })} placeholder="Confirm Password" type="password" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <input type="submit" value="Continue" />
    </form>
  );
}

export default SignUp;

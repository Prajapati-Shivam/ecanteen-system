// import { useUser } from '@clerk/clerk-react';

function UserForm() {
  // const { user } = useUser();
  // if user is already have role then we redirect to dashboard
  return (
    <div>
      <h1>This is demo form</h1>
      <p>
        here we have to implement the role based form. first ask for the role 1)
        college(admin) 2) student then based on the role we will show the form
        fields accordingly.
      </p>
      <form>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' required />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default UserForm;

/* Login form
    Recievers user, onChange, onSubmit as props (properties/props are info that a parent component passes to child component)
    Displays the four form inputs
*/

const AuthForm = ({ user, onChange, onSubmit }) => { /*object destructuring, React passes the component one objejct containing its props */
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>First Name</label> 
         < br/>
        <input
          type="text"
          value={user.firstName} /* value is an input property that controls wha appears in the field, user is a JS object, .firstname acccesses the firstName property inside object */
          onChange={onChange} /* when someones types into the email input parent Auth.js can update user.email */
          name="firstName"
          placeholder="First name" /* what shows on the screen in the box */
          required
        />

        <br />
        <label>Last Name</label>
        <br />
        <input
          type="text"
          value={user.lastName}
          onChange={onChange}
          name="lastName"
          placeholder="Last name"
          required
        />

        <br />
        <label>Email</label>
        <br />
        <input
          type="email"
          value={user.email}
          onChange={onChange}
          name="email"
          placeholder="Email"
          required
        />

        <br />
        <label>Password</label>
        <br />
        <input
          type="password" /* the type password hides the text when someone is typing */
          value={user.password}
          onChange={onChange}
          name="password"
          placeholder="Password"
          required
        />

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;

// Future work: Consider adding password strength validation and a "show password" toggle to enhance user experience and security.
import { SignInButton } from "@farcaster/auth-kit";
import { track } from '@vercel/analytics';

const TrackedSignInButton = ({ trackSignup, ...props }) => {
    const handleClick = () => {
      if (trackSignup) {
        trackSignup();
      }
      track('SignUp');
    };
  
    return (
      <div onClick={handleClick}>
        <SignInButton {...props} />
      </div>
    );
  };

export default TrackedSignInButton;
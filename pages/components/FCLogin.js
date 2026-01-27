import { useProfile } from "@farcaster/auth-kit";
import { track } from "@vercel/analytics";
import UserDropdown from "./UserDropdown";
import TrackedSignInButton from "./TrackedSignInButton";

const FCLogin = ({ instance }) => {
  const { isAuthenticated, profile } = useProfile();

  const user = isAuthenticated
    ? {
        displayName: profile.displayName,
        pfpUrl: profile.pfpUrl,
        username: profile.username,
        points: profile.points,
      }
    : null;

  const handleSignOut = () => {
    window.location.reload();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <UserDropdown user={user} onSignOut={handleSignOut} instance={instance} />
        </div>
      ) : (
        <TrackedSignInButton
          trackSignup={() => track("SignUp")}
          data-umami-event="fc-login"
        />
      )}
    </div>
  );
};

export default FCLogin;

import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

const RequireAuth = () => {
    return (
      <>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <Outlet /> {/* This allows nested routes (like Home) to render */}
        </SignedIn>
      </>
    );
}

export default RequireAuth;

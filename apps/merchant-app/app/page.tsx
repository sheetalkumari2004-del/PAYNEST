import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import SignInButton from "../components/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Welcome to PayNest</h1>
        <p>Please sign in to continue</p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
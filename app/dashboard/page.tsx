import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";
import { CloudUpload } from "lucide-react";
import Navbar from "@/components/Navbar";

// Function to extract username from email
function extractUsername(email: string | undefined): string {
  if (!email) return "";
  return email.split('@')[0];
}

export default async function Dashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get the user's email
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  // Extract username from email
  const username = extractUsername(userEmail);

  // Serialize the user data to avoid passing the Clerk User object directly
  const serializedUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        username: username, // Add the extracted username
        emailAddress: userEmail,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-default-50">
      <Navbar user={serializedUser} />

      <main className="flex-1 container mx-auto py-8 px-6">
        
        <DashboardContent
          userId={userId}
          userName={
            username || 
            user?.firstName ||
            user?.fullName ||
            userEmail ||
            ""
          }
        />
      </main>

      <footer className="bg-default-50 border-t border-default-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">CloudUp</h2>
            </div>
            <p className="text-default-500 text-sm">
              &copy; {new Date().getFullYear()} CloudUp
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

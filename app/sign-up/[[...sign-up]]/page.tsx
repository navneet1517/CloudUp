import SignUpForm from "@/components/SignUpForm";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-default-50 to-default-100 dark:from-default-900 dark:to-default-800">
      {/* Use the unified Navbar component */}
      <Navbar />

      <main className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </main>

      {/* Dark mode footer */}
      <footer className="bg-default-900 text-default-100 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-default-400">
            &copy; {new Date().getFullYear()} CloudUp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

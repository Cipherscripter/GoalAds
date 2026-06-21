import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 font-extrabold text-2xl mb-8">
          <div className="w-10 h-10 bg-[#0a4f2e] rounded-xl flex items-center justify-center">
            <span className="text-xl">⚽</span>
          </div>
          <span className="text-white">Goal</span>
          <span className="text-[#f0b429]">Ads</span>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-900 border border-gray-800 shadow-xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-800 border-gray-700 text-white",
              footerActionLink: "text-[#f0b429]",
              formButtonPrimary: "bg-[#0a4f2e] hover:bg-[#0d6b3d]",
            },
          }}
        />
      </div>
    </div>
  );
}

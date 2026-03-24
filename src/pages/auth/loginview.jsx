// views/LoginView.jsx
import { LeftPanel, RightPanel } from "../../components";

export default function LoginView() {
  return (
    <main className="min-h-screen w-full flex bg-white overflow-hidden font-['DM_Sans']">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
          
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
          }
          
          .animate-pulse {
            animation: pulse 2s infinite;
          }
        `}
      </style>
      <LeftPanel />
      <RightPanel />
    </main>
  );
}
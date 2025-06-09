import Picker from "@/common/Picker";
import StatGraph from "@/components/dashboard page/RadarChart";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="relative w-40 h-40 mx-auto my-8 flex justify-center items-center">
        {user?.photoURL && (
          <>
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-5/6 h-3/4 object-cover"
            />
            <img
              src="/avatar-frame.png"
              alt="Avatar Frame"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          </>
        )}
      </div>

      <Picker />
      <div className="h-[500px] w-full">
        <StatGraph/>
      </div>
    </>
  );
};

export default Dashboard;

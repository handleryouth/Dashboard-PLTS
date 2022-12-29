import { BigDashboard, SmallDashboard } from "components";

export default function MainDashboard() {
  return (
    <div>
      <div className="flex item-center justify-between py-3">
        <div>
          <h3 className="mt-0 font-bold">Dashboard</h3>
          <p>
            Welcome back <span className="font-bold">Tony!</span>
          </p>
        </div>

        <div>
          <p className="mt-0 mb-2">Tony David</p>
          <p className="mt-0">rafaeltonydavid@yahoo.com</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <SmallDashboard />
          <SmallDashboard />
          <SmallDashboard />
          <SmallDashboard />
        </div>

        <BigDashboard />
      </div>
    </div>
  );
}

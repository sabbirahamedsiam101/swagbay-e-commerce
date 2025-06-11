import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <section>
      <div>sidebar</div>
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default DashboardLayout;

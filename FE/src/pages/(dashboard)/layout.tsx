const layout = () => {
  return (
    <>
      <h2>Layout Admin</h2>
      <div className="grid grid-cols-[400px,auto]">
        <aside>Aside</aside>
        <main>{/* <Outlet /> */}</main>
      </div>
    </>
  );
};

export default layout;

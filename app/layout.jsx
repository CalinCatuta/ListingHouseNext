import "@/assets/styles/global.css";

export const metadata = {
  title: "PropertyPulse",
  description: "Find your dream rental property",
  key: "rental,find rentals,find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;

import './global.scss'
import './index.scss'

export const metadata = {
  title: "EasyFind",
  description: "Hire the best talent or get hired for your dream job",
  keywords: "hire, talents, jobs, remote, nigeria, africa, tech, software, developer, engineer, designer, product, manager, marketing, sales, business, analyst, data, scientist, machine, learning, artificial, intelligence, easyfind, easy, find",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

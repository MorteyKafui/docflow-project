import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" border-t-2 border-rose-500">
      <div className="flex justify-between items-center max-w-6xl container mx-auto px-10 py-5">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-bold">
            <Link href="/">
              Doc<span className="text-rose-500">Flow</span>
            </Link>
          </h1>
          <div className="flex gap-4 text-rose-500 font-medium">
            <p>&copy; {new Date().getFullYear()}</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
        <div className="text-rose-500  font-medium">
          <p>Group Members/Team</p>
          <ul className="flex gap-4 mt-4 ">
            <li>John </li>
            <li>Sarah</li>
            <li>Smith</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

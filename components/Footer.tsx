import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" border-t-2 border-rose-500">
      <div className="flex items-center justify-between max-w-screen-xl gap-10 mx-auto px-10 py-5">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-bold">
            <Link href="/">
              Doc<span className="text-rose-500">Flow</span>
            </Link>
          </h1>
        </div>
        <div className="flex gap-4 text-rose-500 font-medium text-sm">
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-firstBg border-t-2 border-secondBg">
      <div className="flex justify-between items-center max-w-screen-xl gap-10 mx-auto px-10 py-5">
        <div className="flex items-center gap-10">
          <Link
            className="text-3xl font-bold text-secondBg flex items-center gap-4"
            href="/"
          >
            <Image src="/logo.png" width={55} height={55} alt="site logo" />
            <h3>
              Doc<span className="text-rose-500">Flow</span>
            </h3>
          </Link>
        </div>
        <div className="flex pl-8 lg:pl-0  text-secondBg font-medium text-sm">
          <p>All Rights Reserved &copy; {new Date().getFullYear()} </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

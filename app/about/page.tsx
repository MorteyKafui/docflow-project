const AboutPage = () => {
  return (
    <section>
      <div className="max-w-screen-md container p-10 text-lg">
        <div className="flex flex-col gap-2 mb-10">
          <h2 className="text-4xl font-bold text-center mb-1 text-rose-700">
            About DocFlow
          </h2>
          <p>
            Welcome to DocFlow, your premier destination for efficient document
            management solutions. We understand the challenges individuals and
            organizations face in managing and accessing their documents
            effectively. That&apos;s why we&apos;ve created a platform that
            streamlines the entire process, empowering you to focus on what
            matters most—your work.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="text-4xl font-bold text-center mb-1 text-yellow-400">
            Our Story:
          </h2>
          <p>
            DocFlow was born out of a passion for simplifying document
            management. Our team of dedicated professionals saw the need for a
            robust, user-friendly solution that caters to the diverse needs of
            modern businesses and individuals alike. With years of experience in
            the industry, we set out to create a platform that combines
            cutting-edge technology with intuitive design.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="text-4xl font-bold text-center mb-1 text-green-500">
            What We Offer:
          </h2>
          <p>
            At DocFlow, we offer a comprehensive suite of features designed to
            meet all your document management needs. From secure storage and
            easy retrieval to collaborative editing and seamless sharing, our
            platform has everything you need to keep your documents organized
            and accessible from anywhere, at any time.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="text-4xl font-bold text-center mb-1 text-rose-500">
            Our Mission:
          </h2>
          <p>
            Our mission is simple—to revolutionize the way you manage your
            documents. We are committed to providing you with innovative
            solutions that simplify your workflow, increase productivity, and
            enhance collaboration. Whether you&apos;re a small business looking
            to streamline your operations or a large corporation in need of
            enterprise-level document management, we have the tools and
            expertise to help you succeed.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="text-4xl font-bold text-center mb-1 text-yellow-400">
            Why Choose Us:
          </h2>
          <ul>
            <li>
              User-friendly Interface: Our platform is designed with your
              convenience in mind, making it easy to upload, organize, and
              access your documents with just a few clicks.
            </li>
            <li>
              Advanced Security: We take the security of your documents
              seriously, employing the latest encryption technologies to ensure
              your data is safe and secure.
            </li>
            <li>
              Seamless Integration: Our platform seamlessly integrates with your
              existing tools and software, allowing for a smooth transition and
              minimal disruption to your workflow.
            </li>
            <li>
              Dedicated Support: Our team of experts is always here to help,
              providing you with personalized support and guidance every step of
              the way.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

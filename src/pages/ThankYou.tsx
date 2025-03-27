const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Thank you for your donation</h1>
        <p className="text-xl text-gray-600 mb-4">
          we will reach to you in the next few days
        </p>
        <a
          href="/"
          className="w-full bg-ftpurple py-2 px-6 rounded-full  hover:bg-ftpurple-dark text-white py-2 transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ThankYou;


export default function() {
    return <div className="bg-gray-100 font-sans antialiased">
    {/* Hero Section */}
    <section className="bg-gray-800 text-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Seamless Payments, Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Experience the future of digital transactions with PAYNEST. Secure, fast, and reliable payment solutions for everyone.
        </p>
        <a
          href="#get-started"
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose PAYNEST?
        </h2>
        <div className="flex flex-wrap -mx-4">
          {/* Feature 1 */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl text-blue-600 mb-4">
                {/* Icon or image for the feature */}
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p>
                Our platform ensures top-notch security for all your transactions with industry-leading encryption.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl text-blue-600 mb-4">
                {/* Icon or image for the feature */}
                <i className="fas fa-fast-forward"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p>
                Enjoy swift and hassle-free payments with our user-friendly interface and quick processing times.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl text-blue-600 mb-4">
                {/* Icon or image for the feature */}
                <i className="fas fa-wallet"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wallet Integration</h3>
              <p>
                Seamlessly integrate with multiple digital wallets and manage your payments in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section id="get-started" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8">
          Join PAYNEST today and transform the way you manage your payments.
        </p>
      
      </div>
    </section>
  </div>
}
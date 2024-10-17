import Image from "next/image";

const CTA = () => {
  return (
    <section className="hero relative min-h-screen overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        alt="Background"
        className="w-full object-cover"
        fill
      />
      <div className="hero-overlay bg-neutral relative bg-opacity-70"></div>
      <div className="hero-content text-neutral-content relative p-8 text-center">
        <div className="flex max-w-xl flex-col items-center p-8 md:p-0">
          <h2 className="mb-8 text-3xl font-bold tracking-tight md:mb-12 md:text-5xl">
            Boost your app, launch, earn
          </h2>
          <p className="mb-12 text-lg opacity-80 md:mb-16">
            Don&apos;t waste time integrating APIs or designing a pricing
            section...
          </p>

          <button className="btn btn-primary btn-wide">
            Get Power Of Numbers
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

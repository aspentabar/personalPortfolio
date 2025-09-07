import { RevealOnScroll } from "../components/RevealOnScroll";

export function Contact() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-lg mx-auto px-4 bg-white border border-purple-200 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            Contact Me
          </h2>
          <form
            action="mailto:your@email.com"
            method="POST"
            className="flex flex-col gap-4"
          >
            <input
              className="border border-purple-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              className="border border-purple-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              className="border border-purple-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              name="message"
              rows={5}
              placeholder="Your Message"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded px-6 py-2 mt-2 transition"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8 text-center text-purple-400">
            Or email me at{" "}
            <a href="mailto:your@email.com" className="underline hover:text-purple-600">
              your@email.com
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
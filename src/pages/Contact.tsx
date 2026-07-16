// src/pages/Contact.tsx

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl py-16">
      <div className="space-y-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Contact
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Let's Work Together
        </h1>

        <p className="mx-auto max-w-xl text-zinc-600">
          Have a project, collaboration, or just want to say hello? Fill out the
          form below and I'll get back to you as soon as possible.
        </p>
      </div>

      <form className="mt-12 space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Project Inquiry"
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Tell me about your project..."
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-800"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
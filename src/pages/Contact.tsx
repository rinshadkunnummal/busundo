import {
  Bug,
  Clock3,
  Lightbulb,
  Mail,
  MapPinned,
  MessageCircle,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";

const actions = [
  {
    icon: Clock3,
    title: "Report Wrong Timing",
    description:
      "Found an incorrect bus departure time? Let us know so we can fix it.",
  },
  {
    icon: Lightbulb,
    title: "Suggest a Feature",
    description:
      "Have an idea that could make Campus Bus better? We'd love to hear it.",
  },
  {
    icon: Bug,
    title: "Report a Bug",
    description:
      "Something isn't working as expected? Help us improve the experience.",
  },
];


export default function Contact() {
  return (
    <section className="relative overflow-hidden py-24">

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/40 to-white" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Hero */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 font-inter text-sm font-medium text-emerald-700">
            SUPPORT
          </span>

          <h1 className="mt-6 font-sora text-5xl font-bold tracking-tight text-zinc-900">
            Need Help?
          </h1>

          <p className="mt-6 font-inter text-lg leading-8 text-zinc-600">
            Whether you've found an incorrect bus timing, discovered a bug,
            or have an idea for a new feature, we're always happy to hear from you.
          </p>

        </div>

        {/* Quick Actions */}

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          {actions.map((action) => {

            const Icon = action.icon;

            return (

              <div
                key={action.title}
                className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-lg shadow-emerald-100/30 backdrop-blur transition hover:-translate-y-2 hover:border-emerald-300"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                  <Icon className="h-7 w-7 text-emerald-600" />

                </div>

                <h3 className="mt-6 font-sora text-2xl font-semibold text-zinc-900">
                  {action.title}
                </h3>

                <p className="mt-4 font-inter leading-7 text-zinc-600">
                  {action.description}
                </p>

              </div>

            );

          })}

        </div>

        {/* Contact + Form */}

        <div className="mt-24 grid gap-10 lg:grid-cols-3">

          {/* Contact Card */}

          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-xl shadow-emerald-100/30 backdrop-blur">

            <h2 className="font-sora text-3xl font-bold text-zinc-900">
              Contact
            </h2>

            <p className="mt-3 font-inter text-zinc-600">
              Prefer reaching us directly?
            </p>

            <div className="mt-10 space-y-8">

              <div className="flex gap-4">

                <Mail className="mt-1 h-6 w-6 text-emerald-600" />

                <div>

                  <h4 className="font-sora font-semibold">
                    Email
                  </h4>

                  <p className="font-inter text-zinc-600">
                    rinshadknml@gmail.com
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <MessageCircle className="mt-1 h-6 w-6 text-emerald-600" />

                <div>

                  <h4 className="font-sora font-semibold">
                    WhatsApp
                  </h4>

                  <p className="font-inter text-zinc-600">
                    +91 8590632718
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <Clock3 className="mt-1 h-6 w-6 text-emerald-600" />

                <div>

                  <h4 className="font-sora font-semibold">
                    Response Time
                  </h4>

                  <p className="font-inter text-zinc-600">
                    Usually within 24 hours.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <MapPinned className="mt-1 h-6 w-6 text-emerald-600" />

                <div>

                  <h4 className="font-sora font-semibold">
                    Built For
                  </h4>

                  <p className="font-inter text-zinc-600">
                    Darul Huda Students
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Form */}
          <ContactForm />
        </div>
        {/* FAQ */}
        <FAQ />
      </div>

    </section>
  );
}
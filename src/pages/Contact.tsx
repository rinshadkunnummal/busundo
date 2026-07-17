import {
  Bug,
  Clock3,
  Lightbulb,
  Mail,
  MapPinned,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";

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

const faqs = [
  {
    question: "How often are bus timings updated?",
    answer:
      "We update the timetable whenever changes are announced. Our goal is to keep the information as accurate as possible.",
  },
  {
    question: "Is this an official college application?",
    answer:
      "No. This is a student-built project created to make commuting easier.",
  },
  {
    question: "Can I request a new destination?",
    answer:
      "Absolutely. Send us your suggestion and we'll consider adding it in a future update.",
  },
  {
    question: "How can I report incorrect timings?",
    answer:
      "Use the form below or contact us through WhatsApp or Email.",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState<string>("");

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessKey) {
      setStatus("error");
      setFeedback("Missing VITE_WEB3FORMS_ACCESS_KEY in your environment.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Unable to send message");
      }

      form.reset();
      setStatus("success");
      setFeedback(result.message ?? "Your message was sent successfully.");
    } catch {
      setStatus("error");
      setFeedback("Web3Forms rejected the submission. Check the access key and required fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form
            className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-xl shadow-emerald-100/30 backdrop-blur lg:col-span-2"
            onSubmit={handleSubmit}
          >

            <h2 className="font-sora text-3xl font-bold text-zinc-900">
              Send a Message
            </h2>

            <input type="hidden" name="botcheck" value="" />

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="rounded-2xl border border-zinc-200 px-5 py-4 font-inter outline-none transition focus:border-emerald-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="rounded-2xl border border-zinc-200 px-5 py-4 font-inter outline-none transition focus:border-emerald-500"
              />

            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="mt-6 w-full rounded-2xl border border-zinc-200 px-5 py-4 font-inter outline-none transition focus:border-emerald-500"
            />

            <textarea
              name="message"
              rows={7}
              placeholder="Tell us how we can help..."
              required
              className="mt-6 w-full rounded-2xl border border-zinc-200 px-5 py-4 font-inter outline-none transition focus:border-emerald-500"
            />

            {status === "success" ? (
              <p className="mt-4 font-inter text-sm text-emerald-700">
                {feedback || "Your message was sent successfully. We’ll get back to you soon."}
              </p>
            ) : null}

            {status === "error" ? (
              <p className="mt-4 font-inter text-sm text-red-600">
                {feedback || "We couldn’t send your message right now. Please try again in a moment."}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-sora font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

        {/* FAQ */}

        <div className="mt-24">

          <h2 className="text-center font-sora text-4xl font-bold text-zinc-900">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-10 max-w-4xl space-y-5">

            {faqs.map((faq) => (

              <div
                key={faq.question}
                className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm"
              >

                <h3 className="font-sora text-xl font-semibold text-zinc-900">
                  {faq.question}
                </h3>

                <p className="mt-3 font-inter leading-7 text-zinc-600">
                  {faq.answer}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
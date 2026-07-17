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

export default function FAQ() {
    return (
        <section className="relative overflow-hidden py-24">
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
        </section>
    );
}
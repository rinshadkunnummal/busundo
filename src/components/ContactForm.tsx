import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function ContactForm() {
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
			setFeedback(
				"Web3Forms rejected the submission. Check the access key and required fields.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
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
	);
}

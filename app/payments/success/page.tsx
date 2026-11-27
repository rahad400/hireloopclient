import Link from "next/link"
import { ArrowRight, Check, CreditCard } from "lucide-react"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { paymentVerify } from "@/app/lip/actions/payment"



/** Shown after Stripe sends the user back from checkout. */
const SuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) => {
  const { session_id } = await searchParams
  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)")
  }

  const { status, metadata, customer_email, payment_intent, payment_status } =
    await stripe.checkout.sessions.retrieve(
      session_id,

      {
        expand: ["line_items", "payment_intent"],
      }
    )
  if (status === "open") {
    return redirect("/")
  }
  if (status === "complete" && payment_status === "paid") {

    console.log({
      status,
      metadata,
      customer_email,
      payment_intent,
      payment_status,
    })
const result = await paymentVerify(session_id)
// console.log(result)
    return (
      <main className="flex min-h-screen items-center justify-center bg-night px-4 py-12 text-ink">
        <div className="w-full max-w-lg">
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-white"
          >
            <ArrowRight aria-hidden="true" className="size-4 rotate-180" />
            Back to Browse Jobs
          </Link>

          <section className="mt-6 rounded-2xl border border-white/[0.08] bg-night-soft p-6 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#22c55e]/15 text-[#22c55e]">
              <Check aria-hidden="true" className="size-7" />
            </span>

            <h1 className="mt-5 text-[26px] leading-8 font-semibold tracking-tight text-white sm:text-[30px] sm:leading-10">
              Payment successful
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-5 text-ink-muted">
              Your Growth Plan is active. You can now apply to unlimited jobs.
            </p>

            <div className="mt-7 rounded-xl border border-white/[0.06] bg-[#141418] p-5 text-left">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-strong">
                  <CreditCard aria-hidden="true" className="size-5" />
                </span>

                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">
                    Growth Plan
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">
                    Unlimited job applications
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[13px]">
                <span className="text-ink-muted">Amount paid</span>
                <span className="font-semibold text-white">$17.00</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-[13px]">
                <span className="text-ink-muted">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#22c55e]/10 px-2.5 py-1 text-[11px] font-medium text-[#22c55e]">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-[#22c55e]"
                  />
                  Paid
                </span>
              </div>

              {session_id && (
                <p className="mt-4 border-t border-white/[0.06] pt-4 text-[11px] break-all text-ink-muted">
                  Reference: {session_id}
                </p>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/browse-jobs"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-[14px] font-semibold text-white transition-colors hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none sm:flex-1"
              >
                Browse Jobs
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <Link
                href="/candidate/applications"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[14px] font-medium text-ink transition-colors hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none sm:flex-1"
              >
                View Applications
              </Link>
            </div>

            <p className="mt-4 text-[12px] text-ink-muted">
              You can close this page and continue job hunting anytime.
            </p>
          </section>
        </div>
      </main>
    )
  }
}

export default SuccessPage

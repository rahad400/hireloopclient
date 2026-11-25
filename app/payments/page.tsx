import Link from "next/link"
import { ArrowLeft, Check, CreditCard, LockKeyhole } from "lucide-react"

/** Simple payment screen. Stripe checkout will replace the button later. */
const PaymentPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-night px-4 py-12 text-ink">
      <div className="w-full max-w-lg">
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Browse Jobs
        </Link>

        <section className="mt-6 rounded-2xl border border-white/[0.08] bg-night-soft p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-strong">
              <CreditCard aria-hidden="true" className="size-5" />
            </span>

            <div className="min-w-0">
              <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-white sm:text-[28px] sm:leading-9">
                Complete your payment
              </h1>
              <p className="mt-1 text-[13px] leading-5 text-ink-muted">
                You have reached the 10 free applications limit. Upgrade to
                keep applying.
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-white/[0.06] bg-[#141418] p-5">
            <p className="text-[11px] font-medium tracking-[0.08em] text-ink-muted uppercase">
              Payment summary
            </p>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">Growth Plan</p>
                <p className="mt-1 text-[12px] text-ink-muted">
                  Unlimited job applications
                </p>
              </div>
              <p className="shrink-0 text-[22px] leading-7 font-semibold text-white">
                $17
                <span className="text-[13px] font-normal text-ink-muted">
                  /mo
                </span>
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[13px]">
              <span className="text-ink-muted">Due today</span>
              <span className="font-medium text-white">$17.00</span>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-[13px] text-ink-muted">
            <li className="flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 shrink-0 text-brand-strong" />
              Secure checkout powered by Stripe
            </li>
            <li className="flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 shrink-0 text-brand-strong" />
              Cancel anytime from your account settings
            </li>
          </ul>

          <button
            type="button"
            disabled
            className="mt-7 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-brand text-[14px] font-semibold text-white opacity-70"
          >
            <LockKeyhole aria-hidden="true" className="size-4" />
            Continue to Stripe
          </button>

          <p className="mt-3 text-center text-[12px] text-ink-muted">
            Stripe checkout will be connected here. No payment is taken yet.
          </p>
        </section>
      </div>
    </main>
  )
}

export default PaymentPage

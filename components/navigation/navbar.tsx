"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowUpRight, MenuIcon, XIcon } from "lucide-react"

import { HireloopLogo } from "@/components/navigation/hireloop-logo"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  accountLinks,
  navigationLinks,
  type NavigationLink,
} from "@/lib/navigation-links"
import { cn } from "@/lib/utils"
import { authClient, useSession } from "@/app/lip/auth-client"


function isActivePath(pathname: string, item: NavigationLink) {
  const target = item.match ?? item.href
  return pathname === target || pathname.startsWith(`${target}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const router = useRouter()
  const signOutHeandal = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
        },
      },
    })
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full pb-2 transition-colors duration-300",
        scrolled && "bg-linear-to-b from-night/90 via-night/60 to-transparent"
      )}
    >
      <div className="pt-3 sm:pt-4">
        <div
          className={cn(
            "border-l-r-none border transition-[background-color,border-color,box-shadow] duration-300 sm:h-[68px] sm:px-5",
            scrolled
              ? "border-white/15 bg-night-raised shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]"
              : "border-white/[0.08] bg-night-raised shadow-[0_12px_40px_-28px_rgba(0,0,0,0.85)]"
          )}
        >
          <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4">
            <HireloopLogo priority />

            <div className="flex items-center gap-3">
              <nav
                aria-label="Main"
                className="hidden items-center gap-1 lg:flex"
              >
                {navigationLinks.map((item) => {
                  const active = isActivePath(pathname, item)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none",
                        "focus-visible:ring-2 focus-visible:ring-brand/80 focus-visible:ring-offset-2 focus-visible:ring-offset-night-soft",
                        active
                          ? "bg-white/[0.07] text-ink"
                          : "text-ink-muted hover:bg-white/[0.04] hover:text-ink"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-brand to-transparent transition-opacity duration-200",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </Link>
                  )
                })}
              </nav>

              <span
                aria-hidden
                className="hidden h-6 w-px bg-white/10 lg:block"
              />

              <div className="hidden items-center gap-2 lg:flex">
                {session ? (
                  <>
                    {" "}
                    {session?.user.name}{" "}
                    <button
                      onClick={() => signOutHeandal()}
                      className="border border-red-500 text-red-500"
                    >
                      sign out
                    </button>{" "}
                  </>
                ) : (
                  <>
                    <Link
                      href={accountLinks.signIn.href}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "lg" }),
                        "h-10 rounded-full bg-white px-4 text-[13px] font-semibold text-brand hover:bg-white/90"
                      )}
                    >
                      {accountLinks.signIn.label}
                    </Link>
                    <Link
                      href={accountLinks.getStarted.href}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "h-10 rounded-full bg-brand px-5 text-[13px] font-semibold text-brand-foreground shadow-[0_10px_30px_-12px_rgba(92,83,254,0.9)] hover:bg-brand-strong"
                      )}
                    >
                      {accountLinks.getStarted.label}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </>
                )}
              </div>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-10 rounded-xl text-ink hover:bg-white/10 hover:text-ink focus-visible:ring-brand/80 lg:hidden"
                    />
                  }
                  aria-label="Open main menu"
                >
                  <MenuIcon aria-hidden className="size-5" />
                </SheetTrigger>

                <SheetContent
                  side="right"
                  showCloseButton={false}
                  className="w-[min(88vw,360px)] gap-0 border-l border-white/10 bg-night-soft p-0 text-ink"
                >
                  <SheetTitle className="sr-only">Main menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Browse HireLoop pages and manage your account.
                  </SheetDescription>

                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                      <HireloopLogo onClick={() => setOpen(false)} />
                      <SheetClose
                        render={
                          <button
                            type="button"
                            className="inline-flex size-10 items-center justify-center rounded-xl text-ink-muted transition-colors outline-none hover:bg-white/10 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/80"
                          />
                        }
                        aria-label="Close menu"
                      >
                        <XIcon aria-hidden className="size-5" />
                      </SheetClose>
                    </div>

                    <nav
                      aria-label="Mobile main"
                      className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5"
                    >
                      <p className="px-4 pb-2 text-[11px] font-semibold tracking-[0.14em] text-ink-muted/80 uppercase">
                        Explore
                      </p>
                      {navigationLinks.map((item) => {
                        const active = isActivePath(pathname, item)

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "group flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors outline-none",
                              "focus-visible:ring-2 focus-visible:ring-brand/80",
                              active
                                ? "bg-white/[0.07] text-ink"
                                : "text-ink-muted hover:bg-white/[0.04] hover:text-ink"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden
                                className={cn(
                                  "size-1.5 rounded-full bg-brand transition-opacity",
                                  active ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {item.label}
                            </span>
                            <ArrowUpRight
                              aria-hidden
                              className={cn(
                                "size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                active ? "text-brand" : "text-white/30"
                              )}
                            />
                          </Link>
                        )
                      })}
                    </nav>

                    <div className="border-t border-white/10 p-4">
                      <div className="flex flex-col gap-2">
                        {session ? (
                          <>
                            {" "}
                            {session?.user.name}{" "}
                            <button
                              onClick={() => signOutHeandal()}
                              className="border border-red-500 px-1 text-red-500"
                            >
                              sign out
                            </button>{" "}
                          </>
                        ) : (
                          <>
                            <Link
                              href={accountLinks.signIn.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                buttonVariants({
                                  variant: "outline",
                                  size: "lg",
                                }),
                                "h-11 w-full rounded-xl border-white/15 bg-white/[0.03] text-ink hover:bg-white/[0.08] hover:text-ink"
                              )}
                            >
                              {accountLinks.signIn.label}
                            </Link>
                            <Link
                              href={accountLinks.getStarted.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                buttonVariants({
                                  variant: "default",
                                  size: "lg",
                                }),
                                "h-11 w-full rounded-xl bg-brand text-brand-foreground shadow-[0_10px_30px_-12px_rgba(92,83,254,0.9)] hover:bg-brand-strong"
                              )}
                            >
                              {accountLinks.getStarted.label}
                              <ArrowUpRight aria-hidden className="size-4" />
                            </Link>
                          </>
                        )}
                      </div>
                      <p className="mt-4 text-center text-xs text-ink-muted">
                        Hire smarter. Get hired faster.
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

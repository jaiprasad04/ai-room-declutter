"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  FaCoins,
  FaCheck,
  FaSpinner,
  FaArrowRight,
  FaGoogle,
} from "react-icons/fa";

const PLANS = [
  {
    id: "basic",
    name: "Basic Pack",
    credits: 1000,
    price: "$5",
    generations: 83,
    desc: "Perfect for testing decluttering styles",
    features: [
      "Up to 83 Standard runs (12 credits/ea)",
      "High-Resolution Output (1K/2K/4K)",
      "Standard Generation Speed",
      "Private Creations Gallery",
      "Secure Checkout via Stripe",
    ],
  },
  {
    id: "standard",
    name: "Standard Pack",
    credits: 2000,
    price: "$10",
    generations: 166,
    desc: "Great for regular interior design iterations",
    features: [
      "Up to 166 Standard runs (12 credits/ea)",
      "High-Resolution Output (1K/2K/4K)",
      "Priority Queue Speeds",
      "Private Creations Gallery",
      "Secure Checkout via Stripe",
    ],
  },
  {
    id: "pro",
    name: "Professional Pack",
    credits: 4000,
    price: "$20",
    generations: 333,
    desc: "Best value for realtors & stagers",
    popular: true,
    features: [
      "Up to 333 Standard runs (12 credits/ea)",
      "High-Resolution Output (1K/2K/4K)",
      "Priority Queue Speeds",
      "Private Creations Gallery",
      "Premium Direct Email Support",
      "Secure Checkout via Stripe",
    ],
  },
  {
    id: "business",
    name: "Business Pack",
    credits: 10000,
    price: "$50",
    generations: 833,
    desc: "For staging agencies & architectural firms",
    features: [
      "Up to 833 Standard runs (12 credits/ea)",
      "Commercial Usage License",
      "Instant Cloud Processing Speeds",
      "Priority 24/7 Dedicated Support",
      "Batch Processing Options",
      "Secure Checkout via Stripe",
    ],
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [success, setSuccess] = useState(false);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        setTimeout(() => setSuccess(true), 0);
      }
      if (params.get("canceled") === "true") {
        setTimeout(() => setCanceled(true), 0);
      }
    }
  }, []);

  const handlePurchase = async (planId) => {
    if (!session?.user) {
      signIn("google");
      return;
    }
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      if (res.ok) {
        const d = await res.json();
        if (d.url) window.location.assign(d.url);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full shadow-sm">
            Credit Packages
          </span>
          <h1 className="text-3xl font-black font-heading text-slate-900 tracking-tight mt-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600">
            Simple, Transparent Room Declutter Pricing
          </h1>
          <p className="text-sm text-slate-655 mt-2 font-medium">
            Buy one-time credits. No monthly subscriptions, use them whenever you need.
          </p>
          <div className="mt-6 inline-flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded p-5 text-left w-full shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
            <div className="flex-1 relative z-10">
              <h4 className="text-xs font-black text-indigo-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Standard (v2 Edit)
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex justify-between border-b border-slate-100 pb-1.5"><span>1K Resolution:</span> <span className="font-bold text-slate-800">12 credits</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-1.5"><span>2K Resolution:</span> <span className="font-bold text-slate-800">18 credits</span></li>
                <li className="flex justify-between"><span>4K Resolution:</span> <span className="font-bold text-slate-800">24 credits</span></li>
              </ul>
            </div>
            <div className="hidden sm:block w-px bg-slate-200 self-stretch" />
            <div className="flex-1 relative z-10">
              <h4 className="text-xs font-black text-indigo-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Pro (Enhanced)
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex justify-between border-b border-slate-100 pb-1.5"><span>1K Resolution:</span> <span className="font-bold text-slate-800">24 credits</span></li>
                <li className="flex justify-between border-b border-slate-100 pb-1.5"><span>2K Resolution:</span> <span className="font-bold text-slate-800">24 credits</span></li>
                <li className="flex justify-between"><span>4K Resolution:</span> <span className="font-bold text-slate-800">36 credits</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transaction Success Alert */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 rounded p-6 mb-8 text-center max-w-xl mx-auto shadow-sm animate-in fade-in zoom-in duration-200">
            <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-3 shadow">
              <FaCheck className="text-sm" />
            </div>
            <h3 className="text-sm font-bold text-emerald-800">Purchase Successful!</h3>
            <p className="text-xs text-emerald-700 leading-relaxed mt-1 max-w-sm mx-auto">
              Your credits have been added successfully to your account. Return to the studio to start cleaning room clutters!
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-4 inline-flex items-center gap-1.5 px-4.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded transition-all cursor-pointer shadow-md hover:scale-[1.02]"
            >
              Go to Studio <FaArrowRight className="text-[9px]" />
            </button>
          </div>
        )}

        {/* Transaction Canceled Alert */}
        {canceled && (
          <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-8 text-center max-w-xl mx-auto shadow-sm animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-bold text-amber-800 font-heading">Transaction Canceled</h3>
            <p className="text-xs text-amber-700 mt-1 font-medium">
              The Stripe checkout session was canceled. No charges were made to your account.
            </p>
          </div>
        )}

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
          {PLANS.map((plan) => {
            const isLoading = loadingPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`bg-white border rounded overflow-hidden p-6 flex flex-col justify-between shadow-sm transition-all hover:border-indigo-500 hover:scale-[1.01] relative ${
                  plan.popular
                    ? "border-indigo-500 ring-2 ring-indigo-500/10 scale-[1.02] z-10 shadow-md"
                    : "border-slate-200"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded shadow-sm">
                    Best Value
                  </span>
                )}

                <div>
                  <h3 className="text-sm font-black font-heading text-slate-800 uppercase tracking-wider">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] text-slate-655 font-bold mt-1.5 leading-snug">
                    {plan.desc}
                  </p>

                  {/* Big price display */}
                  <div className="flex items-baseline gap-1 my-5">
                    <span className="text-3xl font-black text-slate-900 font-heading">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">one-time</span>
                  </div>

                  {/* Feature lists */}
                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6 font-medium">
                    <li className="flex items-center gap-2 text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 px-2.5 py-1.5 rounded mb-4">
                      <FaCoins className="text-indigo-600 text-xs animate-pulse" />
                      <span>{plan.credits.toLocaleString()} Credits</span>
                    </li>

                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <FaCheck className="text-indigo-650 text-[10px] flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => handlePurchase(plan.id)}
                  disabled={isLoading}
                  className={`w-full py-3 rounded text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-755 text-white shadow-indigo-500/10 hover:scale-[1.01]"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin text-xs text-slate-700" />
                  ) : !session?.user ? (
                    <>
                      <FaGoogle className="text-[10px]" />
                      <span>Sign in to Purchase</span>
                    </>
                  ) : (
                    <span>Get {plan.credits.toLocaleString()} Credits</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-slate-400">
          Credits never expire · Secure payment via Stripe · No recurring charges
        </p>
      </div>
    </div>
  );
}

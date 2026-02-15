
import React, { useState, useMemo, useEffect } from 'react';
import { Subscription, Frequency, ActionStatus, Totals } from './types';
import { INITIAL_SUBSCRIPTIONS } from './constants';
import ChecklistRow from './components/ChecklistRow';
import Summary from './components/Summary';

const App: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscription_guard_data');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    localStorage.setItem('subscription_guard_data', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev => prev.map(sub => sub.id === id ? { ...sub, ...updates } : sub));
  };

  const addService = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setSubscriptions(prev => [
      ...prev,
      {
        id: newId,
        name: 'New Custom Service',
        provider: '',
        amount: 0,
        frequency: Frequency.MONTHLY,
        status: ActionStatus.KEEP,
        isCustom: true
      }
    ]);
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  const totals = useMemo<Totals>(() => {
    let currentMonthly = 0;
    let potentialMonthlySavings = 0;

    subscriptions.forEach(sub => {
      let monthlyRate = sub.amount;
      if (sub.frequency === Frequency.WEEKLY) monthlyRate = sub.amount * 4.33; // Avg weeks in month
      if (sub.frequency === Frequency.YEARLY) monthlyRate = sub.amount / 12;

      currentMonthly += monthlyRate;
      if (sub.status === ActionStatus.CANCEL) {
        potentialMonthlySavings += monthlyRate;
      }
    });

    return {
      currentMonthly,
      currentYearly: currentMonthly * 12,
      potentialMonthlySavings,
      potentialYearlySavings: potentialMonthlySavings * 12,
    };
  }, [subscriptions]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const summary = subscriptions
      .filter(s => s.amount > 0)
      .map(s => `${s.name} (${s.provider}): $${s.amount}/${s.frequency} - Status: ${s.status === ActionStatus.KEEP ? 'Keep' : 'CANCEL'}`)
      .join('\n');
    
    const text = `Subscriptions Money Guard Summary:\n\n${summary}\n\nPotential Monthly Savings: $${totals.potentialMonthlySavings.toFixed(2)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Subscription Summary',
        text: text,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
        alert('Summary copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Summary copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 print:py-0">
      {/* Hero Section */}
      <header className={`text-center mb-12 no-print ${showChecklist ? 'hidden' : 'block'}`}>
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-6">
          <i className="fas fa-shield-alt text-4xl text-blue-600"></i>
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Subscriptions Money Guard
        </h1>
        <p className="text-xl text-slate-600 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
          A simple one‑page checklist that helps families and helpers find and stop wasted subscription and bill payments—especially for retirees.
        </p>
        <div className="bg-blue-50 p-6 rounded-2xl mb-10 max-w-lg mx-auto border border-blue-100 shadow-sm">
          <p className="text-slate-700 italic">
            "Most households pay for subscriptions they no longer use. Use this checklist to review your expenses in one place, decide what to keep, and see how much you can save."
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => setShowChecklist(true)}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <i className="fas fa-list-check"></i>
            Open Checklist
          </button>
          <button 
            onClick={handlePrint}
            className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <i className="fas fa-print"></i>
            Print Checklist
          </button>
        </div>
      </header>

      {/* Checklist View */}
      {(showChecklist || true) && (
        <div className={!showChecklist ? 'hidden' : 'block'}>
          <div className="flex items-center justify-between mb-8 no-print">
            <button 
              onClick={() => setShowChecklist(false)}
              className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 font-bold"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Home
            </button>
            <button 
              onClick={handlePrint}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-900 transition-all flex items-center gap-2"
            >
              <i className="fas fa-print"></i>
              Print
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-10 print:border-none print:shadow-none print:p-0">
            <h2 className="text-3xl font-black text-slate-900 mb-2 print:mb-1">
              Your Bill Checklist
            </h2>
            <p className="text-sm font-bold text-slate-800 mb-8">
              No logins or card numbers needed. Just the names of your services and what they cost.
            </p>
            
            {/* How to use */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 no-print">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
                <p className="text-sm font-bold text-slate-800">Gather Statements</p>
                <p className="text-xs text-slate-500 mt-1">Check recent bank and credit card statements for recurring bills.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
                <p className="text-sm font-bold text-slate-800">Fill in Amounts</p>
                <p className="text-xs text-slate-500 mt-1">Enter provider names and amounts. Choose if it's weekly, monthly, or yearly.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
                <p className="text-sm font-bold text-slate-800">Keep or Cancel</p>
                <p className="text-xs text-slate-500 mt-1">Review with family. Mark "Cancel it" to see your total potential savings.</p>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-4 mb-8">
              {subscriptions.map(sub => (
                <div key={sub.id} className="print-block">
                  <ChecklistRow 
                    subscription={sub} 
                    updateSubscription={updateSubscription}
                    removeSubscription={removeSubscription}
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={addService}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 no-print"
            >
              <i className="fas fa-plus-circle"></i>
              Add Another Service/Subscription
            </button>
          </div>

          <Summary totals={totals} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center no-print pb-20">
             <button 
              onClick={handleShare}
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-paper-plane"></i>
              Save / Text Summary
            </button>
            <button 
              onClick={handlePrint}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-print"></i>
              Print when filled out
            </button>
          </div>
        </div>
      )}

      {/* Persistent Totals Floating Bar (Mobile-first) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-50 transition-transform no-print ${!showChecklist ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-tight">Potential Annual Savings</p>
            <p className="text-2xl font-black text-slate-900">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totals.potentialYearlySavings)}
            </p>
          </div>
          <button 
            onClick={handlePrint}
            className="px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 text-sm shadow-md"
          >
            <i className="fas fa-print"></i>
            Print
          </button>
        </div>
      </div>
      
      <footer className="text-center py-10 text-slate-400 text-sm no-print">
        <p>&copy; {new Date().getFullYear()} Subscriptions Money Guard. Helping families protect their savings.</p>
        <p className="mt-2">Privacy focused: No data is sent to our servers. Everything stays on your browser.</p>
      </footer>
    </div>
  );
};

export default App;

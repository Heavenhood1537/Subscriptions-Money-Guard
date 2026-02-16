
import React from 'react';
import { Totals } from '../types';

interface SummaryProps {
  totals: Totals;
}

const Summary: React.FC<SummaryProps> = ({ totals }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-xl mb-8">
      <h2 className="text-2xl font-black text-blue-800 mb-6 flex items-center gap-2">
        <i className="fas fa-calculator"></i>
        Savings Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-slate-500 font-semibold uppercase text-xs tracking-wider">Current Spending</p>
          <div className="flex justify-between items-end border-b border-slate-100 pb-2">
            <span className="text-slate-600">Total Monthly Cost:</span>
            <span className="text-xl font-bold text-slate-800">{formatCurrency(totals.currentMonthly)}</span>
          </div>
          <div className="flex justify-between items-end border-b border-slate-100 pb-2">
            <span className="text-slate-600">Total Yearly Cost:</span>
            <span className="text-xl font-bold text-slate-800">{formatCurrency(totals.currentYearly)}</span>
          </div>
        </div>

        <div className="space-y-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <p className="text-emerald-700 font-bold uppercase text-xs tracking-wider">Potential Savings</p>
          <div className="flex justify-between items-end border-b border-emerald-200 pb-2">
            <span className="text-emerald-700">Monthly Savings:</span>
            <span className="text-2xl font-black text-emerald-600">{formatCurrency(totals.potentialMonthlySavings)}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-emerald-700">Annual Savings:</span>
            <span className="text-3xl font-black text-emerald-600">{formatCurrency(totals.potentialYearlySavings)}</span>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100 no-print text-center">
        <div className="mb-4 text-blue-800">
          <p className="font-bold mb-1">
            <i className="fas fa-info-circle mr-2"></i>
            ‘Keep it’ / ‘Cancel it’ are only for this checklist.
          </p>
          <p className="text-sm">
            They do not cancel any services. You still need to contact each provider to stop a service.
          </p>
        </div>
        
        <div className="pt-4 border-t border-blue-200">
          <p className="text-blue-700 font-medium italic">
            <i className="fas fa-lightbulb mr-2"></i>
            Did you know? Reviewing bills annually can save the average household over $1,200!
          </p>
        </div>
=======
      <div className="mt-8 text-center bg-blue-50 py-3 rounded-lg border border-blue-100 no-print">
        <p className="text-blue-700 font-medium">
          <i className="fas fa-lightbulb mr-2"></i>
          Did you know? Reviewing bills annually can save the average household over $1,200!
        </p>
>>>>>>> 6c08b14 (Initial commit of Subscriptions Money Guard)
      </div>
    </div>
  );
};

export default Summary;

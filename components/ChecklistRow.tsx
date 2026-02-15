
import React from 'react';
import { Subscription, Frequency, ActionStatus } from '../types';

interface ChecklistRowProps {
  subscription: Subscription;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  removeSubscription?: (id: string) => void;
}

const ChecklistRow: React.FC<ChecklistRowProps> = ({ 
  subscription, 
  updateSubscription,
  removeSubscription 
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    updateSubscription(subscription.id, { amount: val });
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSubscription(subscription.id, { provider: e.target.value });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSubscription(subscription.id, { frequency: e.target.value as Frequency });
  };

  const toggleStatus = (status: ActionStatus) => {
    updateSubscription(subscription.id, { status });
  };

  return (
    <div className={`p-4 rounded-xl transition-all border ${subscription.status === ActionStatus.CANCEL ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-200'} mb-4 shadow-sm hover:shadow-md group`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-slate-800 text-lg">{subscription.name}</h3>
            {subscription.isCustom && removeSubscription && (
              <button 
                onClick={() => removeSubscription(subscription.id)}
                className="text-slate-400 hover:text-red-500 transition-colors no-print"
                title="Remove service"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Provider / Service</label>
              <input
                type="text"
                value={subscription.provider}
                onChange={handleProviderChange}
                placeholder="e.g. Comcast, AT&T, Netflix"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Amount & Cycle</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={subscription.amount || ''}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <select
                  value={subscription.frequency}
                  onChange={handleFrequencyChange}
                  className="bg-white border border-slate-300 rounded-md py-2 px-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value={Frequency.WEEKLY}>per week</option>
                  <option value={Frequency.MONTHLY}>per month</option>
                  <option value={Frequency.YEARLY}>per year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col lg:flex-row gap-2 mt-2 md:mt-0 min-w-[160px]">
          <button
            onClick={() => toggleStatus(ActionStatus.KEEP)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
              subscription.status === ActionStatus.KEEP
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <i className={`fas ${subscription.status === ActionStatus.KEEP ? 'fa-check-circle' : 'fa-circle'}`}></i>
            Keep it
          </button>
          <button
            onClick={() => toggleStatus(ActionStatus.CANCEL)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
              subscription.status === ActionStatus.CANCEL
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <i className={`fas ${subscription.status === ActionStatus.CANCEL ? 'fa-times-circle' : 'fa-circle'}`}></i>
            Cancel it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistRow;

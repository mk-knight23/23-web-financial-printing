import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChequeService, BANK_TEMPLATES } from '../../../core/services/cheque.service';

@Component({
  selector: 'app-cheque-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-bold text-financial-500 uppercase tracking-wider">Select Bank</label>
          <select 
            [ngModel]="chequeService.currentCheque().bankTemplateId"
            (ngModelChange)="chequeService.updateCheque({bankTemplateId: $event})"
            class="input-field"
          >
            @for (bank of banks; track bank.id) {
              <option [value]="bank.id">{{ bank.name }}</option>
            }
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-bold text-financial-500 uppercase tracking-wider">Date</label>
          <input 
            type="date" 
            [ngModel]="chequeService.currentCheque().date"
            (ngModelChange)="chequeService.updateCheque({date: $event})"
            class="input-field"
          >
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-financial-500 uppercase tracking-wider">Payee Name</label>
        <input 
          type="text" 
          placeholder="e.g. John Doe"
          [ngModel]="chequeService.currentCheque().payee"
          (ngModelChange)="chequeService.updateCheque({payee: $event})"
          class="input-field"
        >
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-financial-500 uppercase tracking-wider">Amount (Numeric)</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-financial-400">₹</span>
          <input 
            type="number" 
            placeholder="0.00"
            [ngModel]="chequeService.currentCheque().amount"
            (ngModelChange)="chequeService.updateCheque({amount: $event})"
            class="input-field pl-8"
          >
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-financial-500 uppercase tracking-wider">Amount in Words</label>
        <div class="p-3 bg-financial-100 dark:bg-financial-800 rounded-lg text-sm font-medium italic min-h-[48px]">
          {{ chequeService.amountInWords() }}
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-financial-500 uppercase tracking-wider">Account Number</label>
        <input 
          type="text" 
          placeholder="e.g. 123456789012"
          [ngModel]="chequeService.currentCheque().accountNumber"
          (ngModelChange)="chequeService.updateCheque({accountNumber: $event})"
          class="input-field font-mono"
        >
      </div>
    </div>
  `
})
export class ChequeFormComponent {
  chequeService = inject(ChequeService);
  banks = BANK_TEMPLATES;
}

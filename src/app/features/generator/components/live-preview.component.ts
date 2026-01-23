import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeService } from '../../../core/services/cheque.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-live-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center space-y-8">
      <div #chequeContainer class="relative bg-white shadow-2xl rounded-sm overflow-hidden" 
           [style.width.px]="template().dimensions.width" 
           [style.height.px]="template().dimensions.height">
        
        <!-- Cheque Background Pattern -->
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style="background-image: radial-gradient(#000 1px, transparent 0); background-size: 20px 20px;"></div>

        <!-- Bank Logo/Header -->
        <div class="absolute top-8 left-8 flex items-center space-x-3">
          <span class="text-4xl">{{ template().logo }}</span>
          <div class="flex flex-col">
            <span class="text-xl font-black uppercase tracking-tighter" [style.color]="template().color">
              {{ template().name }}
            </span>
          </div>
        </div>

        <!-- Date Field -->
        <div class="absolute border-2 border-financial-200 p-1 flex space-x-1" 
             [style.left.px]="template().fields.date.x" 
             [style.top.px]="template().fields.date.y">
          @for (char of formatDate(cheque().date); track $index) {
            <span class="w-6 h-8 flex items-center justify-center border border-financial-100 font-cheque font-bold text-lg">
              {{ char }}
            </span>
          }
        </div>

        <!-- Payee -->
        <div class="absolute w-[500px] border-b border-financial-300 pb-1"
             [style.left.px]="template().fields.payee.x" 
             [style.top.px]="template().fields.payee.y">
          <span class="text-xs font-bold text-financial-400 absolute -top-4">PAY</span>
          <span class="font-cheque text-xl uppercase pl-4">{{ cheque().payee }}</span>
        </div>

        <!-- Amount Words -->
        <div class="absolute w-[500px] leading-8"
             [style.left.px]="template().fields.amountWords.x" 
             [style.top.px]="template().fields.amountWords.y">
          <span class="text-xs font-bold text-financial-400 absolute -top-4">RUPEES</span>
          <span class="font-cheque text-sm uppercase block border-b border-financial-300 min-h-[32px]">
            {{ chequeService.amountInWords() }}
          </span>
        </div>

        <!-- Amount Box -->
        <div class="absolute border-2 border-financial-400 bg-financial-50/50 p-2 flex items-center space-x-2"
             [style.left.px]="template().fields.amountNumber.x" 
             [style.top.px]="template().fields.amountNumber.y">
          <span class="font-bold">₹</span>
          <span class="font-cheque text-2xl font-black">
            {{ cheque().amount ? (cheque().amount | number:'1.2-2') : '0.00' }}/-
          </span>
        </div>

        <!-- Account Number -->
        <div class="absolute flex flex-col"
             [style.left.px]="template().fields.accountNumber.x" 
             [style.top.px]="template().fields.accountNumber.y">
          <span class="text-[10px] font-bold text-financial-400">A/C NO.</span>
          <span class="font-cheque text-lg tracking-widest border border-financial-200 px-2 py-1 bg-white">
            {{ cheque().accountNumber }}
          </span>
        </div>

        <!-- Signature Area -->
        <div class="absolute text-center"
             [style.left.px]="template().fields.signature.x" 
             [style.top.px]="template().fields.signature.y">
          <div class="w-40 border-t border-financial-400 pt-1">
            <span class="text-[10px] font-bold uppercase tracking-widest">Authorized Signatory</span>
          </div>
        </div>

        <!-- MICR Code Mock -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 font-cheque text-lg tracking-[1em] opacity-40">
          ⑈000123⑈ 123456789⑆ 123456⑈ 10
        </div>
      </div>

      <button (click)="downloadPDF()" class="btn btn-primary flex items-center space-x-2 no-print">
        <span>Download Print-Ready PDF</span>
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class LivePreviewComponent {
  chequeService = inject(ChequeService);
  cheque = this.chequeService.currentCheque;
  template = this.chequeService.selectedTemplate;

  @ViewChild('chequeContainer') container!: ElementRef;

  formatDate(dateStr: string): string[] {
    if (!dateStr) return Array(8).fill('');
    const clean = dateStr.replace(/-/g, ''); // YYYYMMDD
    // Target DDMMYYYY
    const d = clean.slice(6, 8);
    const m = clean.slice(4, 6);
    const y = clean.slice(0, 4);
    return (d + m + y).split('');
  }

  async downloadPDF() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [this.template().dimensions.width, this.template().dimensions.height]
    });

    // Simple strategy: we use the canvas/html context if needed, but for precision
    // in a Staff+ role, we ideally draw elements manually to the PDF for sharpness.
    // For this prototype, we'll use html injection or direct drawing.
    
    // Manual drawing for high fidelity
    const t = this.template();
    const c = this.cheque();

    doc.setFontSize(20);
    doc.setTextColor(t.color);
    doc.text(t.name, 40, 40);

    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.text(`DATE: ${this.formatDate(c.date).join(' ')}`, t.fields.date.x, t.fields.date.y);
    doc.text(`PAY: ${c.payee}`, t.fields.payee.x, t.fields.payee.y);
    doc.text(`RUPEES: ${this.chequeService.amountInWords()}`, t.fields.amountWords.x, t.fields.amountWords.y);
    doc.text(`Rs: ${c.amount}/-`, t.fields.amountNumber.x, t.fields.amountNumber.y);
    doc.text(`A/C NO: ${c.accountNumber}`, t.fields.accountNumber.x, t.fields.accountNumber.y);

    doc.save(`cheque-${c.payee || 'draft'}.pdf`);
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { ChequeData, BankTemplate } from '../../types/cheque';

export const BANK_TEMPLATES: BankTemplate[] = [
  {
    id: 'generic',
    name: 'Generic Bank',
    logo: '🏦',
    color: '#1f2933',
    dimensions: { width: 800, height: 350 },
    fields: {
      date: { x: 620, y: 40, fontSize: 16 },
      payee: { x: 80, y: 110, fontSize: 18 },
      amountWords: { x: 100, y: 160, fontSize: 14 },
      amountNumber: { x: 630, y: 140, fontSize: 20 },
      accountNumber: { x: 80, y: 250, fontSize: 16 },
      signature: { x: 600, y: 280, fontSize: 16 },
    },
  },
  {
    id: 'sbi',
    name: 'State Bank of India',
    logo: '🔵',
    color: '#2563eb',
    dimensions: { width: 800, height: 350 },
    fields: {
      date: { x: 640, y: 35, fontSize: 16 },
      payee: { x: 90, y: 105, fontSize: 18 },
      amountWords: { x: 110, y: 155, fontSize: 14 },
      amountNumber: { x: 640, y: 135, fontSize: 20 },
      accountNumber: { x: 90, y: 245, fontSize: 16 },
      signature: { x: 610, y: 275, fontSize: 16 },
    },
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: '🟦',
    color: '#004b87',
    dimensions: { width: 800, height: 350 },
    fields: {
      date: { x: 630, y: 38, fontSize: 16 },
      payee: { x: 85, y: 108, fontSize: 18 },
      amountWords: { x: 105, y: 158, fontSize: 14 },
      amountNumber: { x: 635, y: 138, fontSize: 20 },
      accountNumber: { x: 85, y: 248, fontSize: 16 },
      signature: { x: 605, y: 278, fontSize: 16 },
    },
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    logo: '🟠',
    color: '#f37920',
    dimensions: { width: 800, height: 350 },
    fields: {
      date: { x: 625, y: 42, fontSize: 16 },
      payee: { x: 82, y: 112, fontSize: 18 },
      amountWords: { x: 102, y: 162, fontSize: 14 },
      amountNumber: { x: 632, y: 142, fontSize: 20 },
      accountNumber: { x: 82, y: 252, fontSize: 16 },
      signature: { x: 608, y: 282, fontSize: 16 },
    },
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    logo: '🟣',
    color: '#97144d',
    dimensions: { width: 800, height: 350 },
    fields: {
      date: { x: 635, y: 36, fontSize: 16 },
      payee: { x: 88, y: 106, fontSize: 18 },
      amountWords: { x: 108, y: 156, fontSize: 14 },
      amountNumber: { x: 638, y: 136, fontSize: 20 },
      accountNumber: { x: 88, y: 246, fontSize: 16 },
      signature: { x: 612, y: 276, fontSize: 16 },
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChequeService {
  currentCheque = signal<ChequeData>({
    payee: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    accountNumber: '',
    bankTemplateId: 'generic',
  });

  selectedTemplate = computed(
    () =>
      BANK_TEMPLATES.find((t) => t.id === this.currentCheque().bankTemplateId) || BANK_TEMPLATES[0],
  );

  amountInWords = computed(() => {
    const amount = this.currentCheque().amount;
    if (!amount) return '';
    return this.numberToWords(amount) + ' Only';
  });

  updateCheque(data: Partial<ChequeData>) {
    this.currentCheque.set({ ...this.currentCheque(), ...data });
  }

  private numberToWords(num: number): string {
    const a = [
      '',
      'One ',
      'Two ',
      'Three ',
      'Four ',
      'Five ',
      'Six ',
      'Seven ',
      'Eight ',
      'Nine ',
      'Ten ',
      'Eleven ',
      'Twelve ',
      'Thirteen ',
      'Fourteen ',
      'Fifteen ',
      'Sixteen ',
      'Seventeen ',
      'Eighteen ',
      'Nineteen ',
    ];
    const b = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    const numStr = num.toString();
    if (numStr.length > 9) return 'overflow';

    const n = ('000000000' + numStr).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';

    let str = '';
    str +=
      Number(n[1]) != 0
        ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + 'Crore '
        : '';
    str +=
      Number(n[2]) != 0
        ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + 'Lakh '
        : '';
    str +=
      Number(n[3]) != 0
        ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + 'Thousand '
        : '';
    str +=
      Number(n[4]) != 0
        ? (a[Number(n[4])] || b[Number(n[4][0])] + ' ' + a[Number(n[4][1])]) + 'Hundred '
        : '';
    str +=
      Number(n[5]) != 0
        ? (str != '' ? 'and ' : '') +
          (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])])
        : '';
    return str.trim();
  }
}

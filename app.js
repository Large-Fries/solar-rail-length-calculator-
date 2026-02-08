const form = document.getElementById('rail-form');

const fields = {
  rows: document.getElementById('rows'),
  panelsPerRow: document.getElementById('panelsPerRow'),
  railsPerRow: document.getElementById('railsPerRow'),
  orientation: document.getElementById('orientation'),
  panelLength: document.getElementById('panelLength'),
  panelWidth: document.getElementById('panelWidth'),
  gap: document.getElementById('gap'),
  overhang: document.getElementById('overhang'),
  waste: document.getElementById('waste'),
  stockLength: document.getElementById('stockLength')
};

const outputs = {
  perRow: document.getElementById('perRow'),
  totalNoWaste: document.getElementById('totalNoWaste'),
  totalWithWaste: document.getElementById('totalWithWaste'),
  stockCount: document.getElementById('stockCount'),
  note: document.getElementById('note')
};

const round = (value) => Math.round(value * 100) / 100;
const readNumber = (field) => Number.parseFloat(field.value);
const formatMmAndM = (valueMm) => `${round(valueMm)} mm (${round(valueMm / 1000)} m)`;

const calculate = () => {
  const rows = readNumber(fields.rows);
  const panelsPerRow = readNumber(fields.panelsPerRow);
  const railsPerRow = readNumber(fields.railsPerRow);
  const panelLength = readNumber(fields.panelLength);
  const panelWidth = readNumber(fields.panelWidth);
  const gap = readNumber(fields.gap);
  const overhang = readNumber(fields.overhang);
  const wastePct = readNumber(fields.waste);
  const stockLength = readNumber(fields.stockLength);

  if (
    [rows, panelsPerRow, railsPerRow, panelLength, panelWidth, gap, overhang, wastePct, stockLength].some(
      (n) => Number.isNaN(n) || n < 0
    )
  ) {
    outputs.note.textContent = 'Please enter valid non-negative numbers in all fields.';
    return;
  }

  const panelSpan = fields.orientation.value === 'portrait' ? panelWidth : panelLength;
  const perRowLength = panelsPerRow * panelSpan + Math.max(0, panelsPerRow - 1) * gap + overhang * 2;
  const totalNoWaste = perRowLength * rows * railsPerRow;
  const totalWithWaste = totalNoWaste * (1 + wastePct / 100);
  const stockCount = Math.ceil(totalWithWaste / stockLength);

  outputs.perRow.textContent = formatMmAndM(perRowLength);
  outputs.totalNoWaste.textContent = formatMmAndM(totalNoWaste);
  outputs.totalWithWaste.textContent = formatMmAndM(totalWithWaste);
  outputs.stockCount.textContent = `${stockCount} rail(s) at ${round(stockLength)} mm each`;
  outputs.note.textContent = `Using ${fields.orientation.value} orientation, each panel contributes ${round(panelSpan)} mm along rail direction.`;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculate();
});

calculate();

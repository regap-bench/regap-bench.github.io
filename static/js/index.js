// Sample scenes for the interactive explorer (images in static/images/samples/).
const TASKS = [
  {
    key: 'shape_counting', name: 'Shape counting',
    question: 'How many parallelograms are there?', answer: '4',
    conds: ['plain', 'number', 'shading', 'grid'],
  },
  {
    key: 'angle_ranking', name: 'Angle ranking',
    question: 'Rank the angles from smallest to largest by their labels.', answer: '4, 2, 6, 3, 5, 1',
    conds: ['plain', 'shading', 'grid'],
  },
  {
    key: 'size_ranking', name: 'Size ranking',
    question: 'Rank the ellipses from smallest to largest by their labels.', answer: '1, 3, 5, 4, 6, 2',
    conds: ['plain', 'shading', 'grid'],
  },
  {
    key: 'clock_ranking', name: 'Clock ranking',
    question: 'Rank the clocks from latest to earliest by their labels.', answer: '3, 5, 2, 6, 1, 4',
    conds: ['plain', 'number', 'shading', 'grid'],
  },
  {
    key: 'transformation_prediction', name: 'Transformation prediction',
    question: '(O) is rotated 270 degrees clockwise around P, then rotated 90 degrees anticlockwise around P, then dilated 0.5x from P. Which option shows the final result?',
    answer: 'C', conds: ['plain', 'shading', 'grid'],
  },
];

const COND = {
  plain:   { label: 'Plain',      cls: 'plain' },
  number:  { label: 'Numbering',  cls: 'num' },
  shading: { label: 'Shading',    cls: 'shade' },
  grid:    { label: 'Grid lines', cls: 'grid' },
};

let task = TASKS[0];
let cond = 'plain';

function render() {
  document.querySelectorAll('#task-tabs li').forEach((li, i) =>
    li.classList.toggle('is-active', TASKS[i] === task));

  const btns = document.getElementById('cond-buttons');
  btns.innerHTML = '';
  task.conds.forEach(c => {
    const b = document.createElement('button');
    b.className = `button is-small ${COND[c].cls}` + (c === cond ? ' is-selected' : '');
    b.textContent = COND[c].label;
    b.onclick = () => { cond = c; render(); };
    btns.appendChild(b);
  });

  document.getElementById('ex-question').textContent = task.question;
  document.getElementById('ex-answer').textContent = task.answer;
  const img = document.getElementById('ex-image');
  img.src = `static/images/samples/${task.key}_${cond}.png`;
  img.alt = `${task.name}, ${COND[cond].label} condition`;
}

document.addEventListener('DOMContentLoaded', () => {
  const ul = document.createElement('ul');
  TASKS.forEach(t => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = t.name;
    a.onclick = () => { task = t; if (!t.conds.includes(cond)) cond = 'plain'; render(); };
    li.appendChild(a);
    ul.appendChild(li);
  });
  document.getElementById('task-tabs').appendChild(ul);
  render();

  // Preload all sample images so toggling is instant.
  TASKS.forEach(t => t.conds.forEach(c => { new Image().src = `static/images/samples/${t.key}_${c}.png`; }));

});

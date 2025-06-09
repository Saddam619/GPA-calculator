const form = document.getElementById('assignment-form');
const assignmentList = document.getElementById('assignment-list');
const gpaDisplay = document.getElementById('gpa');

let assignments = [];

// Render the assignment list and update GPA
function render() {
  assignmentList.innerHTML = '';
  assignments.forEach(({name, grade}, index) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${grade.toFixed(2)}`;
    assignmentList.appendChild(li);
  });

  // Calculate GPA (average grade)
  const total = assignments.reduce((sum, a) => sum + a.grade, 0);
  const gpa = assignments.length ? (total / assignments.length) : 0;
  gpaDisplay.textContent = gpa.toFixed(2);
}

// Add assignment handler
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form['assignment-name'].value.trim();
  const grade = parseFloat(form['assignment-grade'].value);

  if(name && grade >= 0 && grade <= 5){
    assignments.push({name, grade});
    form.reset();
    render();
    saveToLocalStorage();
  }
});

// Keypress 'S' to log assignments
window.addEventListener('keydown', e => {
  if(e.key.toLowerCase() === 's'){
    console.log('All assignments:', assignments);
  }
});

// Optional: Save to localStorage
function saveToLocalStorage(){
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

// Optional: Load from localStorage
function loadFromLocalStorage(){
  const data = localStorage.getItem('assignments');
  if(data){
    assignments = JSON.parse(data);
    render();
  }
}

loadFromLocalStorage();
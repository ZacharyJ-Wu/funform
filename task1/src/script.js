console.log("Hello world - view me in the Console of developer tools");
const fullNameInput = document.querySelector("#fullName");
const studentIdInput = document.querySelector("#studentId");
const graduationDateInput = document.querySelector("#graduationDate");
const majorSelect = document.querySelector("#major");
const selectAllCheckbox = document.querySelector("#selectAll");
const typeScriptCheckbox = document.querySelector("#typescript");
const pythonCheckbox = document.querySelector("#python");
const cppCheckbox = document.querySelector("#cpp");
const resetButton = document.querySelector("#resetButton");
const outputText = document.querySelector("#outputText");
const checkboxes = [typeScriptCheckbox, pythonCheckbox, cppCheckbox];

function valFullName(name) {
  return name.length >= 3 && name.length <= 50;
}

function valStudentId(id) {
  return /^z[0-9]{7}$/.test(id);
}

function valGraduationDate(date) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;
  const [day, month, year] = date.split("/").map(Number);
  const parsedDate = new Date(`${year}-${month}-${day}`); 
  return !isNaN(parsedDate) && parsedDate.getDate() === day;
}

function getGraduationStatus(date) {
  const [day, month, year] = date.split('/').map(Number);
  const graduateDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = graduateDate.getTime() - today.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (diff > 0) {
    return `graduate in ${diffDays} days`;
  } else if (diff < 0) {
    return `graduated ${Math.abs(diffDays)} days ago`;
  } else {
    return "graduate today";
  }
}

function getFavouriteLanguages() {
  const selected = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.name);
  if (selected.length === 0) {
    return "I have no favourite programming language";
  } else if (selected.length === 1) {
    return `my favourite programming language is ${selected[0]}`;
  } else {
    return `my favourite programming languages are ${selected.slice(0, -1).join(', ')}, and ${selected.slice(-1)}`;
  }
}

function renderOutput() {
  const fullName = fullNameInput.value.trim();
  const studentId = studentIdInput.value.trim();
  const graduateDate = graduationDateInput.value.trim();
  const major = majorSelect.value;

  if (!valFullName(fullName)) {
    outputText.value = 'Please input a valid full name';
    return;
  }

  if (!valStudentId(studentId)) {
    outputText.value = 'Please input a valid student ID';
    return;
  }
  if (!valGraduationDate(graduateDate)) {
    outputText.value = 'Please input a valid graduation date';
    return;
  }

  outputText.value = `My name is ${fullName} (${studentId}), and I ${getGraduationStatus(graduateDate)}. I major in ${major}, and ${getFavouriteLanguages()}.`;
}

fullNameInput.addEventListener('blur', renderOutput);
studentIdInput.addEventListener('blur', renderOutput);
graduationDateInput.addEventListener('blur', renderOutput);
majorSelect.addEventListener('change', renderOutput);
checkboxes.forEach(checkbox => checkbox.addEventListener('change', renderOutput));

selectAllCheckbox.addEventListener('change', () =>{
    checkboxes.forEach((cb) => (cb.checked = selectAllCheckbox.checked));
    renderOutput();
})

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked === false) {
            selectAllCheckbox.checked = false;
        } else if (checkboxes.every((cb) => cb.checked)){
            selectAllCheckbox.checked = true;
        }
        renderOutput();
    })
})

resetButton.addEventListener('click', () => {
  document.querySelector('form').reset();
  outputText.value = '';
});
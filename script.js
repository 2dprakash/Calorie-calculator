const form = document.querySelector('#calorie-form');
const emptyState = document.querySelector('#results-empty');
const resultsContent = document.querySelector('#results-content');
const statusPill = document.querySelector('.status-pill');

const formatCalories = (value) => Math.round(value).toLocaleString('en-US');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const age = Number(document.querySelector('#age').value);
  const height = Number(document.querySelector('#height').value);
  const weight = Number(document.querySelector('#weight').value);
  const activity = Number(document.querySelector('#activity').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  if (!age || !height || !weight) return;

  // Mifflin–St Jeor estimates BMR, then activity adjusts it to maintenance.
  const genderAdjustment = gender === 'male' ? 5 : -161;
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + genderAdjustment;
  const maintenance = bmr * activity;

  document.querySelector('#maintenance-calories').textContent = formatCalories(maintenance);
  document.querySelector('#lose-calories').textContent = formatCalories(maintenance - 400);
  document.querySelector('#maintain-calories').textContent = formatCalories(maintenance);
  document.querySelector('#gain-calories').textContent = formatCalories(maintenance + 300);

  emptyState.classList.add('hidden');
  resultsContent.classList.remove('hidden');
  statusPill.innerHTML = '<span></span> Updated just now';
});

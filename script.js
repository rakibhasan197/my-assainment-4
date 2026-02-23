let interviewList = [];
let rejectedList = [];
let currentStatus = 'allFilterBtn';

const total = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectCount = document.getElementById('rejectCount');
const countJobs = document.getElementById('countJobs');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const emptySection = document.getElementById('emptySection');

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectedList.length;

  if (currentStatus === 'interviewFilterBtn') {
    countJobs.innerText = interviewList.length;
  } else if (currentStatus === 'rejectFilterBtn') {
    countJobs.innerText = rejectedList.length;
  } else {
    countJobs.innerText = allCardSection.children.length;
  }
}

function checkEmpty() {
  if (allCardSection.children.length === 0) {
    emptySection.classList.remove('hidden');
  } else {
    emptySection.classList.add('hidden');
  }
}

calculateCount();
checkEmpty();

const allFilterBtn = document.getElementById('allFilterBtn');
const interviewFilterBtn = document.getElementById('interviewFilterBtn');
const rejectFilterBtn = document.getElementById('rejectFilterBtn');

function toggleStyle(id) {
  currentStatus = id;

  allFilterBtn.classList.add('bg-white', 'text-gray-600');
  interviewFilterBtn.classList.add('bg-white', 'text-gray-600');
  rejectFilterBtn.classList.add('bg-white', 'text-gray-600');

  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
  rejectFilterBtn.classList.remove('bg-blue-500', 'text-white');

  const selected = document.getElementById(id);
  selected.classList.remove('bg-white', 'text-gray-600');
  selected.classList.add('bg-blue-500', 'text-white');

  allCardSection.classList.add('hidden');
  filterSection.classList.add('hidden');
  emptySection.classList.add('hidden');

  if (id === 'interviewFilterBtn') {
    if (interviewList.length === 0) {
      emptySection.classList.remove('hidden');
    } else {
      filterSection.classList.remove('hidden');
      renderInterview();
    }
  } else if (id === 'rejectFilterBtn') {
    if (rejectedList.length === 0) {
      emptySection.classList.remove('hidden');
    } else {
      filterSection.classList.remove('hidden');
      renderRejected();
    }
  } else if (id === 'allFilterBtn') {
    allCardSection.classList.remove('hidden');
    if (allCardSection.children.length === 0) {
      emptySection.classList.remove('hidden');
    }
  }

  calculateCount();
}

// Helper to update the original card in "All" section
function updateOriginalCardStatus(companyName, newStatus) {
  const cards = allCardSection.children;
  for (let card of cards) {
    const nameElem = card.querySelector('.mobleCorp');
    if (nameElem && nameElem.innerText === companyName) {
      const statusBtn = card.querySelector('.status');
      if (newStatus === 'interview') {
        statusBtn.innerHTML = `<button class="status bg-[#EEF4FF] border-2 border-green-500 text-green-500 font-bold px-6 py-1 rounded-md">INTERVIEW</button>`;
      } else if (newStatus === 'rejected') {
        statusBtn.innerHTML = `<button class="status bg-[#EEF4FF] border-2 border-red-500 text-red-500 font-bold px-6 py-1 rounded-md">REJECTED</button>`;
      }
      break;
    }
  }
}

mainContainer.addEventListener('click', function (event) {
  const interviewBtn = event.target.closest('.interviewBtn');
  const rejectBtn = event.target.closest('.rejectBtn');
  const deleteBtn = event.target.closest('.deleteBtn');

  // ---------- DELETE ----------
  if (deleteBtn) {
    const card = deleteBtn.closest('.card');
    const companyName = card.querySelector('.mobleCorp').innerText;

    // Remove original card from "All" section
    const originalCards = allCardSection.children;
    for (let i = 0; i < originalCards.length; i++) {
      const originalCard = originalCards[i];
      const nameElem = originalCard.querySelector('.mobleCorp');
      if (nameElem && nameElem.innerText === companyName) {
        originalCard.remove();
        break;
      }
    }

    // Remove the clicked card (could be from filter or All)
    card.remove();

    // Remove from both lists
    interviewList = interviewList.filter(item => item.mobileCorp !== companyName);
    rejectedList = rejectedList.filter(item => item.mobileCorp !== companyName);

    calculateCount();
    checkEmpty();

    // Re-render current filter view if needed
    if (currentStatus === 'interviewFilterBtn') {
      if (interviewList.length === 0) {
        emptySection.classList.remove('hidden');
        filterSection.classList.add('hidden');
      } else {
        renderInterview();
      }
    } else if (currentStatus === 'rejectFilterBtn') {
      if (rejectedList.length === 0) {
        emptySection.classList.remove('hidden');
        filterSection.classList.add('hidden');
      } else {
        renderRejected();
      }
    } else {
      // All view – already handled by checkEmpty()
    }

    return;
  }

  // ---------- INTERVIEW BUTTON ----------
  if (interviewBtn) {
    const parentNode = interviewBtn.closest('.card');
    const mobileCorp = parentNode.querySelector('.mobleCorp').innerText;
    const reactDevs = parentNode.querySelector('.reactDevs').innerText;
    const remoteJob = parentNode.querySelector('.remoteJob').innerText;
    const paragraph = parentNode.querySelector('.descript').innerText;

    // Update the clicked card's status button
    parentNode.querySelector('.status').innerHTML = `<button class="status bg-[#EEF4FF] border-2 border-green-500 text-green-500 font-bold px-6 py-1 rounded-md">INTERVIEW</button>`;

    const cardInfo = {
      mobileCorp,
      reactDevs,
      remoteJob,
      statusI: `<button class="status bg-[#EEF4FF] border-2 border-green-500 text-green-500 font-bold px-6 py-1 rounded-md">INTERVIEW</button>`,
      paragraph
    };

    // Add to interviewList if not already present
    const jobExistInInterview = interviewList.find(item => item.mobileCorp === cardInfo.mobileCorp);
    if (!jobExistInInterview) {
      interviewList.push(cardInfo);
    }

    // Remove from rejectedList
    rejectedList = rejectedList.filter(item => item.mobileCorp !== cardInfo.mobileCorp);

    // Update the original card in "All" section
    updateOriginalCardStatus(mobileCorp, 'interview');

    // Re-render current filter view
    if (currentStatus === 'interviewFilterBtn') {
      renderInterview();
      if (interviewList.length === 0) {
        emptySection.classList.remove('hidden');
        filterSection.classList.add('hidden');
      } else {
        emptySection.classList.add('hidden');
        filterSection.classList.remove('hidden');
      }
    } else if (currentStatus === 'rejectFilterBtn') {
      renderRejected();
      if (rejectedList.length === 0) {
        emptySection.classList.remove('hidden');
        filterSection.classList.add('hidden');
      } else {
        emptySection.classList.add('hidden');
        filterSection.classList.remove('hidden');
      }
    }

    calculateCount();
  }

  // ---------- REJECT BUTTON ----------
  else if (rejectBtn) {
    const parentNode = rejectBtn.closest('.card');
    const mobileCorp = parentNode.querySelector('.mobleCorp').innerText;
    const reactDevs = parentNode.querySelector('.reactDevs').innerText;
    const remoteJob = parentNode.querySelector('.remoteJob').innerText;
    const paragraph = parentNode.querySelector('.descript').innerText;

    // Update the clicked card's status button
    parentNode.querySelector('.status').innerHTML = `<button class="status bg-[#EEF4FF] border-2 border-red-500 text-red-500 font-bold px-6 py-1 rounded-md">REJECTED</button>`;

    const cardInfo = {
      mobileCorp,
      reactDevs,
      remoteJob,
      statusI: `<button class="status bg-[#EEF4FF] border-2 border-red-500 text-red-500 font-bold px-6 py-1 rounded-md">REJECTED</button>`,
      paragraph
    };

    // Add to rejectedList if not already present
    const jobExistInRejected = rejectedList.find(item => item.mobileCorp === cardInfo.mobileCorp);
    if (!jobExistInRejected) {
      rejectedList.push(cardInfo);
    }

    // Remove from interviewList
    interviewList = interviewList.filter(item => item.mobileCorp !== cardInfo.mobileCorp);

    // Update the original card in "All" section
    updateOriginalCardStatus(mobileCorp, 'rejected');

    // Re-render current filter view
    if (currentStatus === 'rejectFilterBtn') {
      renderRejected();
      if (rejectedList.length === 0) {
        emptySection.classList.remove('hidden');
        filterSection.classList.add('hidden');
      } else {
        emptySection.classList.add('hidden');
        filterSection.classList.remove('hidden');
      }
    } else if (currentStatus === 'interviewFilterBtn') {
      renderInterview();
      if (interviewList.length === 0) {
        emptySection.classList.remove('hidden');
        filterSection.classList.add('hidden');
      } else {
        emptySection.classList.add('hidden');
        filterSection.classList.remove('hidden');
      }
    }

    calculateCount();
  }
});

// Render functions (unchanged, but included for completeness)
function renderInterview() {
  filterSection.innerHTML = '';
  for (let interview of interviewList) {
    let div = document.createElement('div');
    div.className = 'card flex justify-between bg-white shadow-xs p-8 rounded-md mt-10';
    div.innerHTML = `<div class="right space-y-6">
      <div><p class="mobleCorp text-xl">${interview.mobileCorp}</p><p class="reactDevs text-gray-600 text-lg">${interview.reactDevs}</p></div>
      <div><p class="remoteJob text-gray-600">${interview.remoteJob}</p></div>
      <button class="status font-bold text-orange-300 px-6 py-1 rounded-md">${interview.statusI}</button>
      <p class="descript text-gray-400">${interview.paragraph}</p>
      <div class="gap-4 flex">
        <button class="interviewBtn border-2 border-green-500 px-4 py-1 rounded-md text-green-500 font-semibold">INTERVIEW</button>
        <button class="rejectBtn border-2 border-red-500 px-4 py-1 rounded-md text-red-500 font-semibold">REJECTED</button>
      </div>
    </div>
    <div class="right">
      <button class="deleteBtn w-[60px] h-[60px] rounded-[50%] bg-white shadow-sm"><i class="fa-regular fa-trash-can"></i></button>
    </div>`;
    filterSection.appendChild(div);
  }
}

function renderRejected() {
  filterSection.innerHTML = '';
  for (let reject of rejectedList) {
    let div = document.createElement('div');
    div.className = 'card flex justify-between bg-white shadow-xs p-8 rounded-md mt-10';
    div.innerHTML = `<div class="right space-y-6">
      <div><p class="mobleCorp text-xl">${reject.mobileCorp}</p><p class="reactDevs text-gray-600 text-lg">${reject.reactDevs}</p></div>
      <div><p class="remoteJob text-gray-600">${reject.remoteJob}</p></div>
      <button class="status font-bold text-orange-300 px-6 py-1 rounded-md">${reject.statusI}</button>
      <p class="descript text-gray-400">${reject.paragraph}</p>
      <div class="gap-4 flex">
        <button class="interviewBtn border-2 border-green-500 px-4 py-1 rounded-md text-green-500 font-semibold">INTERVIEW</button>
        <button class="rejectBtn border-2 border-red-500 px-4 py-1 rounded-md text-red-500 font-semibold">REJECTED</button>
      </div>
    </div>
    <div class="right">
      <button class="deleteBtn w-[60px] h-[60px] rounded-[50%] bg-white shadow-sm"><i class="fa-regular fa-trash-can"></i></button>
    </div>`;
    filterSection.appendChild(div);
  }
}
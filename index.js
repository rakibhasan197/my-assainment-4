let interviewList = [];
let rejectedList = [];
let currentStatus = 'allFilterBtn'

const total = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectCount = document.getElementById('rejectCount');
const countJobs = document.getElementById('countJobs');


const allCardSection = document.getElementById('allCards')
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')
const emptySection = document.getElementById('emptySection')

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

 if(allCardSection.children.length === 0){
    emptySection.classList.remove('hidden')

    
   }

calculateCount();




const allFilterBtn = document.getElementById('allFilterBtn')
const interviewFilterBtn = document.getElementById('interviewFilterBtn')
const rejectFilterBtn = document.getElementById('rejectFilterBtn')
const deleteBtn = document.getElementById('delete-btn')

function toggleStyle(id){
  currentStatus = id;
  console.log(currentStatus);
  allFilterBtn.classList.add('bg-white', 'text-gray-600');
  interviewFilterBtn.classList.add('bg-white', 'text-gray-600');
  rejectFilterBtn.classList.add('bg-white', 'text-gray-600');

  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
  rejectFilterBtn.classList.remove('bg-blue-500', 'text-white');

  const selected = document.getElementById(id);
  currentStatus = id
  
  
  allCardSection.classList.add('hidden');
  emptySection.classList.remove('hidden')
  

  selected.classList.remove('bg-white', 'text-gray-600');
  selected.classList.add('bg-blue-500', 'text-white');


filterSection.classList.add('hidden');
  emptySection.classList.add('hidden');



if(id === 'interviewFilterBtn'){
  allCardSection.classList.add('hidden')
  filterSection.classList.remove('hidden')
  
  if(interviewList.length === 0){
    filterSection.classList.add('hidden')
    emptySection.classList.remove('hidden')
  } else {
    renderInterview();
  }

}
else if(id == 'allFilterBtn'){
  allCardSection.classList.remove('hidden')
  filterSection.classList.add('hidden')
   emptySection.classList.add('hidden')
    if(allCardSection.children.length === 0){
    emptySection.classList.remove('hidden')
   }
}
else if(id == 'rejectFilterBtn'){
  allCardSection.classList.add('hidden')
  filterSection.classList.remove('hidden')
  
  if(rejectedList.length === 0){
    filterSection.classList.add('hidden')
    emptySection.classList.remove('hidden')
  } else {
    renderRejected();
  }
}

  calculateCount();
}

function checkEmpty(){
  if(allCardSection.children.length === 0){
    emptySection.classList.remove('hidden')
    
  }else{
    emptySection.classList.add('hidden')
  }
}



mainContainer.addEventListener('click', function(event){
  const interviewBtn = event.target.closest('.interviewBtn');
  const rejectBtn = event.target.closest('.rejectBtn');
  
const deleteBtn = event.target.closest('.deleteBtn');

if(deleteBtn){
  const card = deleteBtn.closest('.card');
  const companyName = card.querySelector('.mobleCorp').innerText;

  // remove from DOM
  card.remove();

  // remove from interview list
  interviewList = interviewList.filter(item => item.mobileCorp !== companyName);

  // remove from rejected list
  rejectedList = rejectedList.filter(item => item.mobileCorp !== companyName);

  calculateCount();

 checkEmpty();

  if(currentStatus === 'interviewFilterBtn'){
    if(interviewList.length == 0){
      emptySection.classList.remove('hidden')
    }
    renderInterview();
  }

  else if(currentStatus === 'rejectFilterBtn'){
       if(rejectedList.length == 0){
      emptySection.classList.remove('hidden')
    }
    renderRejected();
  }

  return;
}



  if(interviewBtn){
    const parentNode = interviewBtn.closest('.card');

   const mobileCorp = parentNode.querySelector('.mobleCorp').innerText
   const reactDevs = parentNode.querySelector('.reactDevs').innerText
   const remoteJob = parentNode.querySelector('.remoteJob').innerText
   const statusI = parentNode.querySelector('.status').innerText
   const paragraph = parentNode.querySelector('.descript').innerText

 parentNode.querySelector('.status').innerHTML = `<button class="status bg-[#EEF4FF] border-2 border-green-500 text-green-500 font-bold px-6 py-1 rounded-md">INTERVIEW</button>

 `

   const cardInfo = {
   mobileCorp:mobileCorp,
   reactDevs,
   remoteJob,
   statusI:`<button class="status bg-[#EEF4FF] border-2 border-green-500 text-green-500 font-bold px-6 py-1 rounded-md">INTERVIEW</button>

 `,
   paragraph
 }
 console.log(cardInfo);


 const jobExist = interviewList.find(item=> item.mobileCorp == cardInfo.mobileCorp)



 if(!jobExist){
   interviewList.push(cardInfo)
 }


 calculateCount();

 renderInterview()
  }
  else if(rejectBtn){
    const parentNode = rejectBtn.closest('.card');

   const mobileCorp = parentNode.querySelector('.mobleCorp').innerText
   const reactDevs = parentNode.querySelector('.reactDevs').innerText
   const remoteJob = parentNode.querySelector('.remoteJob').innerText
   const statusI = parentNode.querySelector('.status').innerText
   const paragraph = parentNode.querySelector('.descript').innerText

 parentNode.querySelector('.status').innerHTML = `<button class="status bg-[#EEF4FF] border-2 border-red-500 text-red-500 font-bold px-6 py-1 rounded-md">REJECTED</button>

 `

   const cardInfo = {
   mobileCorp:mobileCorp,
   reactDevs,
   remoteJob,
   statusI:`<button class="status bg-[#EEF4FF] border-2 border-red-500 text-red-500 font-bold px-6 py-1 rounded-md">REJECTED</button>

 `,
   paragraph
 }
 console.log(cardInfo);


 const jobExist = rejectedList.find(item=> item.mobileCorp == cardInfo.mobileCorp)



 if(!jobExist){
   rejectedList.push(cardInfo)
 }

 interviewList = interviewList.filter(item=> item.mobileCorp != cardInfo.mobileCorp)

 if(currentStatus == 'interviewFilterBtn'){
   renderInterview();
 }

 calculateCount();

  }


})

function renderInterview(){
  filterSection.innerHTML = ''

  for(let interview of interviewList){
    console.log(interview);

    let div = document.createElement('div')
    div.className = 'card flex justify-between bg-white shadow-xs p-8 rounded-md mt-10'
    div.innerHTML =`<div class="right space-y-6">
              <!-- part 1 -->
              <div>
                <p class="mobleCorp text-xl">${interview.mobileCorp}</p>
                <p class="reactDevs text-gray-600 text-lg">${interview.reactDevs}</p>
              </div>
              <!-- part 2 -->
              <div>
                <p class="remoteJob text-gray-600">${interview.remoteJob}</p>
              </div>
              <!-- part 3 -->
               <button class="status font-bold text-orange-300 px-6 py-1 rounded-md">${interview.statusI}</button>

               <p class="descript text-gray-400">${interview.paragraph}</p>
               <div class="gap-4 flex">
                <button class="interviewBtn border-2 border-green-500 px-4 py-1 rounded-md text-green-500 font-semibold">INTERVIEW</button>
                <button class="rejectBtn border-2 border-red-500 px-4 py-1 rounded-md text-red-500 font-semibold">REJECTED</button>
               </div>
            </div>
            <!-- main part 2 -->
            <div class="right">
              <button id="delete" class="deleteBtn w-[60px] h-[60px] rounded-[50%] bg-white shadow-sm"><i class="fa-regular fa-trash-can"></i></button>
            </div>
    
    `

    filterSection.appendChild(div);
  }
}


function renderRejected(){
  filterSection.innerHTML = ''

  for(let reject of rejectedList){
    console.log(reject);

    let div = document.createElement('div')
    div.className = 'card flex justify-between bg-white shadow-xs p-8 rounded-md mt-10'
    div.innerHTML =`<div class="right space-y-6">
              <!-- part 1 -->
              <div>
                <p class="mobleCorp text-xl">${reject.mobileCorp}</p>
                <p class="reactDevs text-gray-600 text-lg">${reject.reactDevs}</p>
              </div>
              <!-- part 2 -->
              <div>
                <p class="remoteJob text-gray-600">${reject.remoteJob}</p>
              </div>
              <!-- part 3 -->
               <button class="status font-bold text-orange-300 px-6 py-1 rounded-md">${reject.statusI}</button>

               <p class="descript text-gray-400">${reject.paragraph}</p>
               <div class="gap-4 flex">
                <button class="interviewBtn border-2 border-green-500 px-4 py-1 rounded-md text-green-500 font-semibold">INTERVIEW</button>
                <button class="rejectBtn border-2 border-red-500 px-4 py-1 rounded-md text-red-500 font-semibold">REJECTED</button>
               </div>
            </div>
            <!-- main part 2 -->
            <div class="right">
              <button id="delete" class="deleteBtn w-[60px] h-[60px] rounded-[50%] bg-white shadow-sm"><i class="fa-regular fa-trash-can"></i></button>
            </div>
    
    `

    filterSection.appendChild(div);
  }
}

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
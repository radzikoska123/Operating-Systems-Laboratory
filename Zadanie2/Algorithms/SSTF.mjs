export const SSTF = (tab, currentPosition) => {
    let sumOfMoves = 0;
    let time = 0;
    let queue = [];
    let newTab = tab.slice(0); //slice of array works as a copy
    do{
        //sort by distance between cylinders and current position ASC
        // newTab.sort(function (a,b) {return Math.abs(a.cylinder-currentPosition)-Math.abs(b.cylinder-currentPosition) });

        if(newTab.length>0){ // for nonempty tab we append elems to queue
            for (let i = 0; i < newTab.length; i++) {
                if(newTab[i].enterMoment<=time){
                    queue.push(newTab[i]);
                    newTab.splice(i,1);
                    i--;
                }
            }

            //just in case if more than 1 element is appending to queue, queue must be sort ASC by distance from currentPosition
        }
        queue.sort(function (a,b) {return Math.abs(a.cylinder-currentPosition)-Math.abs(b.cylinder-currentPosition) });

        if(queue.length>0){
            sumOfMoves += Math.abs(currentPosition-queue[0].cylinder);
            time+=queue[0].duration;
            currentPosition = queue[0].cylinder;
            queue.splice(0,1);
        }

        time++;
    }while(newTab.length>0 || queue.length>0)

    return sumOfMoves;
}
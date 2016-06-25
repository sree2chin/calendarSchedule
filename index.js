


var randomColors = ['#5F9EA0', '#6495ED', '#A9A9A9', '#BDB76B', ' #DCDCDC', '#778899', '#9370DB'];  

window.onload = function() {
  // assuming the array is sorted with respect to the start time.
  var meetings = [
	 //  {
		// id : 1, start : 120, end : 150
	 //  },
	  // {
		 //  id : 2, start : 120, end : 160
	  // },
   //  {
   //    id : 21, start : 200, end : 260
   //  },
   //  {
   //    id : 12, start : 155, end : 165
   //  },
    {
      id : 1, start : 60, end : 150
    },
	  {
		  id : 3, start : 540, end : 570
	  },
	  {
		  id : 4, start : 555, end : 600
	  },
	  {
		  id : 5, start : 585, end : 660
	  },
    {
      id : 6, start : 700, end : 710
    }
  ];
  meetings.sort(function(meetingA, meetingB){
      return meetingA.start > meetingB.start;
  });
  var posArray = calculatePositions(meetings);
  createDivs(posArray);

};

//main function to calculate the width height and position of the meeting doms.
function calculatePositions(arrMeeting) {
  	var arrLength = arrMeeting.length;
  	var posArray = [];
  	var i, j, k, widthRatio, startElem, currentCounter;
  	if(arrLength && arrLength > 0) {
    		for (i = 0; i < arrLength; i++) {
            widthRatio = 1;
      			var meetingObj = {};
      			meetingObj.height = (arrMeeting[i].end - arrMeeting[i].start)*2;
      			meetingObj.top = arrMeeting[i].start * 2;
      			meetingObj.width = 600;
            meetingObj.id = arrMeeting[i].id;
            meetingObj.widthRatio = 1;
            meetingObj.left = 0;
      			posArray.push(meetingObj);
            
    		}
        var posArrayLength = posArray.length;
        widthRatio = currentCounter = 1;
        startElem = k = 0;
        // finding relative width and left position
        while(startElem < posArrayLength && k < posArrayLength) {
            debugger;
            // Detecting intersection of meetings.
            if( (k < posArrayLength - 1) && (arrMeeting[k].start < arrMeeting[k+1].end) && (arrMeeting[k].end > arrMeeting[k+1].start)) {
                posArray[k].widthRatio = widthRatio
                posArray[k + 1].widthRatio = ++widthRatio;
                k++;
                currentCounter++;
            }
            else {
                if(k > startElem) {
                   for(var x = startElem; x < k + 1; x++) {
                      if(posArray[x]) {
                          posArray[x].width = 600/(currentCounter)
                          posArray[x].left = (posArray[x].width) * (posArray[x].widthRatio - 1);
                      }
                   }
                }
                else {
                    k++
                }
                currentCounter = 1;
                widthRatio = 1;
                startElem = k;
            }
        }
        // }
        /* creating divs can be done here only, just for the code to be clear it is 
             * moved to another function.
             */
    		return posArray;
  	}
  	else {
        return posArray;
    		alert("please enter meetings.");
  	}
}

// fuction to create divs with respect to the given data.
function createDivs(posArray) {
    var i,
        j,
        div,
        color,
        div;
    var posArrayLength = posArray.length;
    for (i = 0; i < posArrayLength; i++) {
        color = randomColors[Math.floor(Math.random() * randomColors.length)];

        div = document.createElement('div')
        $(div).prop('id', posArray[i].id);
        $(div).append('<p>'+posArray[i].id+'</p>')
        $(div).prop('class', "innerContainer");
        $(div).css("background-color", color);
        width = posArray[i].width + "px";
        $(div).css("width", posArray[i].width + "px");
        $(div).css("height", posArray[i].height + "px");
        $(div).css("top", posArray[i].top + "px");
        $(div).css("left", posArray[i].left + "px");
        $(div).css("line-height", posArray[i].height + "px");
        // $(div).css("position", "absolute");
        $('.outerContainer').append(div)
        
    }
    // $(".innerContainer").hover(
    //     function() {
    //       $(this).siblings(".innerContainer").addClass("lessOpacity")
    //     },
    //     function() {
    //       $(this).siblings(".innerContainer").addClass("normaOpacity")
    //     }
    // )
}


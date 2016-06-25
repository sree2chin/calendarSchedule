


var randomColors = ['#5F9EA0', '#6495ED', '#A9A9A9', '#BDB76B', ' #DCDCDC', '#778899', '#9370DB'];  

window.onload = function() {
  
  var meetings = [
    {
      id : 1, start : 60, end : 150
    },
    {
      id : 2, start : 540, end : 570
    },
    {
      id : 3, start : 555, end : 600
    },
    {
      id : 4, start : 585, end : 660
    },
    // {
    //   id : 11, start : 60, end : 120
    // },
    // {
    //   id : 13, start : 80, end : 140
    // },
    // {
    //   id : 14, start : 100, end : 209
    // },
    // {
    //   id : 15, start : 130, end : 180
    // },
    // {
    //   id : 16, start : 155, end : 220
    // },
    // {
    //   id : 17, start : 170, end : 210
    // },
  ];
  // making the array sorted with respect to the start time.
  meetings.sort(function(keyA, keyB){
      if(keyA.start < keyB.start) return -1;
      if(keyA.start > keyB.start) return 1;
      return 0;
  });
  calculatePositions(meetings)

  // var posArray = calculatePositions(meetings);
  // createDivs(posArray);

};

//main function to calculate the width height and position of the meeting doms.
function calculatePositions(arrMeeting) {
  	var arrLength = arrMeeting.length;
  	var posArray = [];
  	var i, 
        j, 
        k,
        x, 
        widthRatio, 
        startElem, 
        currentCounter,
        groupCounter;
    var resultArray = [];
    var resultObj = {};
    var resultObj2 = {};
  	if(arrLength && arrLength > 0) {
    		for (i = 0; i < arrLength; i++) {
            //calculate dimensions
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
        while(startElem < posArrayLength && k < posArrayLength) {
            resultArray = [];
            // Detecting intersection of meetings.
            if( (k < posArrayLength - 1) && (arrMeeting[k].start < arrMeeting[k+1].end) && (arrMeeting[k].end > arrMeeting[k+1].start)) {
                posArray[k].widthRatio = widthRatio
                posArray[k + 1].widthRatio = ++widthRatio;
                k++;
                currentCounter++;
            }
            /* If there's an intersection find all the adjacent divs which intersect
             * and adjust them without wasting space
             */
            else {
                // Iterating through intersection array.
                if(k > startElem) {
                   resultObj = {}
                   for(x = startElem; x < k + 1; x++) {
                      if(posArray[x]) {
                          posArray[x].width = 600/(currentCounter)
                          posArray[x].left = (posArray[x].width) * (posArray[x].widthRatio - 1);
                      }
                   }
                   // Initial div in the vertical column
                   resultObj.posArray = [];
                   resultObj.posArray.push(posArray[startElem])
                   resultObj.groupCounter = 0;
                   resultArray.push(resultObj);
                   groupCounter = 1;
                   for(x = startElem + 1; x < k + 1; x++) {
                      if(posArray[x]) {
                          resultObj = {}
                          /* Create vertical columns divs with divs which are overlapping 
                           * with the beginning div
                           */
                          if( (posArray[startElem].top + posArray[startElem].height) > posArray[x].top) {
                              resultObj.posArray = [];
                              posArray[x].left = 0;
                              resultObj.posArray.push(posArray[x])
                              resultObj.groupCounter = 0;
                              resultArray.push(resultObj)
                          }
                          else {
                              var resultArrayLength = resultArray.length;
                              /* Take the div which is non-overlapping with first div in the
                               * group and try to make it fit on below the existing divs.
                               */
                              for(var a = 0; a < resultArrayLength; a++) {
                                  if( (resultArray[a].posArray[resultArray[a].groupCounter].top + resultArray[a].posArray[resultArray[a].groupCounter].height) < posArray[x].top ) {
                                      resultArray[a].posArray.push(posArray[x]);
                                      resultArray[a].groupCounter = resultArray[a].groupCounter + 1;
                                      break;
                                  }
                              }
                              /*if a div doesn't fit in the existing vertical columns
                               *create another one
                               */
                              if(a >= resultArrayLength) {
                                  resultObj2 = {};
                                  resultObj2.posArray = [];
                                  resultObj2.posArray.push(posArray[x]);
                                  resultObj2.groupCounter = 0;
                                  resultArray.push(resultObj2);
                              }
                          }
                      }
                   }
                }

                else {
                    if(posArray[k]) {
                       resultObj = {};
                        resultObj.posArray = [];
                        resultObj.posArray.push(posArray[startElem])
                        resultObj.groupCounter = 0;
                        resultArray.push(resultObj); 
                    }
                }
                k++;
                renderSpaceOptimizedDivs(resultArray)
                
                currentCounter = 1;
                widthRatio = 1;
                startElem = k;
            }

        }
    		// return posArray;
  	}
  	else {
        // return posArray;
    		alert("please enter meetings.");
  	}
}

// fuction to create divs with optimized space.
function renderSpaceOptimizedDivs(resultArray) {
    var i,
        j,
        div,
        color,
        div;
    var resultArrayLength = resultArray.length;
    for (j = 0; j < resultArrayLength; j++) {
        var posArray = resultArray[j].posArray;
        var posArrayLength = posArray.length;
        for(i = 0; i < posArrayLength; i++) {
            // assign random color.
            color = randomColors[Math.floor(Math.random() * randomColors.length)];
            div = document.createElement('div')
            $(div).prop('id', posArray[i].id);
            $(div).append('<p>'+posArray[i].id+'</p>')
            $(div).prop('class', "innerContainer");
            $(div).css("background-color", color);
            // finding width with respect to number of groups
            width = (600/resultArrayLength);
            $(div).css("width", width + "px");
            $(div).css("height", posArray[i].height + "px");
            $(div).css("top", posArray[i].top + "px");
            //incrementing left.
            $(div).css("left", (j * width) + "px");
            $(div).css("line-height", posArray[i].height + "px");
            // $(div).css("position", "absolute");
            $('.outerContainer').append(div)
        }
        
        
    }

}

// fuction to create divs with respect to the given data.
// function createDivs(posArray) {
//     var i,
//         j,
//         div,
//         color,
//         div;
//     var posArrayLength = posArray.length;
//     for (i = 0; i < posArrayLength; i++) {
//         color = randomColors[Math.floor(Math.random() * randomColors.length)];

//         div = document.createElement('div')
//         $(div).prop('id', posArray[i].id);
//         $(div).append('<p>'+posArray[i].id+'</p>')
//         $(div).prop('class', "innerContainer");
//         $(div).css("background-color", color);
//         width = posArray[i].width + "px";
//         $(div).css("width", posArray[i].width + "px");
//         $(div).css("height", posArray[i].height + "px");
//         $(div).css("top", posArray[i].top + "px");
//         $(div).css("left", posArray[i].left + "px");
//         $(div).css("line-height", posArray[i].height + "px");
//         // $(div).css("position", "absolute");
//         $('.outerContainer').append(div)
        
//     }

// }


module.exports = function check(str, bracketsConfig) {
    let shoudClose = [];
    let ignoredIndexes = [];
    let ignoredStatus = [];
    
    for (let j = 0; j < bracketsConfig.length; j++) {
        if(bracketsConfig[j][0] == bracketsConfig[j][1]) {
            ignoredIndexes.push(j);
            ignoredStatus.push(true);
        }  
    }
    
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < bracketsConfig.length; j++) {
            if(str[i] == bracketsConfig[j][0] || str[i] == bracketsConfig[j][1]) {
                
                if (ignoredIndexes.includes(j)) {
                    for(let index = 0; index < ignoredIndexes.length; index++) {
                        if(ignoredIndexes[index] == j) {
                            ignoredStatus[index] = !ignoredStatus[index];
                            
                            if(!ignoredStatus[index]) {
                               shoudClose.push(bracketsConfig[j][1]); 
                            }
                            else if(shoudClose[shoudClose.length - 1] == bracketsConfig[j][1]) {
                                shoudClose.splice(-1,1);
                            }
                            else {
                                return false;
                            }
                        }
                    }
                } else {
                   let isOpen = str[i] == bracketsConfig[j][0];
                
                    if(isOpen) {
                        shoudClose.push(bracketsConfig[j][1]);
                    }
                    else if(str[i] == shoudClose[shoudClose.length - 1]) {
                        shoudClose.splice(-1,1);
                    }
                    else {
                        return false;
                    } 
                }
            }
        }
    }
    
    for(let i = 0; i < ignoredStatus.length; i++) {
        if (!ignoredStatus[i]) {
            return false;
        }
    }
    
    return shoudClose.length == 0;
}

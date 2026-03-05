/**
 * device-bid-modifier-optimizer - Script Google Ads for SMBs
 * Author: Thibault Fayol
 */
var CONFIG = { TEST_MODE: true, TARGET_ROAS: 3.0 };
function main(){
  var campIter = AdsApp.campaigns().withCondition("Status = ENABLED").get();
  while(campIter.hasNext()){
     var camp = campIter.next();
     // Extract device stats via reports in full version
     Logger.log("Evaluating devices for " + camp.getName());
  }
}
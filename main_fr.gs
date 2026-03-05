/**
 * --------------------------------------------------------------------------
 * device-bid-modifier-optimizer - Google Ads Script for SMBs
 * --------------------------------------------------------------------------
 * Author: Thibault Fayol - Consultant SEA PME
 * Website: https://thibaultfayol.com
 * License: MIT
 * --------------------------------------------------------------------------
 */
var CONFIG = { TEST_MODE: true, TARGET_ROAS: 3.0, MAX_BID_MODIFIER: 1.5, MIN_BID_MODIFIER: 0.5 };
function main() {
    var campIter = AdsApp.campaigns().withCondition("Status = ENABLED").get();
    while(campIter.hasNext()){
        var camp = campIter.next();
        var platforms = [camp.targeting().platforms().mobile(), camp.targeting().platforms().desktop(), camp.targeting().platforms().tablet()];
        for(var i=0; i<platforms.length; i++) {
            var platIter = platforms[i].get();
            if(platIter.hasNext()){
                var plat = platIter.next();
                var stats = plat.getStatsFor("LAST_30_DAYS");
                if (stats.getCost() > 0 && stats.getConversions() > 0) {
                    var roas = stats.getConversionValue() / stats.getCost();
                    var adjustment = roas / CONFIG.TARGET_ROAS;
                    adjustment = Math.max(CONFIG.MIN_BID_MODIFIER, Math.min(CONFIG.MAX_BID_MODIFIER, adjustment));
                    Logger.log("Opti appareil pour " + camp.getName() + " (ROAS: " + roas.toFixed(2) + ") -> Mod: " + adjustment.toFixed(2));
                    if(!CONFIG.TEST_MODE) plat.setBidModifier(adjustment);
                }
            }
        }
    }
}

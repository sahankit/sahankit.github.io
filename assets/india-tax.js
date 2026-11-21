window.IndiaTax=(function(){
  var NEW_SLABS=[[400000,0],[800000,0.05],[1200000,0.1],[1600000,0.15],[2000000,0.2],[2400000,0.25],[Infinity,0.3]];
  var OLD_SLABS=[[250000,0],[500000,0.05],[1000000,0.2],[Infinity,0.3]];
  var STD_NEW=75000, STD_OLD=50000, CESS=0.04;
  var REBATE_NEW=1200000, REBATE_OLD=500000, REBATE_OLD_CAP=12500;
  function slabTax(taxable, slabs){
    if(taxable<=0) return 0;
    var tax=0, lower=0, i, upper, rate;
    for(i=0;i<slabs.length;i++){
      upper=slabs[i][0]; rate=slabs[i][1];
      if(taxable<=lower) break;
      tax += (Math.min(taxable, upper)-lower)*rate;
      lower=upper;
      if(taxable<=upper) break;
    }
    return tax;
  }
  function rebate87A(tax, taxable, regime){
    if(regime==='new'){
      if(taxable<=REBATE_NEW) return tax;
      var cap=Math.max(0, taxable-REBATE_NEW);
      return tax>cap ? tax-cap : 0;
    }
    if(taxable<=REBATE_OLD) return Math.min(tax, REBATE_OLD_CAP);
    return 0;
  }
  function taxBeforeCess(taxable, regime){
    var slabs=regime==='new'?NEW_SLABS:OLD_SLABS;
    var raw=slabTax(taxable, slabs);
    var reb=rebate87A(raw, taxable, regime);
    return Math.max(0, raw-reb);
  }
  function totalTax(taxable, regime){
    var after=taxBeforeCess(taxable, regime);
    return after + after*CESS;
  }
  function fromGross(gross, regime, ded){
    ded=ded||{};
    var std=regime==='new'?STD_NEW:STD_OLD;
    var taxable=gross-std;
    if(regime==='old'){
      taxable -= Math.min(Math.max(ded.c80c||0,0),150000)
        + Math.min(Math.max(ded.nps||0,0),50000)
        + Math.max(ded.d80d||0,0) + Math.max(ded.hra||0,0) + Math.max(ded.other||0,0);
    }
    taxable=Math.max(0, taxable);
    var raw=slabTax(taxable, regime==='new'?NEW_SLABS:OLD_SLABS);
    var reb=rebate87A(raw, taxable, regime);
    var after=Math.max(0, raw-reb);
    var cessAmt=after*CESS;
    return { taxable:taxable, raw:raw, reb:reb, afterReb:after, cessAmt:cessAmt, total:after+cessAmt };
  }
  return {
    fy:'2026–27',
    STD_NEW:STD_NEW, STD_OLD:STD_OLD, CESS:CESS,
    NEW_SLABS:NEW_SLABS, OLD_SLABS:OLD_SLABS,
    REBATE_NEW:REBATE_NEW,
    slabTax:slabTax, rebate87A:rebate87A,
    taxBeforeCess:taxBeforeCess, totalTax:totalTax, fromGross:fromGross
  };
})();

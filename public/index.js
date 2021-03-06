'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function FindTheTruck(truckerId)
{
  var i = 0;
  while(i<truckers.length)
  {
    if(truckers[i].id==truckerId)
    {
      return truckers[i];
    }
    i++;
  }
  return null;
}

function SetThePrices()
{
  var i =0;
  while (i<deliveries.length)
  {
    var truck = FindTheTruck(deliveries[i].truckerId);
    if(truck!=null)
    {
      if(deliveries[i].volume > 25)
      {
        deliveries[i].price=0.01*Math.round(100*(deliveries[i].volume*truck.pricePerVolume*0.5+deliveries[i].distance*truck.pricePerKm));
      }
      else if (deliveries[i].volume > 10)
      {
        deliveries[i].price=0.01*Math.round(100*(deliveries[i].volume*truck.pricePerVolume*0.7+deliveries[i].distance*truck.pricePerKm));
      }
      else if(deliveries[i].volume > 5)
      {
        deliveries[i].price=0.01*Math.round(100*(deliveries[i].volume*truck.pricePerVolume*0.9+deliveries[i].distance*truck.pricePerKm));
      }
      else
      {
        deliveries[i].price=0.01*Math.round(100*(deliveries[i].volume*truck.pricePerVolume+deliveries[i].distance*truck.pricePerKm));
      }
    }
    //pay everyone
    var deductibleReduction = 0
    if(deliveries[i].options.deductibleReduction)
    { //for now the commission is not afected. 
      deliveries[i].price+=deliveries[i].volume
      deductibleReduction +=deliveries[i].volume
    }
    var commission = 0.01*Math.round(30* (deliveries[i].price-deductibleReduction))
    deliveries[i].commission.insurance+=commission*0.5
    commission-=deliveries[i].commission.insurance
    var tax = Math.trunc(deliveries[i].distance/500)+1
    commission-=tax;
    deliveries[i].commission.treasury+=tax;
    deliveries[i].commission.convargo+=commission;
    i++;
  }
}

function FindTheDeliver(deliverId)
{
  for(var i=0;i<deliveries.length;i++)
  {
    if(deliverId == deliveries[i].id)
    {
      return deliveries[i];
    }
  }
  return null;
}

function PayForTheService()
{
  for(var i=0;i<actors.length;i++)
  {
    var delivery = FindTheDeliver(actors[i].deliveryId);
    if(delivery!=null)
    {
      for(var j=0;j<actors[i].payment.length;j++)
      {
        var commission = 0;
        if(delivery.options.deductibleReduction)
        {
          commission+=delivery.volume
        }
        switch(actors[i].payment[j].who)
        {
          case 'shipper':
            actors[i].payment[j].amount = delivery.price;
            break
          case 'trucker':
            actors[i].payment[j].amount = 0.01*Math.round(100*(delivery.price - commission - delivery.commission.convargo - delivery.commission.insurance - delivery.commission.treasury));
            break
          case 'treasury':
            actors[i].payment[j].amount = delivery.commission.treasury
            break
          case 'insurance':
            actors[i].payment[j].amount = delivery.commission.insurance
            break
          case 'convargo':
              actors[i].payment[j].amount = delivery.commission.convargo + commission
            break
        }
      }
    }
  }
}



SetThePrices();
PayForTheService();
console.log(truckers);
console.log(deliveries);
console.log(actors);
